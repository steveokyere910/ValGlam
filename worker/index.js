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

        return json(
          {
            status: result.data?.status || "failed",
            reference
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