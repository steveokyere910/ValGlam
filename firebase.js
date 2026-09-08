const firebaseConfig = {
  apiKey: "AIzaSyAd7DYedZQ-_1ttp8HP_Sr9WAasiRdFuO0",
  authDomain: "valscarea1.firebaseapp.com",
  projectId: "valscarea1",
  storageBucket: "valscarea1.firebasestorage.app",
  messagingSenderId: "190919597993",
  appId: "1:190919597993:web:8faf23022bf58a93892eb8",
  measurementId: "G-B63SXKQXSC"
};

window.valCarePaystackPublicKey = "pk_live_304204e9c806c48c9638865646cc5f4f7162a1ef";
window.valCarePaymentApiUrl = "https://valcare-payments.frankokyere910.workers.dev";

try {
  const app = firebase.initializeApp(firebaseConfig);
  window.valCareAnalytics = firebase.analytics(app);
  window.valCareAuth = firebase.auth(app);
  window.valCareDb = firebase.firestore(app);
  window.valCareStorage = firebase.storage(app);
  window.valCareFunctions = firebase.functions(app);
  window.valCareDb.settings({ experimentalForceLongPolling: true, useFetchStreams: false });
} catch (error) {
  console.warn("ValCare analytics is unavailable in this environment.", error);
  window.valCareAnalytics = null;
  window.valCareDb = null;
  window.valCareStorage = null;
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
