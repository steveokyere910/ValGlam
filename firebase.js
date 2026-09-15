const firebaseConfig = {
  apiKey: "AIzaSyDZbU0dmAgim2APAZaLGTlCOVM4FJAcRY0",
  authDomain: "valsglam.firebaseapp.com",
  projectId: "valsglam",
  storageBucket: "valsglam.firebasestorage.app",
  messagingSenderId: "1006792491156",
  appId: "1:1006792491156:web:61024ee98edf810a30b481",
  measurementId: "G-TXKMRN9B3C"
};

window.valCarePaystackPublicKey = "pk_live_7a007406a4fbe121a6733261cb39ff84ad72e0af";
window.valCarePaymentApiUrl = "https://valcare-payments.okyeresolomon910.workers.dev";
window.valCareVapidKey = "BNcP67r2bdKH58rf8UJ0nnxFGEfPxS4VsScGl8cLjzhWaRHVHejAJaQ8G6e7STd300v1AoTVb8tytfi40mzsXmU";
window.valCareCloudinaryCloudName = "zwemtxte";
window.valCareCloudinaryApiKey = "963816758362643";
window.valCareCloudinaryUploadPreset = "valcare_products";

try {
  const app = firebase.initializeApp(firebaseConfig);
  window.valCareAnalytics = firebase.analytics(app);
  window.valCareAuth = firebase.auth(app);
  window.valCareDb = firebase.firestore(app);
  window.valCareFunctions = firebase.functions(app);
  window.valCareDb.settings({ experimentalForceLongPolling: true, useFetchStreams: false });
} catch (error) {
  console.warn("ValCare analytics is unavailable in this environment.", error);
  window.valCareAnalytics = null;
  window.valCareDb = null;
  window.valCareStorage = null;
}

try {
  window.valCareStorage = firebase.storage();
} catch (error) {
  window.valCareStorage = null;
  console.info("Firebase Storage is unavailable. Product image uploads are disabled.");
}

try {
  window.valCareMessaging = firebase.messaging();
} catch (error) {
  window.valCareMessaging = null;
  console.info("ValCare push notifications are unavailable in this browser.");
}

async function saveValCareStaff(staff) {
  if (!window.valCareDb) throw new Error("Firestore is unavailable.");
  return window.valCareDb.collection("staff").add({
    ...staff,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

window.saveValCareStaff = saveValCareStaff;

function trackValCareEvent(name, parameters) {
  if (window.valCareAnalytics) {
    window.valCareAnalytics.logEvent(name, parameters);
  }
}

window.trackValCareEvent = trackValCareEvent;
