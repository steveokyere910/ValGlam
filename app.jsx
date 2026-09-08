const { useEffect, useRef, useState } = React;

const defaultProducts = [
  { id: 1, name: "Bloom perfume oil", category: "Beauty", price: 18, stock: 12, icon: "🧴", tone: "tone-rose", tag: "Bestseller" },
  { id: 2, name: "Wall stickers", category: "Home", price: 12, stock: 18, icon: "🌸", tone: "tone-sage" },
  { id: 3, name: "Wall hook", category: "Home", price: 9, stock: 15, icon: "☁️", tone: "tone-yellow" },
  { id: 4, name: "Mini fan", category: "Lifestyle", price: 22, stock: 8, icon: "🪭", tone: "tone-lilac", tag: "New" },
  { id: 5, name: "Scrunchie set", category: "Accessories", price: 8, stock: 20, icon: "🎀", tone: "tone-blue" },
  { id: 6, name: "Mini purse", category: "Accessories", price: 25, stock: 6, icon: "👛", tone: "tone-peach" },
  { id: 7, name: "Lip gloss ", category: "Beauty", price: 14, stock: 14, icon: "💄", tone: "tone-pink" },
  { id: 8, name: "Shower gel", category: "Beauty", price: 16, stock: 10, icon: "🫧", tone: "tone-green" },
];

const categories = ["All pieces", "Beauty", "Accessories", "Home", "Lifestyle"];
const adminBootstrapEmail = "steveokyere910@gmail.com";
const currencies = { GHS: { symbol: "GH₵", rate: 1 }, USD: { symbol: "$", rate: 0.078 }, GBP: { symbol: "£", rate: 0.061 } };
const translations = {
  en: { settings: "Settings", cart: "Your cart", notifications: "Notifications", transactions: "Transactions", language: "Language", currency: "Currency", theme: "Theme", password: "Change password", save: "Save password", light: "Light", dark: "Dark", system: "System", orderUpdates: "Order updates", offers: "Offers and new drops", viewTransactions: "View transactions", shop: "Shop all", beauty: "Beauty", lifestyle: "Lifestyle", story: "Our story", locate: "Locate us", announcement: "Free delivery on UCC campus.", heroEyebrow: "Small things, soft moments", heroTitle: "Little luxuries for", heroTitleEm: "lovely days.", heroText: "Thoughtful accessories and feel-good finds to make your everyday a little more beautiful.", explore: "Explore the collection", shopEdit: "Shop the", edit: "edit", viewAll: "View all pieces", search: "Search pieces", add: "Add to bag", reviews: "Reviews", newsletterTitle: "A little note from us", newsletterText: "New drops, sweet offers, and good things in your inbox.", join: "Join us", email: "Your email address", cartEmpty: "Your cart is waiting for something lovely.", continueShopping: "Continue shopping", pay: "Pay securely with Paystack" },
  tw: { settings: "Nhyehyɛe", cart: "Wo cart", notifications: "Amanneɛbɔ", transactions: "Nkitahodi", language: "Kasa", currency: "Sika", theme: "Ɛkwan", password: "Sesa password", save: "Sie password", light: "Kanea", dark: "Sum", system: "System", orderUpdates: "Order nsɛm foforo", offers: "Nneɛma foforo ne offers", viewTransactions: "Hwɛ nkitahodi", shop: "Tɔ nneɛma nyinaa", beauty: "Beauty", lifestyle: "Asetra", story: "Yɛn ho asɛm", locate: "Hwehwɛ yɛn", announcement: "Yɛde ma kwa wɔ UCC campus.", heroEyebrow: "Nneɛma nketewa, anigye mmere", heroTitle: "Nneɛma fɛfɛ ma", heroTitleEm: "nna a ɛyɛ anigye.", heroText: "Nneɛma fɛfɛ a ɛbɛma wo da biara ayɛ yie.", explore: "Hwɛ nneɛma no", shopEdit: "Tɔ", edit: "nneɛma", viewAll: "Hwɛ nneɛma nyinaa", search: "Hwehwɛ nneɛma", add: "Fa kɔ cart", reviews: "Nsusuwii", newsletterTitle: "Asɛm ketewa bi fi yɛn nkyɛn", newsletterText: "Nneɛma foforo ne offers wɔ wo inbox mu.", join: "Ka yɛn ho", email: "Wo email", cartEmpty: "Wo cart retwɛn biribi fɛfɛ.", continueShopping: "Kɔ so tɔ", pay: "Tua denam Paystack so" },
  fr: { settings: "Paramètres", cart: "Votre panier", notifications: "Notifications", transactions: "Transactions", language: "Langue", currency: "Devise", theme: "Thème", password: "Changer le mot de passe", save: "Enregistrer", light: "Clair", dark: "Sombre", system: "Système", orderUpdates: "Mises à jour de commande", offers: "Offres et nouveautés", viewTransactions: "Voir les transactions", shop: "Tout acheter", beauty: "Beauté", lifestyle: "Style de vie", story: "Notre histoire", locate: "Nous trouver", announcement: "Livraison gratuite sur le campus UCC.", heroEyebrow: "Petites choses, doux moments", heroTitle: "Petits plaisirs pour des", heroTitleEm: "jours heureux.", heroText: "Des accessoires choisis pour rendre votre quotidien plus agréable.", explore: "Découvrir la collection", shopEdit: "Découvrez la", edit: "sélection", viewAll: "Voir tous les articles", search: "Rechercher", add: "Ajouter au panier", reviews: "Avis", newsletterTitle: "Un petit mot de nous", newsletterText: "Nouveautés et offres dans votre boîte mail.", join: "Rejoindre", email: "Votre adresse e-mail", cartEmpty: "Votre panier attend quelque chose de joli.", continueShopping: "Continuer vos achats", pay: "Payer avec Paystack" }
};

function SearchIcon() {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.7"/><path d="m16 16 4.5 4.5"/></svg>;
}
function BagIcon() {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M5 8.5h14l-1 11H6l-1-11Z"/><path d="M9 9V6.7a3 3 0 0 1 6 0V9"/></svg>;
}
function BellIcon() {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>;
}
function SettingsIcon() {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>;
}
function SocialIcon({ name }) {
  if (name === "telegram") return <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 3.4 18.5 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.9 13.7.9 12.1c-1.1-.3-1.1-1.1.2-1.6L20.6 3c.9-.3 1.6.2 1.1.4Z" /></svg>;
  if (name === "whatsapp") return <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a9.9 9.9 0 0 0-8.6 14.8L2 22l5.4-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.4-.7-1.6-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.7-.2-.3.2-.3.6-1 .1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-.8 2.1-.2 3.1 1.2 2.1 2.9 3.8 5.1 4.7 1.4.6 2 .6 2.7.5.4-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2Z" /></svg>;
  if (name === "tiktok") return <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16.7 3c.2 1.8 1.2 2.9 3 3v3.1c-1.7.2-3.1-.4-4.4-1.2v6.4c0 5.2-5.7 6.8-8.9 4.1-3.1-2.5-1.9-7.7 2.1-8.7 1.1-.3 2.1-.1 3 .3v3.2c-.3-.1-.6-.3-1-.3-1.7-.1-2.7 1.5-2.1 2.7.6 1.2 2.4 1.3 3.2.3.4-.5.4-1.1.4-1.8V3h4.7Z" /></svg>;
  return <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.2c-3.8 0-6.7 2.8-6.7 7 0 2.3-.1 3.1-1.2 4.3-.3.4-.2.9.3 1.1.7.3 1.6.5 2.5.6.2.7.5 1.4 1 1.8.4.3.8.2 1.2.1.6-.2 1.2-.1 1.8.2.4.2.7.8 1.1 1.6.1.3.5.5 1 .5s.9-.2 1-.5c.4-.8.7-1.4 1.1-1.6.6-.3 1.2-.4 1.8-.2.4.1.8.2 1.2-.1.5-.4.8-1.1 1-1.8.9-.1 1.8-.3 2.5-.6.5-.2.6-.7.3-1.1-1.1-1.2-1.2-2-1.2-4.3 0-4.2-2.9-7-6.7-7Zm-2 7.2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" /></svg>;
}
function ProviderLogo({ name }) {
  if (name === "Google") return <svg className="provider-logo" aria-hidden="true" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z"/><path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z"/><path fill="#FBBC05" d="M6.53 13.59A5.85 5.85 0 0 1 6.22 12c0-.55.11-1.09.31-1.59V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.12l3.24-2.53Z"/><path fill="#EA4335" d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.53C7.3 8.1 9.46 6.38 12 6.38Z"/></svg>;
  return null;
}
function PasswordInput(props) {
  const [visible, setVisible] = useState(false);
  return <div className="password-field"><input {...props} type={visible ? "text" : "password"} /><button className="password-toggle" type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} title={visible ? "Hide password" : "Show password"}>{visible ? "Hide" : "Show"}</button></div>;
}

