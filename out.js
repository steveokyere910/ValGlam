(() => {
  // app.jsx
  var { useEffect, useRef, useState } = React;
  var defaultProducts = [
    { id: 1, name: "Bloom perfume oil", category: "Beauty", price: 18, stock: 12, icon: "\u{1F9F4}", tone: "tone-rose", tag: "Bestseller" },
    { id: 2, name: "Wall stickers", category: "Home", price: 12, stock: 18, icon: "\u{1F338}", tone: "tone-sage" },
    { id: 3, name: "Wall hook", category: "Home", price: 9, stock: 15, icon: "\u2601\uFE0F", tone: "tone-yellow" },
    { id: 4, name: "Mini fan", category: "Lifestyle", price: 22, stock: 8, icon: "\u{1FAAD}", tone: "tone-lilac", tag: "New" },
    { id: 5, name: "Scrunchie set", category: "Accessories", price: 8, stock: 20, icon: "\u{1F380}", tone: "tone-blue" },
    { id: 6, name: "Mini purse", category: "Accessories", price: 25, stock: 6, icon: "\u{1F45B}", tone: "tone-peach" },
    { id: 7, name: "Lip gloss ", category: "Beauty", price: 14, stock: 14, icon: "\u{1F484}", tone: "tone-pink" },
    { id: 8, name: "Shower gel", category: "Beauty", price: 16, stock: 10, icon: "\u{1FAE7}", tone: "tone-green" }
  ];
  var categories = ["All pieces", "Beauty", "Accessories", "Home", "Lifestyle"];
  var adminBootstrapEmail = "steveokyere910@gmail.com";
  var currencies = { GHS: { symbol: "GH\u20B5", rate: 1 }, USD: { symbol: "$", rate: 0.078 }, GBP: { symbol: "\xA3", rate: 0.061 } };
  var translations = {
    en: { settings: "Settings", cart: "Your cart", notifications: "Notifications", transactions: "Transactions", language: "Language", currency: "Currency", theme: "Theme", password: "Change password", save: "Save password", light: "Light", dark: "Dark", system: "System", orderUpdates: "Order updates", offers: "Offers and new drops", viewTransactions: "View transactions", shop: "Shop all", beauty: "Beauty", lifestyle: "Lifestyle", story: "Our story", locate: "Locate us", announcement: "Free delivery on UCC campus.", heroEyebrow: "Small things, soft moments", heroTitle: "Little luxuries for", heroTitleEm: "lovely days.", heroText: "Thoughtful accessories and feel-good finds to make your everyday a little more beautiful.", explore: "Explore the collection", shopEdit: "Shop the", edit: "edit", viewAll: "View all pieces", search: "Search pieces", add: "Add to bag", reviews: "Reviews", newsletterTitle: "A little note from us", newsletterText: "New drops, sweet offers, and good things in your inbox.", join: "Join us", email: "Your email address", cartEmpty: "Your cart is waiting for something lovely.", continueShopping: "Continue shopping", pay: "Pay securely with Paystack" },
    tw: { settings: "Nhyehy\u025Be", cart: "Wo cart", notifications: "Amanne\u025Bb\u0254", transactions: "Nkitahodi", language: "Kasa", currency: "Sika", theme: "\u0190kwan", password: "Sesa password", save: "Sie password", light: "Kanea", dark: "Sum", system: "System", orderUpdates: "Order ns\u025Bm foforo", offers: "Nne\u025Bma foforo ne offers", viewTransactions: "Hw\u025B nkitahodi", shop: "T\u0254 nne\u025Bma nyinaa", beauty: "Beauty", lifestyle: "Asetra", story: "Y\u025Bn ho as\u025Bm", locate: "Hwehw\u025B y\u025Bn", announcement: "Y\u025Bde ma kwa w\u0254 UCC campus.", heroEyebrow: "Nne\u025Bma nketewa, anigye mmere", heroTitle: "Nne\u025Bma f\u025Bf\u025B ma", heroTitleEm: "nna a \u025By\u025B anigye.", heroText: "Nne\u025Bma f\u025Bf\u025B a \u025Bb\u025Bma wo da biara ay\u025B yie.", explore: "Hw\u025B nne\u025Bma no", shopEdit: "T\u0254", edit: "nne\u025Bma", viewAll: "Hw\u025B nne\u025Bma nyinaa", search: "Hwehw\u025B nne\u025Bma", add: "Fa k\u0254 cart", reviews: "Nsusuwii", newsletterTitle: "As\u025Bm ketewa bi fi y\u025Bn nky\u025Bn", newsletterText: "Nne\u025Bma foforo ne offers w\u0254 wo inbox mu.", join: "Ka y\u025Bn ho", email: "Wo email", cartEmpty: "Wo cart retw\u025Bn biribi f\u025Bf\u025B.", continueShopping: "K\u0254 so t\u0254", pay: "Tua denam Paystack so" },
    fr: { settings: "Param\xE8tres", cart: "Votre panier", notifications: "Notifications", transactions: "Transactions", language: "Langue", currency: "Devise", theme: "Th\xE8me", password: "Changer le mot de passe", save: "Enregistrer", light: "Clair", dark: "Sombre", system: "Syst\xE8me", orderUpdates: "Mises \xE0 jour de commande", offers: "Offres et nouveaut\xE9s", viewTransactions: "Voir les transactions", shop: "Tout acheter", beauty: "Beaut\xE9", lifestyle: "Style de vie", story: "Notre histoire", locate: "Nous trouver", announcement: "Livraison gratuite sur le campus UCC.", heroEyebrow: "Petites choses, doux moments", heroTitle: "Petits plaisirs pour des", heroTitleEm: "jours heureux.", heroText: "Des accessoires choisis pour rendre votre quotidien plus agr\xE9able.", explore: "D\xE9couvrir la collection", shopEdit: "D\xE9couvrez la", edit: "s\xE9lection", viewAll: "Voir tous les articles", search: "Rechercher", add: "Ajouter au panier", reviews: "Avis", newsletterTitle: "Un petit mot de nous", newsletterText: "Nouveaut\xE9s et offres dans votre bo\xEEte mail.", join: "Rejoindre", email: "Votre adresse e-mail", cartEmpty: "Votre panier attend quelque chose de joli.", continueShopping: "Continuer vos achats", pay: "Payer avec Paystack" }
  };
  function BagIcon() {
    return /* @__PURE__ */ React.createElement("svg", { "aria-hidden": "true", fill: "none", stroke: "currentColor", strokeWidth: "1.7", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M5 8.5h14l-1 11H6l-1-11Z" }), /* @__PURE__ */ React.createElement("path", { d: "M9 9V6.7a3 3 0 0 1 6 0V9" }));
  }
  function BellIcon() {
    return /* @__PURE__ */ React.createElement("svg", { "aria-hidden": "true", fill: "none", stroke: "currentColor", strokeWidth: "1.7", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" }));
  }
  function SocialIcon({ name }) {
    const icons = { telegram: "Telegram.webp", whatsapp: "whatapp.jpg", snapchat: "snapchat.webp", tiktok: "Tiktok.webp" };
    return /* @__PURE__ */ React.createElement("img", { "aria-hidden": "true", className: "social-icon", src: icons[name], alt: "" });
  }
  function ProviderLogo({ name }) {
    if (name === "Google") return /* @__PURE__ */ React.createElement("svg", { className: "provider-logo", "aria-hidden": "true", viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { fill: "#4285F4", d: "M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z" }), /* @__PURE__ */ React.createElement("path", { fill: "#34A853", d: "M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z" }), /* @__PURE__ */ React.createElement("path", { fill: "#FBBC05", d: "M6.53 13.59A5.85 5.85 0 0 1 6.22 12c0-.55.11-1.09.31-1.59V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.12l3.24-2.53Z" }), /* @__PURE__ */ React.createElement("path", { fill: "#EA4335", d: "M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.53C7.3 8.1 9.46 6.38 12 6.38Z" }));
    return null;
  }
  function PasswordInput(props) {
    const [visible, setVisible] = useState(false);
    return /* @__PURE__ */ React.createElement("div", { className: "password-field" }, /* @__PURE__ */ React.createElement("input", { ...props, type: visible ? "text" : "password" }), /* @__PURE__ */ React.createElement("button", { className: "password-toggle", type: "button", onClick: () => setVisible((current) => !current), "aria-label": visible ? "Hide password" : "Show password", title: visible ? "Hide password" : "Show password" }, visible ? "Hide" : "Show"));
  }
  function LoadingSpinner({ label = "Loading" }) {
    return /* @__PURE__ */ React.createElement("span", { className: "loading-inline", "aria-live": "polite", "aria-label": label }, /* @__PURE__ */ React.createElement("span", { className: "loading-ring", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", null, label));
  }
  function App() {
    const [products, setProducts] = useState(defaultProducts);
    const [activeCategory, setActiveCategory] = useState("All pieces");
    const [query, setQuery] = useState("");
    const [cart, setCart] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [siteReady, setSiteReady] = useState(false);
    const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
    const cartOwnerUid = useRef(null);
    const cartHydrated = useRef(false);
    const handledPushNotificationIds = useRef(/* @__PURE__ */ new Set());
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
    const [productForm, setProductForm] = useState({ id: null, name: "", category: "Beauty", price: "", stock: "", icon: "\u2728", tone: "tone-rose", tag: "", imageUrl: "" });
    const [productMessage, setProductMessage] = useState("");
    const [isSavingProduct, setIsSavingProduct] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    useEffect(() => {
      const loader = document.querySelector(".initial-loader");
      if (!loader) {
        setSiteReady(true);
        return void 0;
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
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    }, [theme]);
    useEffect(() => {
      if (!siteReady) return void 0;
      const revealables = document.querySelectorAll(".section, .value-strip, .locations-section, .newsletter, .product-card, .location-card");
      if (!revealables.length) return void 0;
      revealables.forEach((element, index) => {
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
      });
      if (!("IntersectionObserver" in window)) {
        revealables.forEach((element) => element.classList.add("is-revealed"));
        return void 0;
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
      if (!window.valCareMessaging) return void 0;
      return window.valCareMessaging.onMessage((payload) => {
        const title = payload.notification?.title || "Val's Glam update";
        const body = payload.notification?.body || "You have a new Val's Glam notification.";
        if (payload.data?.notificationId) handledPushNotificationIds.current.add(payload.data.notificationId);
        playNotificationSound();
        if (document.visibilityState === "visible" && "Notification" in window && Notification.permission === "granted") {
          new Notification(title, { body, icon: "icon-192.png", tag: payload.data?.notificationId || "valcare-notification" });
        }
      });
    }, []);
    useEffect(() => {
      const user = window.valCareAuth?.currentUser;
      if (!userName || !user || !window.valCareMessaging || !("Notification" in window) || Notification.permission !== "granted") return void 0;
      let cancelled = false;
      setPushStatus("loading");
      registerPushToken(user).then((registered) => {
        if (!cancelled) setPushStatus(registered ? "enabled" : "idle");
      }).catch(() => {
        if (!cancelled) setPushStatus("idle");
      });
      return () => {
        cancelled = true;
      };
    }, [userName]);
    useEffect(() => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
      const iosDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
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
      if (!window.valCareAuth) return void 0;
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
            if (["abandoned", "canceled", "cancelled"].includes(String(result.status || "").toLowerCase())) {
              const message = "Your payment was canceled. If this was an error, you can try again.";
              setOrderMessage(message);
              setActivePanel("cart");
              playNotificationSound();
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification("Payment canceled", { body: message, icon: "icon-192.png", tag: `payment-canceled-${reference}` });
              }
              return;
            }
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
      if (!window.valCareDb) return void 0;
      return window.valCareDb.collection("adminStatus").doc("config").onSnapshot((snapshot) => {
        setAdminSetupAvailable(!snapshot.exists);
      }, () => setAdminSetupAvailable(false));
    }, []);
    useEffect(() => {
      if (!window.valCareDb || !window.valCareAuth) return void 0;
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
        const initialSources = /* @__PURE__ */ new Set();
        let notificationsReady = false;
        const receiveNotifications = (source, nextNotifications) => {
          const newNotifications = notificationsReady ? nextNotifications.filter((notification) => !handledPushNotificationIds.current.has(notification.id)) : [];
          nextNotifications.forEach((notification) => handledPushNotificationIds.current.add(notification.id));
          initialSources.add(source);
          if (initialSources.size === 2) notificationsReady = true;
          if (newNotifications.length && document.visibilityState === "visible") {
            newNotifications.forEach((notification) => {
              const title = notification.title || "Val's Glam update";
              const body = notification.message || "You have a new Val's Glam notification.";
              playNotificationSound();
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification(title, { body, icon: "icon-192.png", tag: notification.id });
              }
            });
          }
        };
        const updateNotifications = () => {
          const merged = [...broadcastNotifications, ...personalNotifications];
          merged.sort((left, right) => (right.createdAt?.toMillis?.() || 0) - (left.createdAt?.toMillis?.() || 0));
          setNotifications(merged.slice(0, 20));
        };
        unsubscribeBroadcastNotifications = window.valCareDb.collection("notifications").where("audience", "==", "all").limit(20).onSnapshot((snapshot) => {
          broadcastNotifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          receiveNotifications("broadcast", broadcastNotifications);
          updateNotifications();
        }, () => {
          broadcastNotifications = [];
          updateNotifications();
        });
        unsubscribePersonalNotifications = window.valCareDb.collection("notifications").where("audience", "==", "user").where("recipientId", "==", user.uid).limit(20).onSnapshot((snapshot) => {
          personalNotifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          receiveNotifications("personal", personalNotifications);
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
      if (!window.valCareDb) return void 0;
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
      if (activePanel !== "reviews" || !selectedProduct || !window.valCareDb) return void 0;
      let cancelled = false;
      window.valCareDb.collection("reviews").where("productId", "==", selectedProduct.id).get().then((snapshot) => {
        if (cancelled) return;
        const nextReviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        nextReviews.sort((left, right) => (right.createdAt?.toMillis?.() || 0) - (left.createdAt?.toMillis?.() || 0));
        setReviews(nextReviews);
      }).catch(() => {
        if (!cancelled) setReviewMessage("Reviews are unavailable right now.");
      });
      return () => {
        cancelled = true;
      };
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
        setAccount({ name: "", email: "", password: "", confirm: "" });
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
      const nextItems = favoriteIds.includes(String(product.id)) ? previousItems.filter((item) => String(item.id) !== String(product.id)) : [...previousItems, { id: product.id, name: product.name, category: product.category, price: Number(product.price), icon: product.icon || "\u2728", tone: product.tone || "tone-rose" }];
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
    }, /* @__PURE__ */ new Map());
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
              title: "Your Val's Glam delivery is complete",
              message: "Your order has been marked as delivered by the Val's Glam team. Thank you for shopping with us.",
              audience: "user",
              recipientId: order.userId,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          } catch (notificationError) {
            console.error("Delivery notification could not be created", notificationError);
            notificationSent = false;
          }
        }
        setAdminOrders((current) => current.map((order2) => String(order2.id) === String(orderId) ? { ...order2, status: "delivered" } : order2));
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
      "All pieces": language === "fr" ? "Tous les articles" : language === "tw" ? "Nne\u025Bma nyinaa" : "All pieces",
      Beauty: text.beauty,
      Accessories: language === "fr" ? "Accessoires" : language === "tw" ? "Nne\u025Bma a w\u0254de hyehy\u025B" : "Accessories",
      Home: language === "fr" ? "Maison" : language === "tw" ? "Fie" : "Home",
      Lifestyle: text.lifestyle
    };
    const formatPrice = (amount) => `${currencies[currency].symbol}${(amount * currencies[currency].rate).toFixed(2)}`;
    const updatePassword = async (event) => {
      event.preventDefault();
      const user = window.valCareAuth?.currentUser;
      const hasPasswordProvider = user?.providerData?.some((provider) => provider.providerId === "password");
      if (!hasPasswordProvider && !password.next || hasPasswordProvider && !password.current || !password.next || password.next !== password.confirm) {
        setPasswordMessage(language === "fr" ? "V\xE9rifiez vos informations." : language === "tw" ? "Y\u025Bsr\u025B s\u025B hw\u025B wo ns\u025Bm no mu." : "Check your password details.");
        return;
      }
      if (!user) {
        setPasswordMessage(language === "fr" ? "Connectez-vous pour changer votre mot de passe." : language === "tw" ? "Y\u025Bsr\u025B s\u025B login ansa na woasesa password." : "Sign in to change your password.");
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
      setPasswordMessage(hasPasswordProvider ? language === "fr" ? "Mot de passe mis \xE0 jour." : language === "tw" ? "W\u0254asesa password no." : "Password updated successfully." : "Email/password login is now enabled for this account.");
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
      setProductForm({ id: product.id, name: product.name, category: product.category, price: product.price, stock: product.stock ?? 0, icon: product.icon || "\u2728", tone: product.tone || "tone-rose", tag: product.tag || "", imageUrl: product.imageUrl || "" });
      setProductMessage("");
      window.setTimeout(() => document.querySelector(".product-admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    };
    const resetProductForm = () => {
      setProductForm({ id: null, name: "", category: "Beauty", price: "", stock: "", icon: "\u2728", tone: "tone-rose", tag: "", imageUrl: "" });
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
        const product = { id: String(productId), name: productForm.name.trim(), category: productForm.category, price, stock, icon: productForm.icon.trim() || "\u2728", tone: productForm.tone, tag: productForm.tag.trim(), imageUrl, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
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
        setProducts((current) => productForm.id ? current.map((item) => String(item.id) === String(productId) ? { ...item, ...product } : item) : [...current, product]);
        setProductMessage(productForm.id ? "Product updated." : "Product added to the shop.");
        resetProductForm();
      } catch (error) {
        console.error("Product save failed", error);
        const code = String(error.code || "").replace("firestore/", "");
        setProductMessage(code === "permission-denied" ? "You no longer have admin access. Sign out and sign in again, then try again." : code === "invalid-argument" ? "The product data is invalid. Check the category, price, stock, and image URL." : "Could not save this product. Please try again.");
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
      if (!isImageFile || !isHeicFile && file.size > 5 * 1024 * 1024 || isHeicFile && file.size > 20 * 1024 * 1024) {
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
        setProductMessage(error.message === "The converted image is larger than 5 MB." ? "The converted image is larger than 5 MB. Choose a smaller picture." : isHeicFile ? "This HEIC/HEIF image could not be converted. Choose a JPG or PNG picture instead." : "Image upload failed. Check Storage access and try again.");
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
              title: "Thank you for joining Val's Glam Shop",
              message: `Thank you for joining Val's Glam Shop, ${account.name.trim().split(/\s+/)[0] || "friend"}! We are happy to have you here.`,
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
        setActivePanel(null);
        setIsAccountLoading(false);
        setShowWelcomeAnimation(true);
        window.setTimeout(() => setShowWelcomeAnimation(false), 2800);
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
    const openNewProductForm = () => {
      resetProductForm();
      openPanelWithLoading("inventory");
      window.setTimeout(() => document.querySelector(".product-admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 280);
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
      gain.gain.setValueAtTime(1e-4, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-4, context.currentTime + 0.28);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.3);
    };
    const registerPushToken = async (user) => {
      if (!window.valCareMessaging || !("serviceWorker" in navigator) || !window.valCareDb) return false;
      const registration = await navigator.serviceWorker.ready;
      const token = await window.valCareMessaging.getToken({ serviceWorkerRegistration: registration });
      if (!token) return false;
      await window.valCareDb.collection("pushTokens").doc(token).set({
        token,
        userId: user.uid,
        email: user.email || "",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      return true;
    };
    const enablePushNotifications = async () => {
      const user = window.valCareAuth?.currentUser;
      if (!user) {
        setAuthMode("login");
        setAccountMessage("Sign in to enable Val's Glam alerts.");
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
        if (!await registerPushToken(user)) throw new Error("Push registration unavailable.");
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
    return /* @__PURE__ */ React.createElement("div", { className: `site-shell theme-${theme} ${siteReady ? "is-visible" : ""}` }, isLanguageLoading && /* @__PURE__ */ React.createElement("div", { className: "language-loading", role: "status", "aria-live": "polite" }, /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Loading language" })), showWelcomeAnimation && /* @__PURE__ */ React.createElement("div", { className: "welcome-animation", role: "status", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("div", { className: "welcome-animation-card" }, /* @__PURE__ */ React.createElement("img", { src: "vals.jpg", alt: "Val's Glam Shop" }), /* @__PURE__ */ React.createElement("div", { className: "welcome-sparkles", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", null, "\u2726"), /* @__PURE__ */ React.createElement("span", null, "\u2727"), /* @__PURE__ */ React.createElement("span", null, "\u2726")), /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "A little welcome"), /* @__PURE__ */ React.createElement("h2", null, "Thank you for joining"), /* @__PURE__ */ React.createElement("strong", null, "Val's Glam Shop"), /* @__PURE__ */ React.createElement("p", null, "Lovely things are waiting for you."))), /* @__PURE__ */ React.createElement("div", { className: "announcement" }, text.announcement), cartMessage && /* @__PURE__ */ React.createElement("div", { className: "cart-toast", role: "status", "aria-live": "polite" }, cartMessage), /* @__PURE__ */ React.createElement("header", { className: "navbar" }, /* @__PURE__ */ React.createElement("a", { className: "logo", href: "#top", "aria-label": "Val's Glam Accessories home" }, /* @__PURE__ */ React.createElement("img", { className: "brand-logo", src: "vals.jpg", alt: "Val's Glam Accessories" }), /* @__PURE__ */ React.createElement("span", { className: "logo-name" }, "Val's Glam Accessories")), /* @__PURE__ */ React.createElement("nav", { className: "nav-links", "aria-label": "Main navigation" }, /* @__PURE__ */ React.createElement("a", { href: "#shop" }, text.shop), /* @__PURE__ */ React.createElement("a", { href: "#shop" }, text.beauty), /* @__PURE__ */ React.createElement("a", { href: "#shop" }, text.lifestyle), /* @__PURE__ */ React.createElement("a", { href: "#about" }, text.story), /* @__PURE__ */ React.createElement("a", { href: "#locations" }, text.locate)), /* @__PURE__ */ React.createElement("div", { className: `nav-actions ${isAdmin ? "admin-nav-actions" : "client-nav-actions"}` }, userName ? /* @__PURE__ */ React.createElement("button", { className: `user-name ${isAdmin ? "admin-user-name" : ""}`, onClick: () => openPanelWithLoading(isAdmin ? "inventory" : "settings"), "aria-label": isAdmin ? "Open admin dashboard" : "Open account settings", title: userName }, loadingAction === (isAdmin ? "inventory" : "settings") ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Opening" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "user-avatar" }, userName.charAt(0).toUpperCase()), /* @__PURE__ */ React.createElement("span", { className: "user-display-name" }, userName))) : /* @__PURE__ */ React.createElement("button", { className: "login-link", onClick: () => {
      setAuthMode("login");
      setAccountMessage("");
      openPanelWithLoading("auth");
    } }, loadingAction === "auth" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Opening" }) : "Log in"), !isAdmin && /* @__PURE__ */ React.createElement("button", { className: "icon-button panel-trigger", "aria-label": `View notifications${unreadNotificationCount ? `, ${unreadNotificationCount} unread` : ""}`, title: "Notifications", onClick: () => {
      openNotifications();
      setLoadingAction("notifications");
      window.setTimeout(() => setLoadingAction(null), 260);
    } }, loadingAction === "notifications" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BellIcon, null), unreadNotificationCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "cart-count notification-count" }, unreadNotificationCount > 99 ? "99+" : unreadNotificationCount))), !isAdmin && userName && /* @__PURE__ */ React.createElement("button", { className: "icon-button wishlist-button", "aria-label": "Open favorite products", title: "Wishlist", onClick: () => openPanelWithLoading("wishlist") }, loadingAction === "wishlist" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u2661", /* @__PURE__ */ React.createElement("span", { className: "cart-count" }, wishlistItems.length))), userName && pushStatus !== "enabled" && /* @__PURE__ */ React.createElement("button", { className: "push-enable-button", type: "button", onClick: enablePushNotifications, disabled: pushStatus === "loading" }, pushStatus === "loading" ? "Enabling alerts..." : pushStatus === "denied" ? "Allow alerts" : "Enable alerts"), !isStandalone && /* @__PURE__ */ React.createElement("button", { className: "install-app-button", type: "button", onClick: installApp }, "Install App"), /* @__PURE__ */ React.createElement("button", { className: "icon-button settings-button", "aria-label": "Open settings", title: "Settings", onClick: () => openPanelWithLoading("settings") }, loadingAction === "settings" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : /* @__PURE__ */ React.createElement("img", { src: "settings.png", alt: "" })), /* @__PURE__ */ React.createElement("div", { className: "secondary-nav-actions" }, isAdmin && /* @__PURE__ */ React.createElement("button", { className: "icon-button admin-inventory-icon", "aria-label": "Manage products and stock", title: "Manage products", onClick: openNewProductForm }, loadingAction === "inventory" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : "\u2726"), isAdmin && /* @__PURE__ */ React.createElement("button", { className: "icon-button", "aria-label": "Open sales report", title: "Sales report", onClick: () => handleLoadingAction("report", openAdminReport) }, loadingAction === "report" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : "\u25A5")), !isAdmin && /* @__PURE__ */ React.createElement("button", { className: "icon-button cart-button", "aria-label": `${cart} items in bag`, title: "Shopping bag", onClick: () => openPanelWithLoading("cart") }, loadingAction === "cart" ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { src: "cart.png", alt: "" }), /* @__PURE__ */ React.createElement("span", { className: "cart-count" }, cart))))), /* @__PURE__ */ React.createElement("main", { id: "top" }, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, text.heroEyebrow), /* @__PURE__ */ React.createElement("h1", null, text.heroTitle, " ", /* @__PURE__ */ React.createElement("em", null, text.heroTitleEm)), /* @__PURE__ */ React.createElement("p", { className: "hero-text" }, text.heroText), /* @__PURE__ */ React.createElement("a", { className: "primary-button", href: "#shop" }, text.explore)), /* @__PURE__ */ React.createElement("div", { className: "hero-art" }, /* @__PURE__ */ React.createElement("span", { className: "hero-bubble bubble-one", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "hero-bubble bubble-two", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "hero-bubble bubble-three", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "hero-shape shape-ring", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "hero-shape shape-spark", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("img", { className: "hero-photo", src: "image.png", alt: "Woman applying skincare" }))), /* @__PURE__ */ React.createElement("section", { className: "section", id: "shop" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, text.shopEdit, " ", /* @__PURE__ */ React.createElement("em", null, text.edit)), /* @__PURE__ */ React.createElement("a", { className: "view-all", href: "#shop" }, text.viewAll, " \u2197")), /* @__PURE__ */ React.createElement("input", { id: "product-search", className: "product-search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: text.search, "aria-label": text.search }), /* @__PURE__ */ React.createElement("div", { className: "category-row", role: "tablist", "aria-label": "Product categories" }, categories.map((category) => /* @__PURE__ */ React.createElement("button", { key: category, className: `category ${activeCategory === category ? "active" : ""}`, onClick: () => setActiveCategory(category) }, categoryLabels[category]))), /* @__PURE__ */ React.createElement("div", { className: "product-grid" }, filteredProducts.map((product) => /* @__PURE__ */ React.createElement("article", { className: "product-card", key: product.id }, /* @__PURE__ */ React.createElement("div", { className: `product-image ${product.tone}` }, product.imageUrl ? /* @__PURE__ */ React.createElement("img", { src: product.imageUrl, alt: "" }) : /* @__PURE__ */ React.createElement("span", null, product.icon), product.tag && /* @__PURE__ */ React.createElement("span", { className: "badge" }, product.tag), userName && !isAdmin && /* @__PURE__ */ React.createElement("button", { className: `favorite-button ${favoriteIds.includes(String(product.id)) ? "active" : ""}`, type: "button", onClick: () => toggleFavorite(product), "aria-label": favoriteIds.includes(String(product.id)) ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites` }, favoriteIds.includes(String(product.id)) ? "\u2665" : "\u2661")), /* @__PURE__ */ React.createElement("div", { className: "product-info" }, /* @__PURE__ */ React.createElement("h3", null, product.name), /* @__PURE__ */ React.createElement("div", { className: "product-bottom" }, /* @__PURE__ */ React.createElement("span", { className: "price" }, formatPrice(product.price)), /* @__PURE__ */ React.createElement("span", { className: `stock-label ${product.stock === 0 ? "out-of-stock" : ""}` }, product.stock === 0 ? "Sold out" : `${product.stock} left`), /* @__PURE__ */ React.createElement("button", { className: "review-button", onClick: () => openReviews(product) }, text.reviews), isAdmin ? /* @__PURE__ */ React.createElement("span", { className: "admin-product-actions" }, /* @__PURE__ */ React.createElement("button", { className: "admin-edit-button", type: "button", onClick: () => {
      editProduct(product);
      setActivePanel("inventory");
    } }, "Edit"), /* @__PURE__ */ React.createElement("button", { className: "admin-delete-button", type: "button", onClick: () => confirmDeleteProduct(product) }, "Delete")) : /* @__PURE__ */ React.createElement("button", { className: "add-button", onClick: () => addToBag(product), disabled: product.stock === 0 }, "+ ", text.add))))), !filteredProducts.length && /* @__PURE__ */ React.createElement("p", { className: "empty" }, "Nothing found just yet. Try another little search.")), isAdmin && /* @__PURE__ */ React.createElement("div", { className: "admin-add-product-row" }, /* @__PURE__ */ React.createElement("button", { className: "primary-button admin-add-product-button", type: "button", onClick: openNewProductForm }, "+ Add new product"))), /* @__PURE__ */ React.createElement("section", { className: "value-strip", id: "about" }, /* @__PURE__ */ React.createElement("div", { className: "value-item" }, /* @__PURE__ */ React.createElement("strong", null, "Curated with care"), /* @__PURE__ */ React.createElement("span", null, "Pieces chosen to brighten your routine")), /* @__PURE__ */ React.createElement("div", { className: "value-item" }, /* @__PURE__ */ React.createElement("strong", null, "Kind to your pocket"), /* @__PURE__ */ React.createElement("span", null, "Lovely little luxuries from GH\u20B512")), /* @__PURE__ */ React.createElement("div", { className: "value-item" }, /* @__PURE__ */ React.createElement("strong", null, "Packaged with love"), /* @__PURE__ */ React.createElement("span", null, "Ready to gift, even when it\u2019s for you"))), /* @__PURE__ */ React.createElement("section", { className: "locations-section", id: "locations" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Come say hello"), /* @__PURE__ */ React.createElement("h2", null, "Find us ", /* @__PURE__ */ React.createElement("em", null, "near you")))), /* @__PURE__ */ React.createElement("div", { className: "location-grid" }, /* @__PURE__ */ React.createElement("article", { className: "location-card" }, /* @__PURE__ */ React.createElement("span", { className: "location-pin" }, "K"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Koforidua"), /* @__PURE__ */ React.createElement("p", null, "Visit ValCare in Koforidua and discover our latest little luxuries."), /* @__PURE__ */ React.createElement("a", { className: "location-link", href: "https://maps.app.goo.gl/Abix2Rjb7RjhiGta6?g_st=ic", target: "_blank", rel: "noreferrer" }, "Open in Google Maps \u2197"), /* @__PURE__ */ React.createElement("iframe", { className: "location-map", title: "Koforidua map", src: "https://www.google.com/maps?q=Koforidua%2C%20Ghana&output=embed", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }))), /* @__PURE__ */ React.createElement("article", { className: "location-card" }, /* @__PURE__ */ React.createElement("span", { className: "location-pin" }, "U"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "UCC campus"), /* @__PURE__ */ React.createElement("p", null, "Find us on the University of Cape Coast campus for convenient pickup and delivery."), /* @__PURE__ */ React.createElement("a", { className: "location-link", href: "https://maps.app.goo.gl/cce8XwQFTZmLU2ny9", target: "_blank", rel: "noreferrer" }, "Open UCC map \u2197"), /* @__PURE__ */ React.createElement("span", { className: "location-note" }, "Free delivery on UCC campus"), /* @__PURE__ */ React.createElement("iframe", { className: "location-map", title: "UCC campus map", src: "https://www.google.com/maps?q=University%20of%20Cape%20Coast%2C%20Ghana&output=embed", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }))))), /* @__PURE__ */ React.createElement("section", { className: "newsletter" }, /* @__PURE__ */ React.createElement("h2", null, text.newsletterTitle), /* @__PURE__ */ React.createElement("p", null, text.newsletterText), subscribed ? /* @__PURE__ */ React.createElement("p", null, "You're on the list. Welcome to Val's Glam.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("form", { className: "subscribe", onSubmit: subscribe }, /* @__PURE__ */ React.createElement("input", { value: email, onChange: (event) => setEmail(event.target.value), type: "email", placeholder: "Your email address", "aria-label": "Your email address", required: true }), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: isSubscribing }, isSubscribing ? "Saving..." : "Join us")), subscribeMessage && /* @__PURE__ */ React.createElement("small", { className: "subscribe-message" }, subscribeMessage)))), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", { className: "footer-contact" }, /* @__PURE__ */ React.createElement("strong", null, "Contact Val's Glam"), /* @__PURE__ */ React.createElement("a", { className: "footer-phone", href: "tel:+233594972748" }, "Call us on +233 59 497 2748"), /* @__PURE__ */ React.createElement("div", { className: "footer-socials" }, /* @__PURE__ */ React.createElement("a", { href: "https://t.me/MsVallerie_2", target: "_blank", rel: "noreferrer", "aria-label": "Contact Val's Glam on Telegram" }, /* @__PURE__ */ React.createElement(SocialIcon, { name: "telegram" })), /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/233594972748", target: "_blank", rel: "noreferrer", "aria-label": "Contact Val's Glam on WhatsApp" }, /* @__PURE__ */ React.createElement(SocialIcon, { name: "whatsapp" })), /* @__PURE__ */ React.createElement("a", { href: "https://www.snapchat.com/add/nharnaakuah_2", target: "_blank", rel: "noreferrer", "aria-label": "Contact Val's Glam on Snapchat" }, /* @__PURE__ */ React.createElement(SocialIcon, { name: "snapchat" })), /* @__PURE__ */ React.createElement("a", { href: "https://www.tiktok.com/@ms_valcaresil", target: "_blank", rel: "noreferrer", "aria-label": "Contact Val's Glam on TikTok" }, /* @__PURE__ */ React.createElement(SocialIcon, { name: "tiktok" })))), /* @__PURE__ */ React.createElement("div", null, "\xA9 2026 Val's Glam \xB7 Made for your everyday.")), installHelpOpen && ReactDOM.createPortal(/* @__PURE__ */ React.createElement("div", { className: "install-help-backdrop", role: "presentation", onClick: () => setInstallHelpOpen(false) }, /* @__PURE__ */ React.createElement("section", { className: "install-help", role: "dialog", "aria-modal": "true", "aria-labelledby": "install-help-title", onClick: (event) => event.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "close-button", type: "button", onClick: () => setInstallHelpOpen(false), "aria-label": "Close install instructions" }, "\xD7"), /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Val's Glam app"), /* @__PURE__ */ React.createElement("h2", { id: "install-help-title" }, "Install Val's Glam"), isIos ? /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, "Tap the ", /* @__PURE__ */ React.createElement("strong", null, "Share"), " button in Safari."), /* @__PURE__ */ React.createElement("li", null, "Choose ", /* @__PURE__ */ React.createElement("strong", null, "Add to Home Screen"), "."), /* @__PURE__ */ React.createElement("li", null, "Tap ", /* @__PURE__ */ React.createElement("strong", null, "Add"), " to finish.")) : /* @__PURE__ */ React.createElement("p", null, "Open your browser menu and choose ", /* @__PURE__ */ React.createElement("strong", null, "Install Val's Glam"), " or ", /* @__PURE__ */ React.createElement("strong", null, "Add to Home screen"), ". The exact wording depends on your browser."), /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "button", onClick: () => setInstallHelpOpen(false) }, "Got it"))), document.body), activePanel && /* @__PURE__ */ React.createElement("div", { className: "panel-backdrop", onClick: closePanel }, /* @__PURE__ */ React.createElement("aside", { className: `account-panel theme-${theme}`, onClick: (event) => event.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "panel-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "ValCare account"), /* @__PURE__ */ React.createElement("h2", null, activePanel === "cart" ? text.cart : activePanel === "notifications" ? text.notifications : activePanel === "transactions" ? text.transactions : activePanel === "report" ? "Sales report" : activePanel === "reviews" ? "Product reviews" : activePanel === "inventory" ? "Manage products" : activePanel === "create-account" || activePanel === "auth" && authMode === "create" ? "Create your account" : activePanel === "auth" ? "Log in" : text.settings)), /* @__PURE__ */ React.createElement("button", { className: "close-button", onClick: closePanel, "aria-label": "Close panel" }, "\xD7")), (activePanel === "create-account" || activePanel === "auth") && /* @__PURE__ */ React.createElement("div", { className: "panel-content account-form" }, isAccountLoading && /* @__PURE__ */ React.createElement("div", { className: "account-loading-state" }, /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Preparing your account" }), /* @__PURE__ */ React.createElement("span", null, "Finishing your ValCare experience...")), /* @__PURE__ */ React.createElement("p", { className: "account-intro" }, authMode === "create" ? "Create your account to collect your ValCare finds." : "Log in to continue shopping and manage your account."), /* @__PURE__ */ React.createElement("div", { className: "social-auth-grid" }, /* @__PURE__ */ React.createElement("button", { className: "social-auth-button google-auth-button", type: "button", onClick: () => signInWithProvider("Google"), disabled: isAccountLoading }, /* @__PURE__ */ React.createElement(ProviderLogo, { name: "Google" }), "Continue with Google")), /* @__PURE__ */ React.createElement("div", { className: "form-divider" }, /* @__PURE__ */ React.createElement("span", null, "or use email")), /* @__PURE__ */ React.createElement("form", { autoComplete: authMode === "create" ? "off" : "on", onSubmit: authMode === "create" ? createAccount : login }, authMode === "create" && /* @__PURE__ */ React.createElement("input", { type: "text", autoComplete: "off", placeholder: "Your name", value: account.name, onChange: (event) => setAccount({ ...account, name: event.target.value }), required: true }), /* @__PURE__ */ React.createElement("input", { type: "email", autoComplete: authMode === "create" ? "off" : "email", placeholder: "Email address", value: account.email, onChange: (event) => setAccount({ ...account, email: event.target.value }), required: true }), /* @__PURE__ */ React.createElement(PasswordInput, { autoComplete: authMode === "create" ? "new-password" : "current-password", placeholder: "Password", value: account.password, onChange: (event) => setAccount({ ...account, password: event.target.value }), minLength: "6", required: true }), authMode === "create" && /* @__PURE__ */ React.createElement(PasswordInput, { autoComplete: "new-password", placeholder: "Confirm password", value: account.confirm, onChange: (event) => setAccount({ ...account, confirm: event.target.value }), minLength: "6", required: true }), /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "submit", disabled: isAccountLoading }, isAccountLoading ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Loading" }) : authMode === "create" ? "Create account" : "Log in"), accountMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, accountMessage)), /* @__PURE__ */ React.createElement("button", { className: "auth-switch", type: "button", disabled: isAccountLoading, onClick: () => {
      setAuthMode(authMode === "create" ? "login" : "create");
      setAdminMode(false);
      setAccountMessage("");
    } }, authMode === "create" ? "Already have an account? Log in" : "New to ValCare? Create an account")), activePanel === "wishlist" && !isAdmin && /* @__PURE__ */ React.createElement("div", { className: "panel-content" }, /* @__PURE__ */ React.createElement("div", { className: "wishlist-list" }, wishlistItems.length ? wishlistItems.map((product) => /* @__PURE__ */ React.createElement("article", { className: "wishlist-item", key: product.id }, /* @__PURE__ */ React.createElement("span", { className: `cart-thumb ${product.tone}` }, product.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, product.name), /* @__PURE__ */ React.createElement("span", null, formatPrice(product.price))), /* @__PURE__ */ React.createElement("button", { className: "add-button", type: "button", onClick: () => addToBag(product) }, "Add to bag"), /* @__PURE__ */ React.createElement("button", { className: "remove-item", type: "button", onClick: () => toggleFavorite(product), "aria-label": `Remove ${product.name} from favorites` }, "\xD7"))) : /* @__PURE__ */ React.createElement("div", { className: "panel-empty" }, /* @__PURE__ */ React.createElement("p", null, "Your favorite products will appear here.")))), activePanel === "cart" && !isAdmin && /* @__PURE__ */ React.createElement("div", { className: "panel-content" }, orderPlaced && /* @__PURE__ */ React.createElement("div", { className: "success-message" }, "Order received. We\u2019ll be in touch shortly."), !cartItems.length && !orderPlaced && /* @__PURE__ */ React.createElement("div", { className: "panel-empty" }, /* @__PURE__ */ React.createElement(BagIcon, null), /* @__PURE__ */ React.createElement("p", null, "Your cart is waiting for something lovely."), /* @__PURE__ */ React.createElement("a", { href: "#shop", onClick: closePanel }, "Continue shopping")), cartItems.map((product, index) => /* @__PURE__ */ React.createElement("div", { className: "cart-item", key: `${product.id}-${index}` }, /* @__PURE__ */ React.createElement("div", { className: `cart-thumb ${product.tone}` }, product.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, product.name), /* @__PURE__ */ React.createElement("span", null, formatPrice(product.price))), /* @__PURE__ */ React.createElement("button", { className: "remove-item", onClick: () => removeFromBag(index), "aria-label": `Remove ${product.name}`, title: `Remove ${product.name}` }, "\xD7"))), !!cartItems.length && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "cart-total" }, /* @__PURE__ */ React.createElement("span", null, "Subtotal"), /* @__PURE__ */ React.createElement("strong", null, formatPrice(cartTotal))), /* @__PURE__ */ React.createElement("button", { className: "primary-button checkout-button", onClick: placeOrder, disabled: isCheckingOut }, isCheckingOut ? "Opening secure payment..." : "Pay securely with Paystack")), orderMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message order-message" }, orderMessage)), activePanel === "notifications" && /* @__PURE__ */ React.createElement("div", { className: "panel-content notification-list" }, notifications.length ? notifications.map((notification) => /* @__PURE__ */ React.createElement("div", { className: "notice-item", key: notification.id }, /* @__PURE__ */ React.createElement("span", { className: "notice-mark" }, "\u2726"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, notification.title), /* @__PURE__ */ React.createElement("p", null, notification.message), /* @__PURE__ */ React.createElement("small", null, notification.createdAt?.toDate?.().toLocaleDateString?.() || "Just now")))) : /* @__PURE__ */ React.createElement("div", { className: "panel-empty" }, /* @__PURE__ */ React.createElement("p", null, "No new shop updates yet."))), activePanel === "transactions" && /* @__PURE__ */ React.createElement("div", { className: "panel-content" }, /* @__PURE__ */ React.createElement("div", { className: "transaction-card" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "VC-1042"), /* @__PURE__ */ React.createElement("span", null, "Aug 28, 2026 \xB7 2 items")), /* @__PURE__ */ React.createElement("strong", null, formatPrice(34)), /* @__PURE__ */ React.createElement("em", null, "Delivered")), /* @__PURE__ */ React.createElement("div", { className: "transaction-card" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "VC-0987"), /* @__PURE__ */ React.createElement("span", null, "Jul 14, 2026 \xB7 1 item")), /* @__PURE__ */ React.createElement("strong", null, formatPrice(18)), /* @__PURE__ */ React.createElement("em", null, "Delivered")), /* @__PURE__ */ React.createElement("div", { className: "panel-empty" }, /* @__PURE__ */ React.createElement("p", null, "Your purchases will appear here after checkout."))), activePanel === "report" && isAdmin && /* @__PURE__ */ React.createElement("div", { className: "panel-content report-panel" }, isLoadingReport ? /* @__PURE__ */ React.createElement("p", { className: "panel-empty" }, "Loading sales report...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "report-toggle" }, /* @__PURE__ */ React.createElement("button", { className: `report-tab pending ${reportView === "pending" ? "active" : ""}`, type: "button", onClick: () => setReportView("pending") }, "Pending delivery"), /* @__PURE__ */ React.createElement("button", { className: `report-tab delivered ${reportView === "delivered" ? "active" : ""}`, type: "button", onClick: () => setReportView("delivered") }, "Delivered")), productMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, productMessage), /* @__PURE__ */ React.createElement("section", { className: "report-section" }, /* @__PURE__ */ React.createElement("h3", null, reportView === "pending" ? "Awaiting delivery" : "Delivered orders"), (reportView === "pending" ? pendingOrders : deliveredOrders).length ? (reportView === "pending" ? pendingOrders : deliveredOrders).map((order) => /* @__PURE__ */ React.createElement("div", { className: "report-order", key: order.id }, /* @__PURE__ */ React.createElement("div", { className: "report-buyer-details" }, /* @__PURE__ */ React.createElement("button", { className: "report-buyer", type: "button", onClick: () => setSelectedOrderId(selectedOrderId === order.id ? null : order.id) }, /* @__PURE__ */ React.createElement("strong", null, order.customerName || order.customerEmail || "Customer"), /* @__PURE__ */ React.createElement("small", null, order.customerEmail || ""), /* @__PURE__ */ React.createElement("small", null, order.items?.length || 0, " item(s) \xB7 ", order.status || "paid")), selectedOrderId === order.id && /* @__PURE__ */ React.createElement("div", { className: "report-item-list" }, order.items?.length ? order.items.map((item, itemIndex) => /* @__PURE__ */ React.createElement("div", { className: "report-item", key: `${order.id}-${item.id || item.name}-${itemIndex}` }, /* @__PURE__ */ React.createElement("span", null, item.name || "Item", " \xD7 ", item.quantity || 1), /* @__PURE__ */ React.createElement("strong", null, formatPrice((Number(item.price) || 0) * (item.quantity || 1))))) : /* @__PURE__ */ React.createElement("small", null, "No item details recorded."))), /* @__PURE__ */ React.createElement("div", { className: "report-order-actions" }, /* @__PURE__ */ React.createElement("strong", null, formatPrice(order.total || 0)), reportView === "pending" ? /* @__PURE__ */ React.createElement("button", { className: "report-delivered-button", type: "button", onClick: () => markOrderDelivered(order.id) }, "Mark delivered") : /* @__PURE__ */ React.createElement("span", { className: "report-status-tag" }, "Delivered")))) : /* @__PURE__ */ React.createElement("p", { className: "panel-empty" }, reportView === "pending" ? "No successful payments are waiting for delivery." : "No delivered orders yet.")), /* @__PURE__ */ React.createElement("section", { className: "report-section" }, /* @__PURE__ */ React.createElement("h3", null, "Best-selling products"), bestSellingProducts.length ? bestSellingProducts.slice(0, 10).map((product) => /* @__PURE__ */ React.createElement("div", { className: "report-row", key: product.name }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, product.name), /* @__PURE__ */ React.createElement("small", null, product.quantity, " sold")), /* @__PURE__ */ React.createElement("strong", null, formatPrice(product.revenue)))) : /* @__PURE__ */ React.createElement("p", { className: "panel-empty" }, "No completed transactions yet.")))), activePanel === "reviews" && selectedProduct && /* @__PURE__ */ React.createElement("div", { className: "panel-content reviews-panel" }, /* @__PURE__ */ React.createElement("div", { className: "reviews-product" }, /* @__PURE__ */ React.createElement("span", { className: `cart-thumb ${selectedProduct.tone}` }, selectedProduct.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, selectedProduct.name), /* @__PURE__ */ React.createElement("span", null, formatPrice(selectedProduct.price)))), /* @__PURE__ */ React.createElement("div", { className: "review-list" }, reviews.length ? reviews.map((review) => /* @__PURE__ */ React.createElement("article", { className: "review-item", key: review.id }, /* @__PURE__ */ React.createElement("div", { className: "review-meta" }, /* @__PURE__ */ React.createElement("strong", null, review.userName), /* @__PURE__ */ React.createElement("span", null, "\u2605".repeat(review.rating), "\u2606".repeat(5 - review.rating))), /* @__PURE__ */ React.createElement("p", null, review.comment))) : /* @__PURE__ */ React.createElement("p", { className: "review-empty" }, "No reviews yet. Be the first to share your thoughts.")), /* @__PURE__ */ React.createElement("form", { className: "review-form", onSubmit: submitReview }, /* @__PURE__ */ React.createElement("label", { htmlFor: "review-rating" }, "Your rating"), /* @__PURE__ */ React.createElement("select", { id: "review-rating", value: reviewRating, onChange: (event) => setReviewRating(event.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "5" }, "\u2605\u2605\u2605\u2605\u2605"), /* @__PURE__ */ React.createElement("option", { value: "4" }, "\u2605\u2605\u2605\u2605\u2606"), /* @__PURE__ */ React.createElement("option", { value: "3" }, "\u2605\u2605\u2605\u2606\u2606"), /* @__PURE__ */ React.createElement("option", { value: "2" }, "\u2605\u2605\u2606\u2606\u2606"), /* @__PURE__ */ React.createElement("option", { value: "1" }, "\u2605\u2606\u2606\u2606\u2606")), /* @__PURE__ */ React.createElement("textarea", { value: reviewText, onChange: (event) => setReviewText(event.target.value), placeholder: "Share your thoughts", maxLength: "500", required: true }), /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "submit", disabled: isSubmittingReview }, isSubmittingReview ? "Saving review..." : "Add review"), reviewMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, reviewMessage))), activePanel === "settings" && /* @__PURE__ */ React.createElement("div", { className: "panel-content settings-list" }, /* @__PURE__ */ React.createElement("div", { className: "setting-control" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "currency" }, text.currency), /* @__PURE__ */ React.createElement("select", { id: "currency", value: currency, onChange: (event) => setCurrency(event.target.value) }, Object.keys(currencies).map((code) => /* @__PURE__ */ React.createElement("option", { key: code, value: code }, code, " (", currencies[code].symbol, ")")))), /* @__PURE__ */ React.createElement("div", { className: "setting-control" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "language" }, text.language), /* @__PURE__ */ React.createElement("select", { id: "language", value: language, onChange: (event) => changeLanguage(event.target.value), disabled: isLanguageLoading }, /* @__PURE__ */ React.createElement("option", { value: "en" }, "English"), /* @__PURE__ */ React.createElement("option", { value: "tw" }, "Twi"), /* @__PURE__ */ React.createElement("option", { value: "fr" }, "Fran\xE7ais"))), /* @__PURE__ */ React.createElement("div", { className: "setting-control" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "theme" }, text.theme), /* @__PURE__ */ React.createElement("select", { id: "theme", value: theme, onChange: (event) => setTheme(event.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "light" }, text.light), /* @__PURE__ */ React.createElement("option", { value: "dark" }, text.dark), /* @__PURE__ */ React.createElement("option", { value: "system" }, text.system))), /* @__PURE__ */ React.createElement("div", { className: "motion-control" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "cosmetic-motion" }, "Cosmetic animations"), /* @__PURE__ */ React.createElement("input", { id: "cosmetic-motion", type: "range", min: "0", max: "100", step: "5", value: cosmeticMotion, onChange: (event) => setCosmeticMotion(Number(event.target.value)) }), /* @__PURE__ */ React.createElement("small", null, cosmeticMotion === 0 ? "Off" : `${cosmeticMotion}% intensity`)), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, text.orderUpdates), /* @__PURE__ */ React.createElement("small", null, "Get delivery and order notifications")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: preferences.updates, onChange: () => setPreferences((current) => ({ ...current, updates: !current.updates })) })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, text.offers), /* @__PURE__ */ React.createElement("small", null, "Hear about fresh ValCare finds")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: preferences.offers, onChange: () => setPreferences((current) => ({ ...current, offers: !current.offers })) })), /* @__PURE__ */ React.createElement("form", { className: "password-form", onSubmit: updatePassword }, /* @__PURE__ */ React.createElement("h3", null, text.password), window.valCareAuth?.currentUser?.providerData?.some((provider) => provider.providerId === "password") && /* @__PURE__ */ React.createElement(PasswordInput, { placeholder: "Current password", value: password.current, onChange: (event) => setPassword({ ...password, current: event.target.value }), required: true }), /* @__PURE__ */ React.createElement(PasswordInput, { placeholder: "New password", value: password.next, onChange: (event) => setPassword({ ...password, next: event.target.value }), minLength: "6", required: true }), /* @__PURE__ */ React.createElement(PasswordInput, { placeholder: "Confirm new password", value: password.confirm, onChange: (event) => setPassword({ ...password, confirm: event.target.value }), minLength: "6", required: true }), /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "submit" }, window.valCareAuth?.currentUser?.providerData?.some((provider) => provider.providerId === "password") ? text.save : "Enable email/password login"), passwordMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, passwordMessage)), isAdmin && /* @__PURE__ */ React.createElement("form", { className: "password-form admin-security-form", onSubmit: updateAdminEmail }, /* @__PURE__ */ React.createElement("h3", null, "Admin email"), /* @__PURE__ */ React.createElement("p", { className: "account-intro" }, "Changing the admin email requires your current password."), /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: "New admin email", value: newEmail, onChange: (event) => setNewEmail(event.target.value), required: true }), /* @__PURE__ */ React.createElement(PasswordInput, { placeholder: "Current password", value: emailPassword, onChange: (event) => setEmailPassword(event.target.value), required: true }), /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "submit" }, "Update admin email"), emailMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, emailMessage)), /* @__PURE__ */ React.createElement("button", { className: "settings-link", onClick: () => setActivePanel("transactions") }, text.viewTransactions, " ", /* @__PURE__ */ React.createElement("span", null, "\u2197")), /* @__PURE__ */ React.createElement("button", { className: "settings-logout", onClick: confirmLogout }, "Log out")), activePanel === "inventory" && isAdmin && /* @__PURE__ */ React.createElement("div", { className: "panel-content inventory-panel" }, /* @__PURE__ */ React.createElement("p", { className: "account-intro" }, "Update prices, add new items, and keep stock levels current."), /* @__PURE__ */ React.createElement("form", { className: "product-admin-form", onSubmit: saveProduct }, /* @__PURE__ */ React.createElement("input", { placeholder: "Product name", value: productForm.name, onChange: (event) => setProductForm({ ...productForm, name: event.target.value }), required: true }), /* @__PURE__ */ React.createElement("div", { className: "admin-form-row" }, /* @__PURE__ */ React.createElement("select", { value: productForm.category, onChange: (event) => setProductForm({ ...productForm, category: event.target.value }) }, /* @__PURE__ */ React.createElement("option", null, "Beauty"), /* @__PURE__ */ React.createElement("option", null, "Accessories"), /* @__PURE__ */ React.createElement("option", null, "Home"), /* @__PURE__ */ React.createElement("option", null, "Lifestyle")), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "0.01", placeholder: "Price", value: productForm.price, onChange: (event) => setProductForm({ ...productForm, price: event.target.value }), required: true }), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "1", placeholder: "Stock", value: productForm.stock, onChange: (event) => setProductForm({ ...productForm, stock: event.target.value }), required: true })), /* @__PURE__ */ React.createElement("div", { className: "admin-form-row" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Icon emoji", value: productForm.icon, onChange: (event) => setProductForm({ ...productForm, icon: event.target.value }) }), /* @__PURE__ */ React.createElement("select", { value: productForm.tone, onChange: (event) => setProductForm({ ...productForm, tone: event.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "tone-rose" }, "Rose"), /* @__PURE__ */ React.createElement("option", { value: "tone-sage" }, "Sage"), /* @__PURE__ */ React.createElement("option", { value: "tone-yellow" }, "Yellow"), /* @__PURE__ */ React.createElement("option", { value: "tone-lilac" }, "Lilac"), /* @__PURE__ */ React.createElement("option", { value: "tone-blue" }, "Blue"), /* @__PURE__ */ React.createElement("option", { value: "tone-peach" }, "Peach"), /* @__PURE__ */ React.createElement("option", { value: "tone-pink" }, "Pink"), /* @__PURE__ */ React.createElement("option", { value: "tone-green" }, "Green")), /* @__PURE__ */ React.createElement("input", { placeholder: "Tag (optional)", value: productForm.tag, onChange: (event) => setProductForm({ ...productForm, tag: event.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "admin-form-actions" }, /* @__PURE__ */ React.createElement("button", { className: "settings-save", type: "submit", disabled: isSavingProduct }, isSavingProduct ? "Saving..." : productForm.id ? "Update product" : "Add product"), productForm.id && /* @__PURE__ */ React.createElement("button", { className: "settings-link", type: "button", onClick: resetProductForm }, "Cancel edit")), productMessage && /* @__PURE__ */ React.createElement("small", { className: "password-message" }, productMessage)), /* @__PURE__ */ React.createElement("div", { className: "inventory-list" }, products.map((product) => /* @__PURE__ */ React.createElement("button", { className: "inventory-item", key: product.id, type: "button", onClick: () => editProduct(product) }, /* @__PURE__ */ React.createElement("span", { className: `cart-thumb ${product.tone}` }, product.icon), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, product.name), /* @__PURE__ */ React.createElement("small", null, formatPrice(product.price), " \xB7 ", product.stock, " in stock")), /* @__PURE__ */ React.createElement("em", null, "Edit"))))), activePanel === "inventory" && isAdmin && /* @__PURE__ */ React.createElement("div", { className: "product-image-url-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "product-image-file" }, "Choose product picture"), /* @__PURE__ */ React.createElement("input", { id: "product-image-file", type: "file", accept: "image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif", onChange: uploadProductImage, disabled: isUploadingImage }), /* @__PURE__ */ React.createElement("small", null, isUploadingImage ? "Uploading image..." : productForm.id ? "Choose a picture replacement from your phone gallery or camera." : "Choose a picture from your phone gallery or camera."), /* @__PURE__ */ React.createElement("label", { htmlFor: "product-image-url" }, "Image URL"), /* @__PURE__ */ React.createElement("input", { id: "product-image-url", type: "url", placeholder: "https://...", value: productForm.imageUrl, onChange: (event) => setProductForm({ ...productForm, imageUrl: event.target.value }) })), activePanel === "inventory" && isAdmin && productForm.id && /* @__PURE__ */ React.createElement("button", { className: "settings-link", type: "button", onClick: () => confirmDeleteProduct(products.find((product) => String(product.id) === String(productForm.id))) }, "Delete selected product"))), confirmDialog && ReactDOM.createPortal(/* @__PURE__ */ React.createElement("div", { className: "confirm-backdrop", role: "presentation", onClick: () => setConfirmDialog(null) }, /* @__PURE__ */ React.createElement("div", { className: "confirm-dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "confirm-dialog-title", "aria-describedby": "confirm-dialog-message", onClick: (event) => event.stopPropagation() }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Please confirm"), /* @__PURE__ */ React.createElement("h2", { id: "confirm-dialog-title" }, confirmDialog.title), /* @__PURE__ */ React.createElement("p", { id: "confirm-dialog-message" }, confirmDialog.message), /* @__PURE__ */ React.createElement("div", { className: "confirm-actions" }, /* @__PURE__ */ React.createElement("button", { className: "confirm-cancel", type: "button", onClick: () => setConfirmDialog(null) }, "Cancel"), /* @__PURE__ */ React.createElement("button", { className: "confirm-submit", type: "button", onClick: () => {
      const action = confirmDialog.onConfirm;
      setConfirmDialog(null);
      action();
    } }, confirmDialog.confirmLabel)))), document.body));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
