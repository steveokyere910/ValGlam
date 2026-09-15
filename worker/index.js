const allowedOrigins = new Set([
  "https://steveokyere910.github.io",
  "https://valscarea1.web.app",
  "https://valscarea1.firebaseapp.com",
  "https://valsglam.web.app",
  "https://valsglam.firebaseapp.com",
  "http://127.0.0.1:5500",
  "http://localhost:5500"
]);

let cachedAccessToken = null;
let cachedAccessTokenExpiresAt = 0;

function base64UrlEncode(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getFirestoreAccessToken(serviceAccountJson) {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60000) return cachedAccessToken;

  const serviceAccount = JSON.parse(serviceAccountJson);
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64UrlEncode(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));
  const pem = serviceAccount.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const signingKey = await crypto.subtle.importKey(
    "pkcs8",
    Uint8Array.from(atob(pem), (character) => character.charCodeAt(0)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    signingKey,
    new TextEncoder().encode(`${header}.${claim}`)
  );
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${header}.${claim}.${base64UrlEncode(new Uint8Array(signature))}`
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) throw new Error("Firebase service account authentication failed.");
  cachedAccessToken = result.access_token;
  cachedAccessTokenExpiresAt = Date.now() + Number(result.expires_in || 3600) * 1000;
  return cachedAccessToken;
}

async function firestoreCommit(env, writes) {
  const token = await getFirestoreAccessToken(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  const projectId = env.FIREBASE_PROJECT_ID;
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ writes })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Firestore stock update failed.");
  return result;
}

function firestoreString(value) {
  return { stringValue: String(value) };
}

function firestoreInteger(value) {
  return { integerValue: String(value) };
}

async function reserveStock(env, reference, itemIds) {
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error("Firebase stock configuration is missing.");
  }
  const token = await getFirestoreAccessToken(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  const database = `projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
  const reservationName = `${database}/paymentReservations/${reference}`;
  const quantities = new Map();
  itemIds.forEach((id) => quantities.set(String(id), (quantities.get(String(id)) || 0) + 1));
  const productNames = [...quantities.keys()].map((id) => `${database}/products/${id}`);

  const reservationResponse = await fetch(`https://firestore.googleapis.com/v1/${reservationName}`, { headers: { Authorization: `Bearer ${token}` } });
  if (reservationResponse.ok) return;
  if (reservationResponse.status !== 404) throw new Error("Could not check the payment reservation.");

  const batchResponse = await fetch(`https://firestore.googleapis.com/v1/${database}:batchGet`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ documents: productNames })
  });
  const batchResult = await batchResponse.json();
  if (!batchResponse.ok) throw new Error(batchResult.error?.message || "Could not load product stock.");
  const documents = (Array.isArray(batchResult) ? batchResult : []).map((entry) => entry.found).filter(Boolean);
  const byId = new Map(documents.map((document) => [document.name.split("/").pop(), document]));
  const writes = [];
  const reservedItems = [];

  for (const [id, quantity] of quantities) {
    const document = byId.get(id);
    const stock = Number(document?.fields?.stock?.integerValue ?? document?.fields?.stock?.doubleValue);
    if (!document || !Number.isInteger(stock) || stock < quantity) {
      throw new Error(`${document?.fields?.name?.stringValue || "A product"} does not have enough stock.`);
    }
    writes.push({
      update: {
        name: document.name,
        fields: {
          stock: firestoreInteger(stock - quantity),
          updatedAt: { timestampValue: new Date().toISOString() }
        }
      },
      updateMask: { fieldPaths: ["stock", "updatedAt"] },
      currentDocument: { updateTime: document.updateTime }
    });
    reservedItems.push({ id, quantity });
  }

  writes.push({
    update: {
      name: reservationName,
      fields: {
        reference: firestoreString(reference),
        items: { arrayValue: { values: reservedItems.map((item) => ({ mapValue: { fields: { id: firestoreString(item.id), quantity: firestoreInteger(item.quantity) } } })) } },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    },
    currentDocument: { exists: false }
  });
  await firestoreCommit(env, writes);
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
    "Vary": "Origin"
  };

  if (allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin)
  });
}