function LoadingSpinner({ label = "Loading" }) {
  return (
    <span className="loading-inline" aria-live="polite" aria-label={label}>
      <span className="loading-ring" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [activeCategory, setActiveCategory] = useState("All pieces");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [siteReady, setSiteReady] = useState(false);
  const cartOwnerUid = useRef(null);
  const cartHydrated = useRef(false);
  const [cartMessage, setCartMessage] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [readNotificationIds, setReadNotificationIds] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [reportView, setReportView] = useState("pending");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [deliveringOrderId, setDeliveringOrderId] = useState(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [preferences, setPreferences] = useState({ updates: true, offers: false });
  const [currency, setCurrency] = useState("GHS");
  const [language, setLanguage] = useState(() => ["en", "tw", "fr"].includes(window.localStorage.getItem("valcare-language")) ? window.localStorage.getItem("valcare-language") : "en");
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const [pushStatus, setPushStatus] = useState("idle");
  const audioContextRef = useRef(null);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [theme, setTheme] = useState(() => ["light", "dark", "system"].includes(window.localStorage.getItem("valcare-theme")) ? window.localStorage.getItem("valcare-theme") : "light");
  const [cosmeticMotion, setCosmeticMotion] = useState(65);
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState({ name: "", email: "", password: "", confirm: "" });
  const [userName, setUserName] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [adminMode, setAdminMode] = useState(false);
  const [adminSetupAvailable, setAdminSetupAvailable] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [productForm, setProductForm] = useState({ id: null, name: "", category: "Beauty", price: "", stock: "", icon: "✨", tone: "tone-rose", tag: "", imageUrl: "" });
  const [productMessage, setProductMessage] = useState("");
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const loader = document.querySelector(".initial-loader");
    if (!loader) {
      setSiteReady(true);
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => {
      loader.classList.add("is-ready");
      window.setTimeout(() => {
        setSiteReady(true);
        loader.remove();
      }, 820);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--motion-scale", `${cosmeticMotion / 65}`);
  }, [cosmeticMotion]);

  useEffect(() => {
    if (!siteReady) return undefined;
    const revealables = document.querySelectorAll(".section, .value-strip, .locations-section, .newsletter, .product-card, .location-card");
    if (!revealables.length) return undefined;
    revealables.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
    });
    if (!("IntersectionObserver" in window)) {
      revealables.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    revealables.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [siteReady]);

  useEffect(() => {
    window.localStorage.setItem("valcare-language", language);
  }, [language]);

  useEffect(() => {
    if (!window.valCareMessaging) return undefined;
    return window.valCareMessaging.onMessage((payload) => {
      const title = payload.notification?.title || "ValCare update";
      const body = payload.notification?.body || "You have a new ValCare notification.";
      playNotificationSound();
      if (document.visibilityState === "visible" && "Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body, icon: "icon-192.png", tag: payload.data?.notificationId || "valcare-notification" });
      }
    });
  }, []);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    const iosDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    setIsStandalone(standalone);
    setIsIos(iosDevice);
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };
    const handleInstalled = () => {
      setInstallPromptEvent(null);
      setIsStandalone(true);
      setInstallHelpOpen(false);
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("valcare-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!window.valCareAuth) return undefined;
    let authRequest = 0;
    return window.valCareAuth.onAuthStateChanged(async (user) => {
      const requestId = ++authRequest;
      setCart(0);
      setCartItems([]);
      setWishlistItems([]);
      setFavoriteIds([]);
      cartOwnerUid.current = user?.uid || null;
      cartHydrated.current = false;
      const displayName = user?.displayName || user?.email?.split("@")[0] || "";
      setUserName(displayName.trim().split(/\s+/)[0] || "");
      if (!user) {
        setIsAdmin(false);
        setIsAccountLoading(false);
        return;
      }
      const token = await user.getIdTokenResult();
      const setup = await window.valCareDb?.collection("adminStatus").doc("config").get();
      const isSetupOwner = setup?.exists && setup.data().createdBy === user.uid;
      if (requestId !== authRequest || window.valCareAuth.currentUser?.uid !== user.uid) return;
      const isAllowlistedAdmin = user.email?.trim().toLowerCase() === adminBootstrapEmail;
      const accountIsAdmin = token.claims.admin === true || isSetupOwner || isAllowlistedAdmin;
      setIsAdmin(accountIsAdmin);
      if (accountIsAdmin) {
        setCartItems([]);
        setCart(0);
      } else {
        try {
          const savedCart = JSON.parse(window.localStorage.getItem(`valcare-cart-${user.uid}`) || "[]");
          if (Array.isArray(savedCart)) {
            setCartItems(savedCart);
            setCart(savedCart.length);
          }
        } catch {
          setCartItems([]);
          setCart(0);
        }
      }
      cartHydrated.current = true;
      try {
        const wishlist = await window.valCareDb?.collection("wishlists").doc(user.uid).get();
        if (requestId !== authRequest || window.valCareAuth.currentUser?.uid !== user.uid) return;
        let savedItems = wishlist?.exists ? wishlist.data().items || [] : [];
        if (!savedItems.length) {
          const cachedItems = JSON.parse(window.localStorage.getItem(`valcare-wishlist-${user.uid}`) || "[]");
          if (Array.isArray(cachedItems)) savedItems = cachedItems;
        }
        setWishlistItems(savedItems);
        setFavoriteIds(savedItems.map((item) => String(item.id)));
      } catch (error) {
        try {
          const cachedItems = JSON.parse(window.localStorage.getItem(`valcare-wishlist-${user.uid}`) || "[]");
          const savedItems = Array.isArray(cachedItems) ? cachedItems : [];
          setWishlistItems(savedItems);
          setFavoriteIds(savedItems.map((item) => String(item.id)));
        } catch {
          setWishlistItems([]);
          setFavoriteIds([]);
        }
      }
      const reference = new URLSearchParams(window.location.search).get("reference");
      if (reference && window.valCarePaymentApiUrl) {
        try {
          const response = await fetch(`${window.valCarePaymentApiUrl}/verify`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference }) });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "Payment could not be confirmed.");
          window.history.replaceState({}, document.title, window.location.pathname);
          setOrderPlaced(true);
          setActivePanel("cart");
          window.trackValCareEvent?.("purchase", { transaction_id: reference });
        } catch (error) {
          setOrderMessage(error.details || "Payment could not be confirmed. Please contact us before trying again.");
          setActivePanel("cart");
        }
      }
      setIsAccountLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!cartOwnerUid.current || !cartHydrated.current) return;
    window.localStorage.setItem(`valcare-cart-${cartOwnerUid.current}`, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!window.valCareDb) return undefined;
    return window.valCareDb.collection("adminStatus").doc("config").onSnapshot((snapshot) => {
      setAdminSetupAvailable(!snapshot.exists);
    }, () => setAdminSetupAvailable(false));
  }, []);

  useEffect(() => {
    if (!window.valCareDb || !window.valCareAuth) return undefined;
    let unsubscribeBroadcastNotifications = null;
    let unsubscribePersonalNotifications = null;
    const unsubscribeAuth = window.valCareAuth.onAuthStateChanged((user) => {
      unsubscribeBroadcastNotifications?.();
      unsubscribePersonalNotifications?.();
      unsubscribeBroadcastNotifications = null;
      unsubscribePersonalNotifications = null;
      if (!user) {
        setNotifications([]);
        setReadNotificationIds([]);
        return;
      }
      try {
        const savedReadNotificationIds = JSON.parse(window.localStorage.getItem(`valcare-read-notifications-${user.uid}`) || "[]");
        setReadNotificationIds(Array.isArray(savedReadNotificationIds) ? savedReadNotificationIds : []);
      } catch {
        setReadNotificationIds([]);
      }
      let broadcastNotifications = [];
      let personalNotifications = [];
      const updateNotifications = () => {
        const merged = [...broadcastNotifications, ...personalNotifications];
        merged.sort((left, right) => (right.createdAt?.toMillis?.() || 0) - (left.createdAt?.toMillis?.() || 0));
        setNotifications(merged.slice(0, 20));
      };
      unsubscribeBroadcastNotifications = window.valCareDb.collection("notifications").where("audience", "==", "all").limit(20).onSnapshot((snapshot) => {
        broadcastNotifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        updateNotifications();
      }, () => {
        broadcastNotifications = [];
        updateNotifications();
      });
      unsubscribePersonalNotifications = window.valCareDb.collection("notifications").where("audience", "==", "user").where("recipientId", "==", user.uid).limit(20).onSnapshot((snapshot) => {
        personalNotifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        updateNotifications();
      }, () => {
        personalNotifications = [];
        updateNotifications();
      });
    });
    return () => {
      unsubscribeBroadcastNotifications?.();
      unsubscribePersonalNotifications?.();
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (!window.valCareDb) return undefined;
    return window.valCareDb.collection("products").onSnapshot((snapshot) => {
      const remoteProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const remoteById = new Map(remoteProducts.map((product) => [String(product.id), product]));
      const mergedProducts = defaultProducts.map((product) => remoteById.get(String(product.id)) || product);
      const defaultIds = new Set(defaultProducts.map((product) => String(product.id)));
      const newProducts = remoteProducts.filter((product) => !defaultIds.has(String(product.id)));
      setProducts([...mergedProducts, ...newProducts]);
    }, () => setProducts(defaultProducts));
  }, []);

  useEffect(() => {
    if (activePanel !== "reviews" || !selectedProduct || !window.valCareDb) return undefined;
    let cancelled = false;
    window.valCareDb.collection("reviews").where("productId", "==", selectedProduct.id).get().then((snapshot) => {
      if (cancelled) return;
      const nextReviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      nextReviews.sort((left, right) => (right.createdAt?.toMillis?.() || 0) - (left.createdAt?.toMillis?.() || 0));
      setReviews(nextReviews);
    }).catch(() => {
      if (!cancelled) setReviewMessage("Reviews are unavailable right now.");
    });
    return () => { cancelled = true; };
  }, [activePanel, selectedProduct]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All pieces" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const unreadNotificationCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;

  const addToBag = (product) => {
    if (isAdmin) return;
    if (!window.valCareAuth?.currentUser) {
      setAccountMessage("");
      setAuthMode("create");
      setActivePanel("create-account");
      return;
    }
    setCart((current) => current + 1);
    setCartItems((current) => [...current, product]);
    setCartMessage(`${product.name} added to cart.`);
    window.setTimeout(() => setCartMessage(""), 2200);
    window.trackValCareEvent?.("add_to_cart", { item_name: product.name, value: product.price * currencies[currency].rate, currency });
  };

  const toggleFavorite = async (product) => {
    const user = window.valCareAuth?.currentUser;
    if (!user || !window.valCareDb) {
      setAuthMode("login");
      setAccountMessage("Sign in to save favorite products.");
      setActivePanel("auth");
      return;
    }
    const previousItems = wishlistItems;
    const nextItems = favoriteIds.includes(String(product.id))
      ? previousItems.filter((item) => String(item.id) !== String(product.id))
      : [...previousItems, { id: product.id, name: product.name, category: product.category, price: Number(product.price), icon: product.icon || "✨", tone: product.tone || "tone-rose" }];
    setWishlistItems(nextItems);
    setFavoriteIds(nextItems.map((item) => String(item.id)));
    window.localStorage.setItem(`valcare-wishlist-${user.uid}`, JSON.stringify(nextItems));
    try {
      await window.valCareDb.collection("wishlists").doc(user.uid).set({ userId: user.uid, email: user.email || "", items: nextItems, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    } catch {
      setWishlistItems(previousItems);
      setFavoriteIds(previousItems.map((item) => String(item.id)));
      window.localStorage.setItem(`valcare-wishlist-${user.uid}`, JSON.stringify(previousItems));
      setAccountMessage("We could not save your favorites. Please try again.");
    }
  };

  const deleteProduct = async (product) => {
    if (!isAdmin || !window.valCareDb || !product) return;
    try {
      await window.valCareDb.collection("products").doc(String(product.id)).delete();
      setProducts((current) => current.filter((item) => String(item.id) !== String(product.id)));
      if (String(productForm.id) === String(product.id)) resetProductForm();
      setProductMessage("Product deleted.");
    } catch {
      setProductMessage("Could not delete this product. Check your admin access and try again.");
    }
  };

  const handleLoadingAction = async (key, action) => {
    if (loadingAction) return;
    setLoadingAction(key);
    try {
      await action();
    } finally {
      setLoadingAction(null);
    }
  };

  const openAdminReport = async () => {
    if (!isAdmin || !window.valCareDb || isLoadingReport) return;
    setIsLoadingReport(true);
    setLoadingAction("report");
    setActivePanel("report");
    try {
      const snapshot = await window.valCareDb.collection("orders").orderBy("createdAt", "desc").limit(200).get();
      setAdminOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      setAdminOrders([]);
      setProductMessage("Could not load the sales report.");
    } finally {
      setIsLoadingReport(false);
      setLoadingAction(null);
    }
  };

  const removeFromBag = (index) => {
    setCartItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setCart((current) => Math.max(0, current - 1));
  };

  const salesSummary = adminOrders.reduce((summary, order) => {
    (order.items || []).forEach((item) => {
      const key = String(item.id);
      const existing = summary.get(key) || { name: item.name, quantity: 0, revenue: 0 };
      existing.quantity += 1;
      existing.revenue += Number(item.price) || 0;
      summary.set(key, existing);
    });
    return summary;
  }, new Map());
  const bestSellingProducts = [...salesSummary.values()].sort((left, right) => right.quantity - left.quantity || right.revenue - left.revenue);
  const pendingOrders = adminOrders.filter((order) => String(order.status || "").toLowerCase() === "paid");
  const deliveredOrders = adminOrders.filter((order) => String(order.status || "paid").toLowerCase() === "delivered");

  const markOrderDelivered = async (orderId) => {
    if (!isAdmin || !window.valCareDb || !orderId || deliveringOrderId) return;
    setDeliveringOrderId(String(orderId));
    try {
      await window.valCareDb.collection("orders").doc(String(orderId)).update({
        status: "delivered",
        deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      const order = adminOrders.find((currentOrder) => String(currentOrder.id) === String(orderId));
      let notificationSent = true;
      if (order?.userId) {
        try {
          await window.valCareDb.collection("notifications").add({
            title: "Your ValCare delivery is complete",
            message: "Your order has been marked as delivered by the ValCare team. Thank you for trading with Val's Glam.",
            audience: "user",
            recipientId: order.userId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (notificationError) {
          console.error("Delivery notification could not be created", notificationError);
          notificationSent = false;
        }
      }
      setAdminOrders((current) => current.map((order) => String(order.id) === String(orderId)
        ? { ...order, status: "delivered" }
        : order));
      setProductMessage(notificationSent ? "Delivery recorded successfully and the customer was notified." : "Delivery recorded, but the customer notification could not be sent.");
    } catch (error) {
      console.error("Order delivery update failed", error);
      setProductMessage("Could not mark this order as delivered. Please try again.");
    } finally {
      setDeliveringOrderId(null);
    }
  };

  const placeOrder = async () => {
    if (isAdmin || !cartItems.length || isCheckingOut) return;
    const user = window.valCareAuth?.currentUser;
    if (!user || !window.valCarePaymentApiUrl) {
      setOrderMessage("Please sign in before placing an order.");
      return;
    }
    setIsCheckingOut(true);
    setOrderMessage("");
    try {
      const response = await fetch(`${window.valCarePaymentApiUrl}/initialize`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        email: user.email,
        amount: Math.round(cartTotal * currencies[currency].rate * 100),
        items: cartItems.map(({ id }) => id),
        currency,
        callbackUrl: `${window.location.origin}${window.location.pathname}`
      }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Payment could not be initialized.");
      window.trackValCareEvent?.("begin_checkout", { value: cartTotal * currencies[currency].rate, currency });
      window.location.assign(result.authorizationUrl);
    } catch (error) {
      console.error("Paystack checkout initialization failed", error);
      const code = String(error.code || "").replace("functions/", "");
      const messages = {
        "unauthenticated": "Please sign in again before checkout.",
        "not-found": "Payment service is not deployed yet. Deploy the Firebase Functions, then try again.",
        "failed-precondition": error.details || "A product in your cart is unavailable.",
        "invalid-argument": error.details || "Payment details are invalid. Refresh the page and try again.",
        "internal": "Payment service is unavailable. Confirm PAYSTACK_SECRET_KEY is configured, then try again.",
        "unavailable": "Payment service is temporarily unavailable. Please try again shortly."
      };
      setOrderMessage(messages[code] || error.details || "We could not start payment. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartTotal = cartItems.reduce((total, product) => total + product.price, 0);
  const text = translations[language];
  const categoryLabels = {
    "All pieces": language === "fr" ? "Tous les articles" : language === "tw" ? "Nneɛma nyinaa" : "All pieces",
    Beauty: text.beauty,
    Accessories: language === "fr" ? "Accessoires" : language === "tw" ? "Nneɛma a wɔde hyehyɛ" : "Accessories",
    Home: language === "fr" ? "Maison" : language === "tw" ? "Fie" : "Home",
    Lifestyle: text.lifestyle
  };
  const formatPrice = (amount) => `${currencies[currency].symbol}${(amount * currencies[currency].rate).toFixed(2)}`;

  const updatePassword = async (event) => {
    event.preventDefault();
    const user = window.valCareAuth?.currentUser;
    const hasPasswordProvider = user?.providerData?.some((provider) => provider.providerId === "password");
    if ((!hasPasswordProvider && !password.next) || (hasPasswordProvider && !password.current) || !password.next || password.next !== password.confirm) {
      setPasswordMessage(language === "fr" ? "Vérifiez vos informations." : language === "tw" ? "Yɛsrɛ sɛ hwɛ wo nsɛm no mu." : "Check your password details.");
      return;
    }
    if (!user) {
      setPasswordMessage(language === "fr" ? "Connectez-vous pour changer votre mot de passe." : language === "tw" ? "Yɛsrɛ sɛ login ansa na woasesa password." : "Sign in to change your password.");
      return;
    }
    try {
      if (hasPasswordProvider) {
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, password.current);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(password.next);
      } else {
        if (!user.email) throw { code: "auth/invalid-email" };
        const provider = new firebase.auth.GoogleAuthProvider();
        await user.reauthenticateWithPopup(provider);
        await user.linkWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, password.next));
      }
    } catch (error) {
      setPasswordMessage(error.code === "auth/popup-closed-by-user" ? "Google reauthentication was cancelled." : error.code === "auth/credential-already-in-use" || error.code === "auth/email-already-in-use" ? "This email already has another account." : error.code === "auth/wrong-password" || error.code === "auth/invalid-credential" ? "The current password is incorrect." : error.code === "auth/requires-recent-login" ? "Please sign in again with Google, then try again." : "Password update failed. Please try again.");
      return;
    }
    setPassword({ current: "", next: "", confirm: "" });
    setPasswordMessage(hasPasswordProvider
      ? language === "fr" ? "Mot de passe mis à jour." : language === "tw" ? "Wɔasesa password no." : "Password updated successfully."
      : "Email/password login is now enabled for this account.");
  };

  const updateAdminEmail = async (event) => {
    event.preventDefault();
    const user = window.valCareAuth?.currentUser;
    if (!isAdmin || !user || !newEmail.trim() || !emailPassword) {
      setEmailMessage("Enter the new email and your current password.");
      return;
    }
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, emailPassword);
      await user.reauthenticateWithCredential(credential);
      await user.updateEmail(newEmail.trim().toLowerCase());
      await user.reload();
      await user.getIdToken(true);
      setNewEmail("");
      setEmailPassword("");
      setEmailMessage("Admin email updated securely.");
    } catch (error) {
      setEmailMessage(error.code === "auth/provider-not-password" ? "This account uses Google sign-in. Change the email through Google reauthentication." : error.code === "auth/email-already-in-use" ? "That email is already in use." : error.code === "auth/invalid-email" ? "Enter a valid email address." : error.code === "auth/wrong-password" || error.code === "auth/invalid-credential" ? "The current password is incorrect." : error.code === "auth/requires-recent-login" ? "Please sign in again, then try changing the email." : "Email update failed. Please try again.");
    }
  };

  const editProduct = (product) => {
    setProductForm({ id: product.id, name: product.name, category: product.category, price: product.price, stock: product.stock ?? 0, icon: product.icon || "✨", tone: product.tone || "tone-rose", tag: product.tag || "", imageUrl: product.imageUrl || "" });
    setProductMessage("");
    window.setTimeout(() => document.querySelector(".product-admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const resetProductForm = () => {
    setProductForm({ id: null, name: "", category: "Beauty", price: "", stock: "", icon: "✨", tone: "tone-rose", tag: "", imageUrl: "" });
    setProductMessage("");
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    const price = Number(productForm.price);
    const stock = Number(productForm.stock);
    const imageUrl = productForm.imageUrl.trim();
    const validImageUrl = !imageUrl || /^https:\/\/[^\s]+$/i.test(imageUrl);
    if (!isAdmin || !window.valCareDb || !productForm.name.trim() || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0 || !validImageUrl) {
      setProductMessage("Enter valid product details and an HTTPS image URL.");
      return;
    }
    setIsSavingProduct(true);
    try {
      const productId = productForm.id || `product-${Date.now()}`;
      const previousProduct = productForm.id ? products.find((item) => String(item.id) === String(productId)) : null;
      const product = { id: String(productId), name: productForm.name.trim(), category: productForm.category, price, stock, icon: productForm.icon.trim() || "✨", tone: productForm.tone, tag: productForm.tag.trim(), imageUrl, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await window.valCareDb.collection("products").doc(String(productId)).set(product, { merge: true });
      const isRestock = previousProduct && stock > Number(previousProduct.stock || 0);
      const reachedLowStock = stock === 1 && (!previousProduct || Number(previousProduct.stock || 0) !== 1);
      if (reachedLowStock || !previousProduct || isRestock) {
        await window.valCareDb.collection("notifications").add({
          title: reachedLowStock ? "Low stock alert" : previousProduct ? "Back in stock" : "New product",
          message: reachedLowStock ? `Only 1 ${product.name} is left in stock.` : previousProduct ? `${product.name} has been restocked.` : `${product.name} is now available in the shop.`,
          audience: "all",
          recipientId: "",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      setProducts((current) => productForm.id
        ? current.map((item) => String(item.id) === String(productId) ? { ...item, ...product } : item)
        : [...current, product]);
      setProductMessage(productForm.id ? "Product updated." : "Product added to the shop.");
      resetProductForm();
    } catch (error) {
      console.error("Product save failed", error);
      const code = String(error.code || "").replace("firestore/", "");
      setProductMessage(code === "permission-denied"
        ? "You no longer have admin access. Sign out and sign in again, then try again."
        : code === "invalid-argument"
          ? "The product data is invalid. Check the category, price, stock, and image URL."
          : "Could not save this product. Please try again.");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const uploadProductImage = async (event) => {
    const file = event.target.files?.[0];
    const user = window.valCareAuth?.currentUser;
    if (!file) return;
    if (!user || !isAdmin || !window.valCareStorage) {
      setProductMessage("Image upload is unavailable. Check your admin access and try again.");
      return;
    }
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileType = file.type.toLowerCase();
    const isHeicFile = ["heic", "heif"].includes(fileExtension) || ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"].includes(fileType);
    const isImageFile = fileType.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif", "heic", "heif"].includes(fileExtension);
    if (!isImageFile || (!isHeicFile && file.size > 5 * 1024 * 1024) || (isHeicFile && file.size > 20 * 1024 * 1024)) {
      setProductMessage("Choose a JPG, PNG, WEBP, GIF, HEIC, or HEIF image. The converted image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setIsUploadingImage(true);
    setProductMessage("");
    try {
      let uploadFile = file;
      let contentType = fileType || ({ jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[fileExtension] || "");
      if (isHeicFile) {
        if (typeof window.heic2any !== "function") {
          throw new Error("HEIC conversion is unavailable.");
        }
        const converted = await window.heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
        uploadFile = Array.isArray(converted) ? converted[0] : converted;
        contentType = "image/jpeg";
      }
      if (uploadFile.size > 5 * 1024 * 1024) {
        throw new Error("The converted image is larger than 5 MB.");
      }
      const originalName = isHeicFile ? file.name.replace(/\.[^.]+$/, ".jpg") : file.name;
      const safeName = originalName.replace(/[^a-z0-9._-]/gi, "-");
      const path = `productImages/${user.uid}/${Date.now()}-${safeName}`;
      const snapshot = await window.valCareStorage.ref(path).put(uploadFile, { contentType });
      const imageUrl = await snapshot.ref.getDownloadURL();
      setProductForm((current) => ({ ...current, imageUrl }));
      setProductMessage("Image uploaded. Save the product to apply it.");
    } catch (error) {
      console.error("Product image upload failed", error);
      setProductMessage(error.message === "The converted image is larger than 5 MB."
        ? "The converted image is larger than 5 MB. Choose a smaller picture."
        : isHeicFile
          ? "This HEIC/HEIF image could not be converted. Choose a JPG or PNG picture instead."
          : "Image upload failed. Check Storage access and try again.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const createAccount = async (event) => {
    event.preventDefault();
    setIsAccountLoading(true);
    if (adminMode && account.email.trim().toLowerCase() !== adminBootstrapEmail) {
      setAccountMessage(`The one-time admin account must use ${adminBootstrapEmail}.`);
      setIsAccountLoading(false);
      return;
    }
    if (!account.name.trim() || !account.email || !account.password || account.password !== account.confirm) {
      setAccountMessage("Enter your name, a valid email, and make sure both passwords match.");
      setIsAccountLoading(false);
      return;
    }
    if (!window.valCareAuth) {
      setAccountMessage("Account creation is unavailable right now. Please try again.");
      setIsAccountLoading(false);
      return;
    }
    try {
      const credential = await window.valCareAuth.createUserWithEmailAndPassword(account.email, account.password);
      await credential.user.updateProfile({ displayName: account.name.trim() });
      if (adminMode) {
        const batch = window.valCareDb.batch();
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        batch.set(window.valCareDb.collection("adminRequests").doc(credential.user.uid), { uid: credential.user.uid, email: account.email.trim().toLowerCase(), name: account.name.trim(), status: "pending", createdAt });
        batch.set(window.valCareDb.collection("adminStatus").doc("config"), { setupComplete: true, createdBy: credential.user.uid, createdAt });
        await batch.commit();
        setAdminSetupAvailable(false);
        setAdminMode(false);
        setIsAdmin(true);
      }
      if (window.valCareDb) {
        try {
          await window.valCareDb.collection("notifications").add({
            title: "Welcome to ValCare",
            message: `Welcome, ${account.name.trim().split(/\s+/)[0] || "friend"}! We are happy to have you here.`,
            audience: "user",
            recipientId: credential.user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (notificationError) {
          console.error("Welcome notification could not be created", notificationError);
        }
      }
      setUserName(account.name.trim().split(/\s+/)[0] || "");
      setAccount({ name: "", email: "", password: "", confirm: "" });
      setAccountMessage("");
      window.setTimeout(() => setActivePanel(null), 500);
    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "An account already exists for this email.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/weak-password": "Use a stronger password with at least 6 characters.",
        "auth/operation-not-allowed": "Email account creation is disabled. Enable Email/Password in Firebase Authentication settings.",
        "auth/network-request-failed": "Could not reach Firebase. Check your internet connection and try again."
      };
      setAccountMessage(messages[error.code] || (adminMode ? "Account created, but the admin request could not be saved. Check your Firestore rules." : "Account creation failed. Check your Firebase Authentication settings and try again."));
      setIsAccountLoading(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setIsAccountLoading(true);
    if (!window.valCareAuth) {
      setAccountMessage("Sign in is unavailable right now. Please try again.");
      setIsAccountLoading(false);
      return;
    }
    try {
      await window.valCareAuth.signInWithEmailAndPassword(account.email, account.password);
      setAccount({ name: "", email: "", password: "", confirm: "" });
      setAccountMessage("");
      window.setTimeout(() => setActivePanel(null), 500);
    } catch (error) {
      setAccountMessage("Email or password is incorrect. Please try again.");
      setIsAccountLoading(false);
    }
  };

  const signInWithProvider = async (providerName) => {
    setIsAccountLoading(true);
    if (window.location.protocol === "file:") {
      setAccountMessage("Social sign-in requires a web address. Open http://localhost:5500/ instead of opening index.html directly.");
      setIsAccountLoading(false);
      return;
    }
    if (!window.valCareAuth) {
      setAccountMessage(`${providerName} sign-in is unavailable right now. Please try again.`);
      setIsAccountLoading(false);
      return;
    }
    try {
      const providers = {
        Google: () => new firebase.auth.GoogleAuthProvider()
      };
      const provider = providers[providerName]();
      await window.valCareAuth.signInWithPopup(provider);
      setAccountMessage("");
      window.setTimeout(() => setActivePanel(null), 500);
    } catch (error) {
      const messages = {
        "auth/popup-closed-by-user": `${providerName} sign-in was cancelled.`,
        "auth/unauthorized-domain": `Google sign-in is not enabled for ${window.location.hostname || "this domain"}. Add this domain in Firebase Authentication settings, or use the email form below.`,
        "auth/operation-not-allowed": `${providerName} sign-in is not enabled in Firebase Authentication settings.`,
        "auth/invalid-app-id": "Facebook sign-in has an invalid App ID. Update the Facebook App ID and secret in Firebase Authentication settings.",
        "auth/invalid-credential": `${providerName} sign-in is not configured correctly. Check its provider settings in Firebase Authentication.`,
        "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
        "auth/invalid-provider-id": "Instagram requires a configured Firebase OIDC provider before it can be used."
      };
      setAccountMessage(messages[error.code] || `${providerName} sign-in failed. Check that the provider is enabled in Firebase and try again.`);
      setIsAccountLoading(false);
    }
  };

  const closePanel = () => setActivePanel(null);

  const openReviews = (product) => {
    setSelectedProduct(product);
    setReviews([]);
    setReviewMessage("");
    setActivePanel("reviews");
  };

  const submitReview = async (event) => {
    event.preventDefault();
    const user = window.valCareAuth?.currentUser;
    if (!user) {
      setAuthMode("login");
      setAccountMessage("Sign in to leave a review.");
      setActivePanel("auth");
      return;
    }
    if (!reviewText.trim() || !window.valCareDb || isSubmittingReview) return;
    setIsSubmittingReview(true);
    setReviewMessage("");
    try {
      await window.valCareDb.collection("reviews").add({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Customer",
        rating: Number(reviewRating),
        comment: reviewText.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setReviewText("");
      setReviewRating(5);
      setReviewMessage("Review added. Thank you!");
      const snapshot = await window.valCareDb.collection("reviews").where("productId", "==", selectedProduct.id).get();
      const nextReviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      nextReviews.sort((left, right) => (right.createdAt?.toMillis?.() || 0) - (left.createdAt?.toMillis?.() || 0));
      setReviews(nextReviews);
    } catch (error) {
      setReviewMessage(error.code === "permission-denied" ? "Reviews are not enabled yet. Publish the updated firestore.rules file." : "We could not save your review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const logOut = async () => {
    setCart(0);
    setCartItems([]);
    setWishlistItems([]);
    setFavoriteIds([]);
    await window.valCareAuth?.signOut();
    setActivePanel(null);
  };

  const openNotifications = () => {
    const nextReadNotificationIds = notifications.map((notification) => notification.id);
    const user = window.valCareAuth?.currentUser;
    setReadNotificationIds(nextReadNotificationIds);
    if (user) window.localStorage.setItem(`valcare-read-notifications-${user.uid}`, JSON.stringify(nextReadNotificationIds));
    setActivePanel("notifications");
  };

  const openPanelWithLoading = (panelName) => {
    if (loadingAction) return;
    setLoadingAction(panelName);
    window.setTimeout(() => {
      setActivePanel(panelName);
      setLoadingAction(null);
    }, 240);
  };

  const changeLanguage = (nextLanguage) => {
    if (nextLanguage === language || isLanguageLoading) return;
    setIsLanguageLoading(true);
    window.setTimeout(() => {
      setLanguage(nextLanguage);
      setIsLanguageLoading(false);
    }, 420);
  };

  const playNotificationSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContextRef.current ||= new AudioContext();
    const context = audioContextRef.current;
    if (context.state === "suspended") context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 740;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.28);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  };

  const enablePushNotifications = async () => {
    const user = window.valCareAuth?.currentUser;
    if (!user) {
      setAuthMode("login");
      setAccountMessage("Sign in to enable ValCare alerts.");
      setActivePanel("auth");
      return;
    }
    if (!window.valCareMessaging || !("Notification" in window) || !("serviceWorker" in navigator)) {
      setPushStatus("unsupported");
      return;
    }
    setPushStatus("loading");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setPushStatus(permission === "denied" ? "denied" : "idle");
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      const token = await window.valCareMessaging.getToken({ serviceWorkerRegistration: registration });
      if (!token || !window.valCareDb) throw new Error("Push registration unavailable.");
      await window.valCareDb.collection("pushTokens").doc(token).set({
        token,
        userId: user.uid,
        email: user.email || "",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setPushStatus("enabled");
      playNotificationSound();
    } catch (error) {
      console.warn("Push notifications are unavailable.", error);
      setPushStatus("idle");
    }
  };

  const installApp = async () => {
    if (isIos || !installPromptEvent) {
      setInstallHelpOpen(true);
      return;
    }
    installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
  };

  const confirmLogout = () => {
    setConfirmDialog({
      title: "Log out?",
      message: "Your current session will be ended on this device.",
      confirmLabel: "Log out",
      onConfirm: logOut
    });
  };

  const confirmDeleteProduct = (product) => {
    if (!isAdmin || !product) return;
    setConfirmDialog({
      title: "Delete product?",
      message: `Are you sure you want to permanently delete "${product.name}"?`,
      confirmLabel: "Delete product",
      onConfirm: () => deleteProduct(product)
    });
  };

  const subscribe = async (event) => {
    event.preventDefault();
    if (!email.trim() || isSubscribing) return;
    if (!window.valCareDb) {
      setSubscribeMessage("Subscriptions are unavailable right now. Please try again.");
      return;
    }
    setIsSubscribing(true);
    setSubscribeMessage("");
    try {
      await window.valCareDb.collection("subscribers").doc(email.trim().toLowerCase()).set({
        email: email.trim().toLowerCase(),
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
        source: "website"
      }, { merge: true });
      setSubscribed(true);
      setEmail("");
      window.trackValCareEvent?.("newsletter_signup");
    } catch (error) {
      setSubscribeMessage("We could not save your email. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className={`site-shell theme-${theme} ${siteReady ? "is-visible" : ""}`}>
      {isLanguageLoading && <div className="language-loading" role="status" aria-live="polite"><LoadingSpinner label="Loading language" /></div>}
      <div className="announcement">{text.announcement}</div>
      {cartMessage && <div className="cart-toast" role="status" aria-live="polite">{cartMessage}</div>}
      {userName && pushStatus !== "enabled" && <button className="push-enable-button" type="button" onClick={enablePushNotifications} disabled={pushStatus === "loading"}>{pushStatus === "loading" ? "Enabling alerts..." : pushStatus === "denied" ? "Allow alerts in browser settings" : "Enable alerts"}</button>}
      <header className="navbar">
        <a className="logo" href="#top" aria-label="Val's Glam Accessories home"><img className="brand-logo" src="vals.jpg" alt="Val's Glam Accessories" /><span className="logo-name">Val's Glam Accessories</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#shop">{text.shop}</a><a href="#shop">{text.beauty}</a><a href="#shop">{text.lifestyle}</a><a href="#about">{text.story}</a><a href="#locations">{text.locate}</a>
        </nav>
        <div className={`nav-actions ${isAdmin ? "admin-nav-actions" : "client-nav-actions"}`}>
          {userName ? <button className={`user-name ${isAdmin ? "admin-user-name" : ""}`} onClick={() => openPanelWithLoading(isAdmin ? "inventory" : "settings")} aria-label={isAdmin ? "Open admin dashboard" : "Open account settings"} title={userName}>{loadingAction === (isAdmin ? "inventory" : "settings") ? <LoadingSpinner label="Opening" /> : <><span className="user-avatar">{userName.charAt(0).toUpperCase()}</span><span className="user-display-name">{userName}</span></>}</button> : <button className="login-link" onClick={() => { setAuthMode("login"); setAccountMessage(""); openPanelWithLoading("auth"); }}>{loadingAction === "auth" ? <LoadingSpinner label="Opening" /> : "Log in"}</button>}
          {!isAdmin && <button className="icon-button panel-trigger" aria-label={`View notifications${unreadNotificationCount ? `, ${unreadNotificationCount} unread` : ""}`} title="Notifications" onClick={() => { openNotifications(); setLoadingAction("notifications"); window.setTimeout(() => setLoadingAction(null), 260); }}>{loadingAction === "notifications" ? <LoadingSpinner label="" /> : <><BellIcon />{unreadNotificationCount > 0 && <span className="cart-count notification-count">{unreadNotificationCount > 99 ? "99+" : unreadNotificationCount}</span>}</>}</button>}
          {!isAdmin && userName && <button className="icon-button" aria-label="Open favorite products" title="Wishlist" onClick={() => openPanelWithLoading("wishlist")}>{loadingAction === "wishlist" ? <LoadingSpinner label="" /> : <>♡<span className="cart-count">{wishlistItems.length}</span></>}</button>}
          {!isStandalone && <button className="install-app-button" type="button" onClick={installApp}>Install App</button>}
          <button className="icon-button settings-button" aria-label="Open settings" title="Settings" onClick={() => openPanelWithLoading("settings")}>{loadingAction === "settings" ? <LoadingSpinner label="" /> : <SettingsIcon />}</button>
          <div className="secondary-nav-actions">
            {isAdmin && <button className="icon-button admin-inventory-icon" aria-label="Manage products and stock" title="Manage products" onClick={() => { resetProductForm(); openPanelWithLoading("inventory"); }}>{loadingAction === "inventory" ? <LoadingSpinner label="" /> : "✦"}</button>}
            {isAdmin && <button className="icon-button" aria-label="Open sales report" title="Sales report" onClick={() => handleLoadingAction("report", openAdminReport)}>{loadingAction === "report" ? <LoadingSpinner label="" /> : "▥"}</button>}
          </div>
          {!isAdmin && <button className="icon-button" aria-label={`${cart} items in bag`} title="Shopping bag" onClick={() => openPanelWithLoading("cart")}>{loadingAction === "cart" ? <LoadingSpinner label="" /> : <><BagIcon /><span className="cart-count">{cart}</span></>}</button>}
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{text.heroEyebrow}</p>
            <h1>{text.heroTitle} <em>{text.heroTitleEm}</em></h1>
            <p className="hero-text">{text.heroText}</p>
            <a className="primary-button" href="#shop">{text.explore}</a>
          </div>
          <div className="hero-art"><span className="hero-bubble bubble-one" aria-hidden="true" /><span className="hero-bubble bubble-two" aria-hidden="true" /><span className="hero-bubble bubble-three" aria-hidden="true" /><span className="hero-shape shape-ring" aria-hidden="true" /><span className="hero-shape shape-spark" aria-hidden="true" /><img className="hero-photo" src="image.png" alt="Woman applying skincare" /></div>
        </section>

        <section className="section" id="shop">
          <div className="section-heading"><h2>{text.shopEdit} <em>{text.edit}</em></h2><a className="view-all" href="#shop">{text.viewAll} ↗</a></div>
          <input id="product-search" className="product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} aria-label={text.search} />
          <div className="category-row" role="tablist" aria-label="Product categories">
            {categories.map((category) => <button key={category} className={`category ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{categoryLabels[category]}</button>)}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image ${product.tone}`}>{product.imageUrl ? <img src={product.imageUrl} alt="" /> : <span>{product.icon}</span>}{product.tag && <span className="badge">{product.tag}</span>}{userName && !isAdmin && <button className={`favorite-button ${favoriteIds.includes(String(product.id)) ? "active" : ""}`} type="button" onClick={() => toggleFavorite(product)} aria-label={favoriteIds.includes(String(product.id)) ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}>{favoriteIds.includes(String(product.id)) ? "♥" : "♡"}</button>}</div>
                <div className="product-info"><h3>{product.name}</h3><div className="product-bottom"><span className="price">{formatPrice(product.price)}</span><span className={`stock-label ${product.stock === 0 ? "out-of-stock" : ""}`}>{product.stock === 0 ? "Sold out" : `${product.stock} left`}</span><button className="review-button" onClick={() => openReviews(product)}>{text.reviews}</button>{isAdmin ? <span className="admin-product-actions"><button className="admin-edit-button" type="button" onClick={() => { editProduct(product); setActivePanel("inventory"); }}>Edit</button><button className="admin-delete-button" type="button" onClick={() => confirmDeleteProduct(product)}>Delete</button></span> : <button className="add-button" onClick={() => addToBag(product)} disabled={product.stock === 0}>+ {text.add}</button>}</div></div>
              </article>
            ))}
            {!filteredProducts.length && <p className="empty">Nothing found just yet. Try another little search.</p>}
          </div>
          {isAdmin && <div className="admin-add-product-row"><button className="primary-button admin-add-product-button" type="button" onClick={() => { resetProductForm(); setActivePanel("inventory"); }}>+ Add new product</button></div>}
        </section>

        <section className="value-strip" id="about">
          <div className="value-item"><strong>Curated with care</strong><span>Pieces chosen to brighten your routine</span></div>
          <div className="value-item"><strong>Kind to your pocket</strong><span>Lovely little luxuries from GH₵12</span></div>
          <div className="value-item"><strong>Packaged with love</strong><span>Ready to gift, even when it’s for you</span></div>
        </section>
        <section className="locations-section" id="locations">
          <div className="section-heading"><div><p className="eyebrow">Come say hello</p><h2>Find us <em>near you</em></h2></div></div>
          <div className="location-grid">
            <article className="location-card"><span className="location-pin">K</span><div><h3>Koforidua</h3><p>Visit ValCare in Koforidua and discover our latest little luxuries.</p><a className="location-link" href="https://maps.app.goo.gl/Abix2Rjb7RjhiGta6?g_st=ic" target="_blank" rel="noreferrer">Open in Google Maps ↗</a><iframe className="location-map" title="Koforidua map" src="https://www.google.com/maps?q=Koforidua%2C%20Ghana&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></article>
            <article className="location-card"><span className="location-pin">U</span><div><h3>UCC campus</h3><p>Find us on the University of Cape Coast campus for convenient pickup and delivery.</p><a className="location-link" href="https://maps.app.goo.gl/cce8XwQFTZmLU2ny9" target="_blank" rel="noreferrer">Open UCC map ↗</a><span className="location-note">Free delivery on UCC campus</span><iframe className="location-map" title="UCC campus map" src="https://www.google.com/maps?q=University%20of%20Cape%20Coast%2C%20Ghana&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></article>
          </div>
        </section>
        <section className="newsletter">
          <h2>{text.newsletterTitle}</h2>
          <p>{text.newsletterText}</p>
          {subscribed ? <p>You're on the list. Welcome to ValCare.</p> : <><form className="subscribe" onSubmit={subscribe}><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" aria-label="Your email address" required /><button type="submit" disabled={isSubscribing}>{isSubscribing ? "Saving..." : "Join us"}</button></form>{subscribeMessage && <small className="subscribe-message">{subscribeMessage}</small>}</>}
        </section>
      </main>
      <footer>
        <div className="footer-contact">
          <strong>Contact ValCare</strong>
          <a className="footer-phone" href="tel:+233594972748">Call us on +233 59 497 2748</a>
          <a href="https://t.me/MsVallerie_2" target="_blank" rel="noreferrer" aria-label="Contact ValCare on Telegram"><SocialIcon name="telegram" /></a>
          <a href="https://wa.me/233594972748" target="_blank" rel="noreferrer" aria-label="Contact ValCare on WhatsApp"><SocialIcon name="whatsapp" /></a>
          <a href="https://www.snapchat.com/add/nharnaakuah_2" target="_blank" rel="noreferrer" aria-label="Contact ValCare on Snapchat"><SocialIcon name="snapchat" /></a>
          <a href="https://www.tiktok.com/@ms_valcaresil" target="_blank" rel="noreferrer" aria-label="Contact ValCare on TikTok"><SocialIcon name="tiktok" /></a>
        </div>
        <div>© 2026 ValCare · Made for your everyday.</div>
      </footer>
      {installHelpOpen && ReactDOM.createPortal(<div className="install-help-backdrop" role="presentation" onClick={() => setInstallHelpOpen(false)}>
        <section className="install-help" role="dialog" aria-modal="true" aria-labelledby="install-help-title" onClick={(event) => event.stopPropagation()}>
          <button className="close-button" type="button" onClick={() => setInstallHelpOpen(false)} aria-label="Close install instructions">×</button>
          <p className="eyebrow">ValCare app</p>
          <h2 id="install-help-title">Install ValCare</h2>
          {isIos ? <ol><li>Tap the <strong>Share</strong> button in Safari.</li><li>Choose <strong>Add to Home Screen</strong>.</li><li>Tap <strong>Add</strong> to finish.</li></ol> : <p>Open your browser menu and choose <strong>Install ValCare</strong> or <strong>Add to Home screen</strong>. The exact wording depends on your browser.</p>}
          <button className="settings-save" type="button" onClick={() => setInstallHelpOpen(false)}>Got it</button>
        </section>
      </div>, document.body)}
      {activePanel && <div className="panel-backdrop" onClick={closePanel}>
        <aside className={`account-panel theme-${theme}`} onClick={(event) => event.stopPropagation()}>
          <div className="panel-header"><div><p className="eyebrow">ValCare account</p><h2>{activePanel === "cart" ? text.cart : activePanel === "notifications" ? text.notifications : activePanel === "transactions" ? text.transactions : activePanel === "report" ? "Sales report" : activePanel === "reviews" ? "Product reviews" : activePanel === "inventory" ? "Manage products" : activePanel === "create-account" || (activePanel === "auth" && authMode === "create") ? "Create your account" : activePanel === "auth" ? "Log in" : text.settings}</h2></div><button className="close-button" onClick={closePanel} aria-label="Close panel">×</button></div>
          {(activePanel === "create-account" || activePanel === "auth") && <div className="panel-content account-form">{isAccountLoading && <div className="account-loading-state"><LoadingSpinner label="Preparing your account" /><span>Finishing your ValCare experience...</span></div>}<p className="account-intro">{authMode === "create" ? "Create your account to collect your ValCare finds." : "Log in to continue shopping and manage your account."}</p><div className="social-auth-grid"><button className="social-auth-button google-auth-button" type="button" onClick={() => signInWithProvider("Google")} disabled={isAccountLoading}><ProviderLogo name="Google" />Continue with Google</button></div><div className="form-divider"><span>or use email</span></div><form onSubmit={authMode === "create" ? createAccount : login}>{authMode === "create" && <input type="text" placeholder="Your name" value={account.name} onChange={(event) => setAccount({ ...account, name: event.target.value })} required />}<input type="email" placeholder="Email address" value={account.email} onChange={(event) => setAccount({ ...account, email: event.target.value })} required /><PasswordInput placeholder="Password" value={account.password} onChange={(event) => setAccount({ ...account, password: event.target.value })} minLength="6" required />{authMode === "create" && <PasswordInput placeholder="Confirm password" value={account.confirm} onChange={(event) => setAccount({ ...account, confirm: event.target.value })} minLength="6" required />}<button className="settings-save" type="submit" disabled={isAccountLoading}>{isAccountLoading ? <LoadingSpinner label="Loading" /> : authMode === "create" ? "Create account" : "Log in"}</button>{accountMessage && <small className="password-message">{accountMessage}</small>}</form><button className="auth-switch" type="button" disabled={isAccountLoading} onClick={() => { setAuthMode(authMode === "create" ? "login" : "create"); setAdminMode(false); setAccountMessage(""); }}>{authMode === "create" ? "Already have an account? Log in" : "New to ValCare? Create an account"}</button></div>}
          {activePanel === "wishlist" && !isAdmin && <div className="panel-content"><div className="wishlist-list">{wishlistItems.length ? wishlistItems.map((product) => <article className="wishlist-item" key={product.id}><span className={`cart-thumb ${product.tone}`}>{product.icon}</span><div><strong>{product.name}</strong><span>{formatPrice(product.price)}</span></div><button className="add-button" type="button" onClick={() => addToBag(product)}>Add to bag</button><button className="remove-item" type="button" onClick={() => toggleFavorite(product)} aria-label={`Remove ${product.name} from favorites`}>×</button></article>) : <div className="panel-empty"><p>Your favorite products will appear here.</p></div>}</div></div>}
          {activePanel === "cart" && !isAdmin && <div className="panel-content">
            {orderPlaced && <div className="success-message">Order received. We’ll be in touch shortly.</div>}
            {!cartItems.length && !orderPlaced && <div className="panel-empty"><BagIcon /><p>Your cart is waiting for something lovely.</p><a href="#shop" onClick={closePanel}>Continue shopping</a></div>}
            {cartItems.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><div className={`cart-thumb ${product.tone}`}>{product.icon}</div><div><strong>{product.name}</strong><span>{formatPrice(product.price)}</span></div><button className="remove-item" onClick={() => removeFromBag(index)} aria-label={`Remove ${product.name}`} title={`Remove ${product.name}`}>×</button></div>)}
            {!!cartItems.length && <><div className="cart-total"><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><button className="primary-button checkout-button" onClick={placeOrder} disabled={isCheckingOut}>{isCheckingOut ? "Opening secure payment..." : "Pay securely with Paystack"}</button></>}
            {orderMessage && <small className="password-message order-message">{orderMessage}</small>}
          </div>}
          {activePanel === "notifications" && <div className="panel-content notification-list">{notifications.length ? notifications.map((notification) => <div className="notice-item" key={notification.id}><span className="notice-mark">✦</span><div><strong>{notification.title}</strong><p>{notification.message}</p><small>{notification.createdAt?.toDate?.().toLocaleDateString?.() || "Just now"}</small></div></div>) : <div className="panel-empty"><p>No new shop updates yet.</p></div>}</div>}
          {activePanel === "transactions" && <div className="panel-content"><div className="transaction-card"><div><strong>VC-1042</strong><span>Aug 28, 2026 · 2 items</span></div><strong>{formatPrice(34)}</strong><em>Delivered</em></div><div className="transaction-card"><div><strong>VC-0987</strong><span>Jul 14, 2026 · 1 item</span></div><strong>{formatPrice(18)}</strong><em>Delivered</em></div><div className="panel-empty"><p>Your purchases will appear here after checkout.</p></div></div>}
          {activePanel === "report" && isAdmin && <div className="panel-content report-panel">{isLoadingReport ? <p className="panel-empty">Loading sales report...</p> : <><div className="report-toggle"><button className={`report-tab pending ${reportView === "pending" ? "active" : ""}`} type="button" onClick={() => setReportView("pending")}>Pending delivery</button><button className={`report-tab delivered ${reportView === "delivered" ? "active" : ""}`} type="button" onClick={() => setReportView("delivered")}>Delivered</button></div>{productMessage && <small className="password-message">{productMessage}</small>}<section className="report-section"><h3>{reportView === "pending" ? "Awaiting delivery" : "Delivered orders"}</h3>{(reportView === "pending" ? pendingOrders : deliveredOrders).length ? (reportView === "pending" ? pendingOrders : deliveredOrders).map((order) => <div className="report-order" key={order.id}><div className="report-buyer-details"><button className="report-buyer" type="button" onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}><strong>{order.customerName || order.customerEmail || "Customer"}</strong><small>{order.customerEmail || ""}</small><small>{order.items?.length || 0} item(s) · {order.status || "paid"}</small></button>{selectedOrderId === order.id && <div className="report-item-list">{order.items?.length ? order.items.map((item, itemIndex) => <div className="report-item" key={`${order.id}-${item.id || item.name}-${itemIndex}`}><span>{item.name || "Item"} × {item.quantity || 1}</span><strong>{formatPrice((Number(item.price) || 0) * (item.quantity || 1))}</strong></div>) : <small>No item details recorded.</small>}</div>}</div><div className="report-order-actions"><strong>{formatPrice(order.total || 0)}</strong>{reportView === "pending" ? <button className="report-delivered-button" type="button" onClick={() => markOrderDelivered(order.id)}>Mark delivered</button> : <span className="report-status-tag">Delivered</span>}</div></div>) : <p className="panel-empty">{reportView === "pending" ? "No successful payments are waiting for delivery." : "No delivered orders yet."}</p>}</section><section className="report-section"><h3>Best-selling products</h3>{bestSellingProducts.length ? bestSellingProducts.slice(0, 10).map((product) => <div className="report-row" key={product.name}><span><strong>{product.name}</strong><small>{product.quantity} sold</small></span><strong>{formatPrice(product.revenue)}</strong></div>) : <p className="panel-empty">No completed transactions yet.</p>}</section></>}</div>}
          {activePanel === "reviews" && selectedProduct && <div className="panel-content reviews-panel"><div className="reviews-product"><span className={`cart-thumb ${selectedProduct.tone}`}>{selectedProduct.icon}</span><div><strong>{selectedProduct.name}</strong><span>{formatPrice(selectedProduct.price)}</span></div></div><div className="review-list">{reviews.length ? reviews.map((review) => <article className="review-item" key={review.id}><div className="review-meta"><strong>{review.userName}</strong><span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span></div><p>{review.comment}</p></article>) : <p className="review-empty">No reviews yet. Be the first to share your thoughts.</p>}</div><form className="review-form" onSubmit={submitReview}><label htmlFor="review-rating">Your rating</label><select id="review-rating" value={reviewRating} onChange={(event) => setReviewRating(event.target.value)}><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select><textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Share your thoughts" maxLength="500" required /><button className="settings-save" type="submit" disabled={isSubmittingReview}>{isSubmittingReview ? "Saving review..." : "Add review"}</button>{reviewMessage && <small className="password-message">{reviewMessage}</small>}</form></div>}
          {activePanel === "settings" && <div className="panel-content settings-list">
            <div className="setting-control"><label htmlFor="currency">{text.currency}</label><select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>{Object.keys(currencies).map((code) => <option key={code} value={code}>{code} ({currencies[code].symbol})</option>)}</select></div>
            <div className="setting-control"><label htmlFor="language">{text.language}</label><select id="language" value={language} onChange={(event) => changeLanguage(event.target.value)} disabled={isLanguageLoading}><option value="en">English</option><option value="tw">Twi</option><option value="fr">Français</option></select></div>
            <div className="setting-control"><label htmlFor="theme">{text.theme}</label><select id="theme" value={theme} onChange={(event) => setTheme(event.target.value)}><option value="light">{text.light}</option><option value="dark">{text.dark}</option><option value="system">{text.system}</option></select></div>
            <div className="motion-control"><label htmlFor="cosmetic-motion">Cosmetic animations</label><input id="cosmetic-motion" type="range" min="0" max="100" step="5" value={cosmeticMotion} onChange={(event) => setCosmeticMotion(Number(event.target.value))} /><small>{cosmeticMotion === 0 ? "Off" : `${cosmeticMotion}% intensity`}</small></div>
            <label><span><strong>{text.orderUpdates}</strong><small>Get delivery and order notifications</small></span><input type="checkbox" checked={preferences.updates} onChange={() => setPreferences((current) => ({ ...current, updates: !current.updates }))} /></label><label><span><strong>{text.offers}</strong><small>Hear about fresh ValCare finds</small></span><input type="checkbox" checked={preferences.offers} onChange={() => setPreferences((current) => ({ ...current, offers: !current.offers }))} /></label>
            <form className="password-form" onSubmit={updatePassword}><h3>{text.password}</h3>{window.valCareAuth?.currentUser?.providerData?.some((provider) => provider.providerId === "password") && <PasswordInput placeholder="Current password" value={password.current} onChange={(event) => setPassword({ ...password, current: event.target.value })} required />}<PasswordInput placeholder="New password" value={password.next} onChange={(event) => setPassword({ ...password, next: event.target.value })} minLength="6" required /><PasswordInput placeholder="Confirm new password" value={password.confirm} onChange={(event) => setPassword({ ...password, confirm: event.target.value })} minLength="6" required /><button className="settings-save" type="submit">{window.valCareAuth?.currentUser?.providerData?.some((provider) => provider.providerId === "password") ? text.save : "Enable email/password login"}</button>{passwordMessage && <small className="password-message">{passwordMessage}</small>}</form>
            {isAdmin && <form className="password-form admin-security-form" onSubmit={updateAdminEmail}><h3>Admin email</h3><p className="account-intro">Changing the admin email requires your current password.</p><input type="email" placeholder="New admin email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} required /><PasswordInput placeholder="Current password" value={emailPassword} onChange={(event) => setEmailPassword(event.target.value)} required /><button className="settings-save" type="submit">Update admin email</button>{emailMessage && <small className="password-message">{emailMessage}</small>}</form>}
            <button className="settings-link" onClick={() => setActivePanel("transactions")}>{text.viewTransactions} <span>↗</span></button><button className="settings-logout" onClick={confirmLogout}>Log out</button>
          </div>}
          {activePanel === "inventory" && isAdmin && <div className="panel-content inventory-panel"><p className="account-intro">Update prices, add new items, and keep stock levels current.</p><form className="product-admin-form" onSubmit={saveProduct}><input placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} required /><div className="admin-form-row"><select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}><option>Beauty</option><option>Accessories</option><option>Home</option><option>Lifestyle</option></select><input type="number" min="0" step="0.01" placeholder="Price" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} required /><input type="number" min="0" step="1" placeholder="Stock" value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} required /></div><div className="admin-form-row"><input placeholder="Icon emoji" value={productForm.icon} onChange={(event) => setProductForm({ ...productForm, icon: event.target.value })} /><select value={productForm.tone} onChange={(event) => setProductForm({ ...productForm, tone: event.target.value })}><option value="tone-rose">Rose</option><option value="tone-sage">Sage</option><option value="tone-yellow">Yellow</option><option value="tone-lilac">Lilac</option><option value="tone-blue">Blue</option><option value="tone-peach">Peach</option><option value="tone-pink">Pink</option><option value="tone-green">Green</option></select><input placeholder="Tag (optional)" value={productForm.tag} onChange={(event) => setProductForm({ ...productForm, tag: event.target.value })} /></div><div className="admin-form-actions"><button className="settings-save" type="submit" disabled={isSavingProduct}>{isSavingProduct ? "Saving..." : productForm.id ? "Update product" : "Add product"}</button>{productForm.id && <button className="settings-link" type="button" onClick={resetProductForm}>Cancel edit</button>}</div>{productMessage && <small className="password-message">{productMessage}</small>}</form><div className="inventory-list">{products.map((product) => <button className="inventory-item" key={product.id} type="button" onClick={() => editProduct(product)}><span className={`cart-thumb ${product.tone}`}>{product.icon}</span><span><strong>{product.name}</strong><small>{formatPrice(product.price)} · {product.stock} in stock</small></span><em>Edit</em></button>)}</div></div>}
          {activePanel === "inventory" && isAdmin && <div className="product-image-url-field"><label htmlFor="product-image-file">Choose product picture</label><input id="product-image-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif" onChange={uploadProductImage} disabled={isUploadingImage} /><small>{isUploadingImage ? "Uploading image..." : productForm.id ? "Choose a picture replacement from your phone gallery or camera." : "Choose a picture from your phone gallery or camera."}</small><label htmlFor="product-image-url">Image URL</label><input id="product-image-url" type="url" placeholder="https://..." value={productForm.imageUrl} onChange={(event) => setProductForm({ ...productForm, imageUrl: event.target.value })} /></div>}
        {activePanel === "inventory" && isAdmin && productForm.id && <button className="settings-link" type="button" onClick={() => confirmDeleteProduct(products.find((product) => String(product.id) === String(productForm.id)))}>Delete selected product</button>}
        </aside>
      </div>}
      {confirmDialog && ReactDOM.createPortal(<div className="confirm-backdrop" role="presentation" onClick={() => setConfirmDialog(null)}>
        <div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message" onClick={(event) => event.stopPropagation()}>
          <p className="eyebrow">Please confirm</p>
          <h2 id="confirm-dialog-title">{confirmDialog.title}</h2>
          <p id="confirm-dialog-message">{confirmDialog.message}</p>
          <div className="confirm-actions"><button className="confirm-cancel" type="button" onClick={() => setConfirmDialog(null)}>Cancel</button><button className="confirm-submit" type="button" onClick={() => { const action = confirmDialog.onConfirm; setConfirmDialog(null); action(); }}>{confirmDialog.confirmLabel}</button></div>
        </div>
      </div>, document.body)}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
