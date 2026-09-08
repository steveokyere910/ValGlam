const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const paystackSecret = defineSecret("PAYSTACK_SECRET_KEY");

const currencies = {
  GHS: { rate: 1, minorUnit: 100 },
  USD: { rate: 0.078, minorUnit: 100 },
  GBP: { rate: 0.061, minorUnit: 100 }
};

const defaultProducts = [
  { id: 1, name: "Bloom perfume oil", category: "Beauty", price: 18 },
  { id: 2, name: "Wall stickers", category: "Home", price: 12 },
  { id: 3, name: "Wall hook", category: "Home", price: 9 },
  { id: 4, name: "Mini fan", category: "Lifestyle", price: 22 },
  { id: 5, name: "Scrunchie set", category: "Accessories", price: 8 },
  { id: 6, name: "Mini purse", category: "Accessories", price: 25 },
  { id: 7, name: "Lip gloss", category: "Beauty", price: 14 },
  { id: 8, name: "Shower gel", category: "Beauty", price: 16 }
];

async function getCatalog() {
  const snapshot = await db.collection("products").get();
  const remoteProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const remoteById = new Map(remoteProducts.map((product) => [String(product.id), product]));
  return defaultProducts.map((product) => remoteById.get(String(product.id)) || product)
    .concat(remoteProducts.filter((product) => !defaultProducts.some((item) => String(item.id) === String(product.id))));
}

async function getCart(data) {
  if (!data || !Array.isArray(data.items) || data.items.length < 1 || data.items.length > 50) {
    throw new HttpsError("invalid-argument", "Your cart is invalid.");
  }
  if (!currencies[data.currency]) throw new HttpsError("invalid-argument", "Unsupported currency.");

  const catalog = await getCatalog();
  const byId = new Map(catalog.map((product) => [String(product.id), product]));
  const items = data.items.map((item) => {
    const product = byId.get(String(item.id));
    if (!product || !Number.isFinite(Number(product.price)) || Number(product.price) < 0) {
      throw new HttpsError("failed-precondition", "A product in your cart is unavailable.");
    }
    if (Number(product.stock) <= 0) throw new HttpsError("failed-precondition", `${product.name} is sold out.`);
    return { id: product.id, name: product.name, category: product.category, price: Number(product.price) };
  });
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const total = Number((subtotal * currencies[data.currency].rate).toFixed(2));
  return { items, subtotal, total, currency: data.currency };
}

function getCallbackUrl(value) {
  try {
    const callback = new URL(String(value || ""));
    const local = callback.hostname === "localhost" || callback.hostname === "127.0.0.1";
    const hosted = ["valscarea1.web.app", "valscarea1.firebaseapp.com", "steveokyere910.github.io"].includes(callback.hostname);
    if ((callback.protocol !== "https:" && !local) || (!local && !hosted)) throw new Error("Invalid callback host");
    return callback.origin + callback.pathname;
  } catch {
    throw new HttpsError("invalid-argument", "Invalid payment callback URL.");
  }
}

exports.initializePaystackPayment = onCall({ secrets: [paystackSecret], enforceAppCheck: false }, async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Please sign in before checkout.");
  const cart = await getCart(request.data);
  const email = request.auth.token.email;
  if (!email) throw new HttpsError("failed-precondition", "Your account needs an email address.");

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${paystackSecret.value()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      amount: Math.round(cart.total * currencies[cart.currency].minorUnit),
      currency: cart.currency,
      metadata: { userId: request.auth.uid, items: cart.items.map((item) => item.id) },
      callback_url: getCallbackUrl(request.data.callbackUrl)
    })
  });
  const result = await response.json();
  if (!response.ok || !result.status || !result.data?.authorization_url) {
    console.error("Paystack initialization failed", result);
    throw new HttpsError("internal", "Payment could not be initialized.");
  }
  return { authorizationUrl: result.data.authorization_url, reference: result.data.reference };
});

