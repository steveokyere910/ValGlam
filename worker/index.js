const allowedOrigin = "https://steveokyere910.github.io";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? allowedOrigin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}

function validCallback(value) {
  try {
    const callback = new URL(String(value || ""));
    return callback.protocol === "https:" && callback.hostname === "steveokyere910.github.io"
      ? callback.origin + callback.pathname
      : null;
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (origin !== allowedOrigin || request.method !== "POST") return json({ error: "Not found." }, 404, origin);
    if (!env.PAYSTACK_SECRET_KEY) return json({ error: "Payment service is not configured." }, 500, origin);

    const path = new URL(request.url).pathname;
    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400, origin);
    }

    if (path === "/initialize") {
      const email = String(data.email || "").trim();
      const callbackUrl = validCallback(data.callbackUrl);
      const amount = Number(data.amount);
      const currency = String(data.currency || "GHS");
      if (!email || !callbackUrl || !Number.isInteger(amount) || amount < 1 || !["GHS", "USD", "GBP"].includes(currency)) {
        return json({ error: "Invalid payment details." }, 400, origin);
      }
      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount, currency, metadata: { items: data.items || [] }, callback_url: callbackUrl })
      });
      const result = await response.json();
      if (!response.ok || !result.status || !result.data?.authorization_url) return json({ error: "Payment could not be initialized." }, 502, origin);
      return json({ authorizationUrl: result.data.authorization_url, reference: result.data.reference }, 200, origin);
    }

    if (path === "/verify") {
      const reference = String(data.reference || "").trim();
      if (!/^[A-Za-z0-9._-]{8,100}$/.test(reference)) return json({ error: "Invalid payment reference." }, 400, origin);
      const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` }
      });
      const result = await response.json();
      if (!response.ok || !result.status || result.data?.status !== "success") return json({ error: "Payment has not been confirmed." }, 400, origin);
      return json({ status: "paid", reference }, 200, origin);
    }

    return json({ error: "Not found." }, 404, origin);
  }
};
