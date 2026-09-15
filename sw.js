importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js", "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDZbU0dmAgim2APAZaLGTlCOVM4FJAcRY0",
  authDomain: "valsglam.firebaseapp.com",
  projectId: "valsglam",
  storageBucket: "valsglam.firebasestorage.app",
  messagingSenderId: "1006792491156",
  appId: "1:1006792491156:web:61024ee98edf810a30b481"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Val's Glam update";
  const options = {
    body: payload.notification?.body || "You have a new Val's Glam notification.",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: payload.data?.notificationId || "valcare-notification",
    data: { url: self.location.origin + "/" },
    silent: false
  };
  self.registration.showNotification(title, options);
});

const CACHE_NAME = "valcare-v20";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=26",
  "./app.jsx?v=39",
  "./firebase.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./vals.jpg",
  "./image.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
    const existingClient = clientList.find((client) => "focus" in client);
    return existingClient ? existingClient.focus() : clients.openWindow(event.notification.data?.url || "/");
  }));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((response) => response || caches.match("./index.html")))
  );
});
