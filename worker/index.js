const allowedOrigins = new Set([
  "https://steveokyere910.github.io",
  "https://valscarea1.web.app",
  "https://valscarea1.firebaseapp.com",
  "http://127.0.0.1:5500",
  "http://localhost:5500"
]);

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

function getCallbackUrl(value) {
  try {
    const url = new URL(String(value || ""));

    const isLocal =
      url.protocol === "http:" &&
      (url.hostname === "localhost" ||
        url.hostname === "127.0.0.1");

    const isProduction =
      url.protocol === "https:" &&
      ["steveokyere910.github.io", "valscarea1.web.app", "valscarea1.firebaseapp.com"].includes(url.hostname);

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

function base64UrlEncode(value) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToBytes(pem) {
  const normalized = String(pem).replace(/^"|"$/g, "").replace(/\\n/g, "\n");
  const pemMatch = normalized.match(/-----BEGIN [^-]+-----([\s\S]*?)-----END [^-]+-----/);
  const base64 = (pemMatch ? pemMatch[1] : normalized).replace(/[^A-Za-z0-9+/=]/g, "");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getFirestoreAccessToken(env) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64UrlEncode(JSON.stringify({
    iss: env.FIREBASE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600
  }));
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToBytes(env.FIREBASE_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${header}.${claim}.${base64UrlEncode(signature)}`
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) throw new Error(`Firebase service authentication failed: ${result.error_description || result.error || "unknown OAuth error"}.`);
  return result.access_token;
}

function firestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return { doubleValue: value };
  return { stringValue: String(value) };
}

function firestoreMap(fields) {
  return { mapValue: { fields } };
}

function firestoreDocument(fields) {
  return { fields };
}

function fromFirestoreValue(value) {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  return null;
}

async function firestoreRequest(path, options, env) {
  const token = await getFirestoreAccessToken(env);
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(env.FIREBASE_PROJECT_ID)}/databases/(default)/documents${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const result = await response.json().catch(() => ({}));
  return { response, result };
}

async function createPaidOrderAndReduceStock({ reference, payment, env }) {
  const orderPath = `/orders/${encodeURIComponent(reference)}`;
  const existing = await firestoreRequest(orderPath, { method: "GET" }, env);
  if (existing.response.ok) return { status: "paid", orderId: reference };
  if (existing.response.status !== 404) throw new Error(`Could not check the existing order (${existing.response.status}): ${existing.result.error?.message || "Firestore denied the request"}.`);

  const ids = Array.isArray(payment.metadata?.items) ? payment.metadata.items.map(String) : [];
  if (!ids.length) throw new Error("The payment does not contain product details.");
  const products = [];
  for (const id of ids) {
    const document = await firestoreRequest(`/products/${encodeURIComponent(id)}`, { method: "GET" }, env);
    if (!document.response.ok) throw new Error("A purchased product could not be found.");
    const fields = document.result.fields || {};
    products.push({
      id,
      name: fromFirestoreValue(fields.name?.stringValue ? fields.name : fields.name),
      category: fromFirestoreValue(fields.category),
      price: Number(fromFirestoreValue(fields.price)),
      stock: Number(fromFirestoreValue(fields.stock)),
      updateTime: document.result.updateTime
    });
  }
  const quantities = new Map();
  products.forEach((product) => quantities.set(product.id, (quantities.get(product.id) || 0) + 1));
  products.forEach((product) => {
    if (!Number.isInteger(product.stock) || product.stock < quantities.get(product.id)) throw new Error(`${product.name || "A product"} is out of stock.`);
  });
  const items = products.map((product) => ({ id: product.id, name: product.name, category: product.category, price: product.price, quantity: 1 }));
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const orderFields = {
    id: firestoreValue(reference),
    userId: firestoreValue(payment.metadata.userId),
    customerName: firestoreValue(payment.metadata.customerName || payment.customer?.email?.split("@")[0] || "Customer"),
    customerEmail: firestoreValue(payment.customer?.email || ""),
    items: { arrayValue: { values: items.map((item) => firestoreMap({ id: firestoreValue(item.id), name: firestoreValue(item.name), category: firestoreValue(item.category), price: firestoreValue(item.price), quantity: firestoreValue(1) })) } },
    subtotal: firestoreValue(total),
    total: firestoreValue(total),
    currency: firestoreValue(payment.currency || "GHS"),
    status: firestoreValue("paid"),
    paymentReference: firestoreValue(reference),
    createdAt: { timestampValue: new Date().toISOString() }
  };
  const writes = [];
  for (const product of products) {
    writes.push({
      update: { name: `projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/products/${product.id}`, fields: { stock: firestoreValue(product.stock - quantities.get(product.id)) } },
      currentDocument: { updateTime: product.updateTime },
      updateMask: { fieldPaths: ["stock"] }
    });
  }
  writes.push({ update: { name: `projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/orders/${reference}`, ...firestoreDocument(orderFields) }, currentDocument: { exists: false } });
  const commit = await firestoreRequest(":commit", { method: "POST", body: JSON.stringify({ writes }) }, env);
  if (!commit.response.ok) throw new Error("The order could not be saved or stock was already changed.");
  return { status: "paid", orderId: reference };
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

    if (!env.PAYSTACK_SECRET_KEY || !env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
      return json(
        { error: "Payment or Firebase Worker secrets are not configured." },
        500,
        origin
      );
    }

    let data;

    try {
      data = await request.json();
    } catch {
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
                items: Array.isArray(data.items) ? data.items : [],
                userId: String(data.userId || ""),
                customerName: String(data.customerName || "")
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

        if (result.data?.status !== "success") {
          return json({ status: result.data?.status || "failed", reference, orderId: reference }, 200, origin);
        }
        const order = await createPaidOrderAndReduceStock({ reference, payment: result.data, env });
        return json({ ...order, reference }, 200, origin);
      } catch (error) {
        console.error("Paystack verification error:", error);
        return json(
          { error: error instanceof Error ? error.message : "Unable to verify payment." },
          502,
          origin
        );
      }
    }

    return json({ error: "Not found." }, 404, origin);
  }
};