exports.verifyPaystackPayment = onCall({ secrets: [paystackSecret] }, async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Please sign in before verifying payment.");
  const reference = String(request.data?.reference || "").trim();
  if (!/^[A-Za-z0-9._-]{8,100}$/.test(reference)) throw new HttpsError("invalid-argument", "Invalid payment reference.");

  const existing = await db.collection("orders").doc(reference).get();
  if (existing.exists) {
    if (existing.data().userId !== request.auth.uid) throw new HttpsError("permission-denied", "This payment does not belong to you.");
    return { orderId: reference, status: existing.data().status };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${paystackSecret.value()}` }
  });
  const result = await response.json();
  const payment = result.data;
  if (!response.ok || !result.status || payment?.status !== "success") {
    throw new HttpsError("failed-precondition", "Payment has not been confirmed.");
  }
  if (payment.customer?.email !== request.auth.token.email || payment.metadata?.userId !== request.auth.uid) {
    throw new HttpsError("permission-denied", "This payment does not belong to you.");
  }

  const cart = await getCart({ items: (payment.metadata?.items || []).map((id) => ({ id })), currency: payment.currency || "GHS" });
  const expectedAmount = Math.round(cart.total * currencies[cart.currency].minorUnit);
  if (payment.currency !== cart.currency || Number(payment.amount) !== expectedAmount) {
    throw new HttpsError("failed-precondition", "Payment amount does not match the order.");
  }

  const quantities = new Map();
  cart.items.forEach((item) => quantities.set(String(item.id), (quantities.get(String(item.id)) || 0) + 1));
  const orderRef = db.collection("orders").doc(reference);
  await db.runTransaction(async (transaction) => {
    const existingOrder = await transaction.get(orderRef);
    if (existingOrder.exists) return;

    const productSnapshots = [];
    for (const productId of quantities.keys()) {
      productSnapshots.push({ id: productId, snapshot: await transaction.get(db.collection("products").doc(productId)) });
    }
    productSnapshots.forEach(({ id, snapshot }) => {
      if (!snapshot.exists) throw new HttpsError("failed-precondition", "A product in your order is no longer available.");
      const stock = Number(snapshot.data().stock);
      const requested = quantities.get(id);
      if (!Number.isInteger(stock) || stock < requested) {
        throw new HttpsError("failed-precondition", `${snapshot.data().name || "A product"} does not have enough stock.`);
      }
    });
    productSnapshots.forEach(({ id, snapshot }) => {
      transaction.update(snapshot.ref, { stock: Number(snapshot.data().stock) - quantities.get(id), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    });
    transaction.create(orderRef, {
      userId: request.auth.uid,
      customerName: request.auth.token.name || request.auth.token.email.split("@")[0],
      customerEmail: request.auth.token.email,
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.total,
      currency: cart.currency,
      status: "paid",
      paymentReference: reference,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });
  return { orderId: reference, status: "paid" };
});

exports.sendNotificationPush = onDocumentCreated("notifications/{notificationId}", async (event) => {
  const notification = event.data?.data();
  if (!notification?.title || !notification?.message) return;

  const tokenQuery = notification.audience === "user"
    ? db.collection("pushTokens").where("userId", "==", notification.recipientId)
    : db.collection("pushTokens");
  const tokenSnapshot = await tokenQuery.get();
  const tokenDocuments = tokenSnapshot.docs.filter((document) => document.data().token);
  const tokens = tokenDocuments.map((document) => document.data().token);
  if (!tokens.length) return;

  const response = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title: notification.title, body: notification.message },
    data: { notificationId: event.params.notificationId },
    webpush: {
      notification: {
        title: notification.title,
        body: notification.message,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        silent: false
      },
      fcmOptions: { link: "/" }
    }
  });

  const cleanup = tokenDocuments.filter((document, index) => {
    const errorCode = response.responses[index]?.error?.code;
    return errorCode === "messaging/registration-token-not-registered" || errorCode === "messaging/invalid-registration-token";
  });
  await Promise.all(cleanup.map((document) => document.ref.delete()));
});