async function authorizeAdmin(request, env) {
  const authorization = request.headers.get("Authorization") || "";
  const idToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!idToken || !env.FIREBASE_WEB_API_KEY) return false;
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(env.FIREBASE_WEB_API_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });
  const result = await response.json();
  const user = result.users?.[0];
  if (!user) return false;
  if (["steveokyere910@gmail.com", "okyeresolomon910@gmail.com"].includes(String(user.email || "").toLowerCase())) return true;
  if (!env.FIREBASE_SERVICE_ACCOUNT_JSON || !env.FIREBASE_PROJECT_ID) return false;
  const serviceToken = await getFirestoreAccessToken(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  const configResponse = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/adminStatus/config`, {
    headers: { Authorization: `Bearer ${serviceToken}` }
  });
  if (!configResponse.ok) return false;
  const config = await configResponse.json();
  return config.fields?.createdBy?.stringValue === user.localId;
}

async function brevoRequest(env, path, options = {}) {
  if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) throw new Error("Brevo email configuration is missing.");
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    ...options,
    headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Brevo request failed.");
  return result;
}

async function sendBrevoEmail(env, recipient, subject, htmlContent) {
  return brevoRequest(env, "/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender: { email: env.BREVO_SENDER_EMAIL, name: env.BREVO_SENDER_NAME || "Val's Glam" },
      to: [{ email: recipient }],
      subject,
      htmlContent
    })
  });
}

const emailBrand = '<div style="border-bottom:1px solid #eadcf2;margin-bottom:24px;padding-bottom:18px;text-align:center"><img src="https://valsglam.web.app/vals.jpg" alt="Val\'s Glam" style="border-radius:50%;display:inline-block;height:64px;width:64px"><div style="color:#7337a1;font-family:Georgia,serif;font-size:16px;margin-top:8px">Val\'s Glam</div></div>';
const shopButton = '<p style="margin:28px 0"><a href="https://valsglam.web.app" style="background:#24152c;color:#ffffff;display:inline-block;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:13px 22px;text-decoration:none">Shop Val\'s Glam</a></p>';

async function getBrevoListEmails(env) {
  const emails = [];
  for (let offset = 0; offset < 1000; offset += 50) {
    const result = await brevoRequest(env, `/contacts?limit=50&offset=${offset}&listIds[]=${encodeURIComponent(env.BREVO_LIST_ID)}`);
    const contacts = result.contacts || [];
    emails.push(...contacts.map((contact) => contact.email).filter(Boolean));
    if (contacts.length < 50) break;
  }
  return [...new Set(emails)];
}

async function getFirebaseSubscriberEmails(env) {
  const token = await getFirestoreAccessToken(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/subscribers?pageSize=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Could not load newsletter subscribers.");
  return (result.documents || []).map((document) => document.fields?.email?.stringValue).filter(Boolean);
}

async function parseRequestJson(request) {
  const contentType = request.headers.get("content-type") || "";

  try {
    return await request.json();
  } catch {
    const rawBody = await request.clone().text();
    if (!rawBody.trim()) return {};

    try {
      return JSON.parse(rawBody);
    } catch {
      if (contentType.includes("application/json") || contentType.includes("+json")) {
        throw new Error("Invalid JSON request.");
      }

      const fallback = {};
      try {
        const [, ...pairs] = rawBody.split("&");
        for (const pair of pairs) {
          const [key, value] = pair.split("=");
          if (key) fallback[decodeURIComponent(key)] = decodeURIComponent(value || "");
        }
      } catch {
        // ignore
      }

      return fallback;
    }
  }
}

function getCallbackUrl(value) {
  try {
    const url = new URL(String(value || ""));

    const isLocal =
      url.protocol === "http:" &&
      (url.hostname === "localhost" ||
        url.hostname === "127.0.0.1");

    const isProduction =
      url.protocol === "https:" &&
      ["steveokyere910.github.io", "valscarea1.web.app", "valscarea1.firebaseapp.com", "valsglam.web.app", "valsglam.firebaseapp.com"].includes(url.hostname);

    return isLocal || isProduction ? url.href : null;
  } catch {
    return null;
  }
}

async function paystackRequest(path, options, secret) {
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json"
    }
  });

  const result = await response.json();
  return { response, result };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin)
      });
    }

    if (!allowedOrigins.has(origin)) {
      return json({ error: "Origin not allowed." }, 403, origin);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, origin);
    }

    if (!env.PAYSTACK_SECRET_KEY) {
      return json(
        { error: "PAYSTACK_SECRET_KEY is not configured." },
        500,
        origin
      );
    }

    let data;

    try {
      data = await parseRequestJson(request);
    } catch {
      return json({ error: "Invalid JSON request." }, 400, origin);
    }

    if (!data || typeof data !== "object") {
      return json({ error: "Invalid JSON request." }, 400, origin);
    }

    const path = new URL(request.url).pathname;

    if (path === "/initialize") {
      const email = String(data.email || "").trim();
      const amount = Number(data.amount);
      const currency = String(data.currency || "GHS").toUpperCase();
      const callbackUrl = getCallbackUrl(data.callbackUrl);

      if (
        !email ||
        !email.includes("@") ||
        !callbackUrl ||
        !Number.isInteger(amount) ||
        amount < 1 ||
        !["GHS", "USD", "GBP"].includes(currency)
      ) {
        return json({ error: "Invalid payment details." }, 400, origin);
      }

      try {
        const { response, result } = await paystackRequest(
          "/transaction/initialize",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              amount,
              currency,
              callback_url: callbackUrl,
              metadata: {
                items: Array.isArray(data.items) ? data.items : []
              }
            })
          },
          env.PAYSTACK_SECRET_KEY
        );

        if (
          !response.ok ||
          !result.status ||
          !result.data?.authorization_url
        ) {
          console.error("Paystack initialization error:", result);

          return json(
            {
              error:
                result.message || "Payment could not be initialized."
            },
            502,
            origin
          );
        }

        return json(
          {
            authorizationUrl: result.data.authorization_url,
            reference: result.data.reference
          },
          200,
          origin
        );
      } catch (error) {
        console.error("Paystack initialization error:", error);
        return json(
          { error: "Unable to connect to Paystack." },
          502,
          origin
        );
      }
    }

    if (path === "/verify") {
      const reference = String(data.reference || "").trim();

      if (!/^[A-Za-z0-9._-]{8,100}$/.test(reference)) {
        return json({ error: "Invalid payment reference." }, 400, origin);
      }

      try {
        const { response, result } = await paystackRequest(
          `/transaction/verify/${encodeURIComponent(reference)}`,
          { method: "GET" },
          env.PAYSTACK_SECRET_KEY
        );

        if (!response.ok || !result.status) {
          return json(
            { error: "Payment verification failed." },
            400,
            origin
          );
        }

        if (result.data?.status === "success") {
          try {
            await reserveStock(env, reference, Array.isArray(result.data?.metadata?.items) ? result.data.metadata.items : []);
          } catch (stockError) {
            console.error("Stock reservation failed:", stockError);
            return json({ error: stockError.message || "Stock could not be updated." }, 409, origin);
          }
        }

        return json(
          {
            status: result.data?.status || "failed",
            reference,
            orderId: reference
          },
          200,
          origin
        );
      } catch (error) {
        console.error("Paystack verification error:", error);
        return json(
          { error: "Unable to verify payment." },
          502,
          origin
        );
      }
    }

    if (path === "/subscribe") {
      const email = String(data.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return json({ error: "Please enter a valid email address." }, 400, origin);
      }
      if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
        return json({ error: "Newsletter service is not configured." }, 503, origin);
      }
      try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ email, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true })
        });
        if (!response.ok && response.status !== 201) {
          const result = await response.json().catch(() => ({}));
          console.error("Brevo subscription error:", result);
          return json({ error: "Could not join the newsletter right now." }, 502, origin);
        }
        return json({ subscribed: true }, 200, origin);
      } catch (error) {
        console.error("Brevo subscription request failed:", error);
        return json({ error: "Newsletter service is unavailable." }, 502, origin);
      }
    }

    if (path === "/notify-catalog" || path === "/notify-delivery") {
      let isAdmin = false;
      try {
        isAdmin = await authorizeAdmin(request, env);
      } catch (error) {
        console.error("Admin notification authorization failed:", error);
      }
      if (!isAdmin) return json({ error: "Admin authorization required." }, 403, origin);

      try {
        if (path === "/notify-delivery") {
          const email = String(data.email || "").trim().toLowerCase();
          const orderId = String(data.orderId || "").trim();
          if (!email || !orderId) return json({ error: "Delivery notification details are incomplete." }, 400, origin);
          await sendBrevoEmail(env, email, "Your Val's Glam order has been delivered", `${emailBrand}<p>Hello,</p><p>Your Val's Glam order <strong>${orderId}</strong> has been marked as delivered.</p><p>Thank you for shopping with us.</p>${shopButton}`);
          return json({ sent: true }, 200, origin);
        }

        const productName = String(data.productName || "Val's Glam product").trim();
        const price = String(data.price || "").trim();
        const previousPrice = String(data.previousPrice || "").trim();
        const isNewProduct = data.isNewProduct === true;
        const subject = isNewProduct ? `New at Val's Glam: ${productName}` : `Price update: ${productName}`;
        const message = isNewProduct
          ? `${emailBrand}<p>Meet our newest Val's Glam find: <strong>${productName}</strong>.</p><p>It is now available in the shop for <strong>${price}</strong>.</p>${shopButton}`
          : `${emailBrand}<p>The price of <strong>${productName}</strong> has changed from <strong>${previousPrice}</strong> to <strong>${price}</strong>.</p><p>Visit Val's Glam to see the latest details.</p>${shopButton}`;
        const [brevoRecipients, firebaseRecipients] = await Promise.all([
          getBrevoListEmails(env).catch((error) => { console.error("Brevo list lookup failed:", error); return []; }),
          getFirebaseSubscriberEmails(env)
        ]);
        const recipients = [...new Set([...brevoRecipients, ...firebaseRecipients])];
        const results = await Promise.allSettled(recipients.map((email) => sendBrevoEmail(env, email, subject, message)));
        const failed = results.filter((result) => result.status === "rejected");
        if (failed.length) console.error("Some catalog emails failed:", failed.map((result) => result.reason?.message));
        return json({ sent: results.length - failed.length, failed: failed.length }, 200, origin);
      } catch (error) {
        console.error("Brevo notification failed:", error);
        return json({ error: error.message || "Email notification failed." }, 502, origin);
      }
    }

    return json({ error: "Not found." }, 404, origin);
  }
};