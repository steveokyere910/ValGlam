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
    "Access-Control-Allow-Headers": "Content-Type",
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

    return json({ error: "Not found." }, 404, origin);
  }
};