const { useEffect, useState } = React;

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
  en: { settings: "Settings", cart: "Your cart", notifications: "Notifications", transactions: "Transactions", language: "Language", currency: "Currency", theme: "Theme", password: "Change password", save: "Save password", light: "Light", dark: "Dark", system: "System", orderUpdates: "Order updates", offers: "Offers and new drops", viewTransactions: "View transactions" },
  tw: { settings: "Nhyehyɛe", cart: "Wo cart", notifications: "Amanneɛbɔ", transactions: "Nkitahodi", language: "Kasa", currency: "Sika", theme: "Ɛkwan", password: "Sesa password", save: "Sie password", light: "Kanea", dark: "Sum", system: "System", orderUpdates: "Order nsɛm foforo", offers: "Nneɛma foforo ne offers", viewTransactions: "Hwɛ nkitahodi" },
  fr: { settings: "Paramètres", cart: "Votre panier", notifications: "Notifications", transactions: "Transactions", language: "Langue", currency: "Devise", theme: "Thème", password: "Changer le mot de passe", save: "Enregistrer", light: "Clair", dark: "Sombre", system: "Système", orderUpdates: "Mises à jour de commande", offers: "Offres et nouveautés", viewTransactions: "Voir les transactions" }
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

function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [activeCategory, setActiveCategory] = useState("All pieces");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [activePanel, setActivePanel] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [preferences, setPreferences] = useState({ updates: true, offers: false });
  const [currency, setCurrency] = useState("GHS");
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
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
    document.documentElement.style.setProperty("--motion-scale", `${cosmeticMotion / 65}`);
  }, [cosmeticMotion]);

  useEffect(() => {
    if (!window.valCareAuth) return undefined;
    return window.valCareAuth.onAuthStateChanged(async (user) => {
      const displayName = user?.displayName || user?.email?.split("@")[0] || "";
      setUserName(displayName.trim().split(/\s+/)[0]);
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const token = await user.getIdTokenResult();
      const setup = await window.valCareDb?.collection("adminStatus").doc("config").get();
      const isSetupOwner = setup?.exists && setup.data().createdBy === user.uid;
      setIsAdmin(token.claims.admin === true || isSetupOwner);
      const reference = new URLSearchParams(window.location.search).get("reference");
      if (reference && window.valCareFunctions) {
        try {
          await window.valCareFunctions.httpsCallable("verifyPaystackPayment")({ reference });
          window.history.replaceState({}, document.title, window.location.pathname);
          setOrderPlaced(true);
          setActivePanel("cart");
          window.trackValCareEvent?.("purchase", { transaction_id: reference });
        } catch (error) {
          setOrderMessage(error.details || "Payment could not be confirmed. Please contact us before trying again.");
          setActivePanel("cart");
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!window.valCareDb) return undefined;
    return window.valCareDb.collection("adminStatus").doc("config").onSnapshot((snapshot) => {
      setAdminSetupAvailable(!snapshot.exists);
    }, () => setAdminSetupAvailable(false));
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

  const addToBag = (product) => {
    if (!window.valCareAuth?.currentUser) {
      setAccountMessage("");
      setAuthMode("create");
      setActivePanel("create-account");
      return;
    }
    setCart((current) => current + 1);
    setCartItems((current) => [...current, product]);
    setActivePanel("cart");
    window.trackValCareEvent?.("add_to_cart", { item_name: product.name, value: product.price * currencies[currency].rate, currency });
  };

  const removeFromBag = (index) => {
    setCartItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setCart((current) => Math.max(0, current - 1));
  };

  const placeOrder = async () => {
    if (!cartItems.length || isCheckingOut) return;
    const user = window.valCareAuth?.currentUser;
    if (!user || !window.valCareFunctions) {
      setOrderMessage("Please sign in before placing an order.");
      return;
    }
    setIsCheckingOut(true);
    setOrderMessage("");
    try {
      const initializePayment = window.valCareFunctions.httpsCallable("initializePaystackPayment");
      const result = await initializePayment({
        items: cartItems.map(({ id }) => ({ id })),
        currency,
        callbackUrl: `${window.location.origin}${window.location.pathname}`
      });
      window.trackValCareEvent?.("begin_checkout", { value: cartTotal * currencies[currency].rate, currency });
      window.location.assign(result.data.authorizationUrl);
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
  const formatPrice = (amount) => `${currencies[currency].symbol}${(amount * currencies[currency].rate).toFixed(2)}`;

  const updatePassword = async (event) => {
    event.preventDefault();
    if (!password.current || !password.next || password.next !== password.confirm) {
      setPasswordMessage(language === "fr" ? "Vérifiez vos informations." : language === "tw" ? "Yɛsrɛ sɛ hwɛ wo nsɛm no mu." : "Check your password details.");
      return;
    }
    if (!window.valCareAuth?.currentUser) {
      setPasswordMessage(language === "fr" ? "Connectez-vous pour changer votre mot de passe." : language === "tw" ? "Yɛsrɛ sɛ login ansa na woasesa password." : "Sign in to change your password.");
      return;
    }
    try {
      const user = window.valCareAuth.currentUser;
      if (!user.email) throw { code: "auth/provider-not-password" };
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, password.current);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(password.next);
    } catch (error) {
      setPasswordMessage(error.code === "auth/provider-not-password" ? "This account uses Google sign-in. Reauthenticate with Google to change its security details." : error.code === "auth/wrong-password" || error.code === "auth/invalid-credential" ? "The current password is incorrect." : error.code === "auth/requires-recent-login" ? "Please sign in again before changing your password." : "Password update failed. Please try again.");
      return;
    }
    setPassword({ current: "", next: "", confirm: "" });
    setPasswordMessage(language === "fr" ? "Mot de passe mis à jour." : language === "tw" ? "Wɔasesa password no." : "Password updated successfully.");
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
      const product = { id: productId, name: productForm.name.trim(), category: productForm.category, price, stock, icon: productForm.icon.trim() || "✨", tone: productForm.tone, tag: productForm.tag.trim(), imageUrl, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await window.valCareDb.collection("products").doc(String(productId)).set(product, { merge: true });
      setProducts((current) => productForm.id
        ? current.map((item) => String(item.id) === String(productId) ? { ...item, ...product } : item)
        : [...current, product]);
      setProductMessage(productForm.id ? "Product updated." : "Product added to the shop.");
      resetProductForm();
    } catch (error) {
      setProductMessage("Could not save this product. Check your admin access and try again.");
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
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setProductMessage("Choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setIsUploadingImage(true);
    setProductMessage("");
    try {
      const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-");
      const path = `productImages/${user.uid}/${Date.now()}-${safeName}`;
      const snapshot = await window.valCareStorage.ref(path).put(file, { contentType: file.type });
      const imageUrl = await snapshot.ref.getDownloadURL();
      setProductForm((current) => ({ ...current, imageUrl }));
      setProductMessage("Image uploaded. Save the product to apply it.");
    } catch (error) {
      console.error("Product image upload failed", error);
      setProductMessage("Image upload failed. Check Storage access and try again.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  const createAccount = async (event) => {
    event.preventDefault();
    if (adminMode && account.email.trim().toLowerCase() !== adminBootstrapEmail) {
      setAccountMessage(`The one-time admin account must use ${adminBootstrapEmail}.`);
      return;
    }
    if (!account.name.trim() || !account.email || !account.password || account.password !== account.confirm) {
      setAccountMessage("Enter your name, a valid email, and make sure both passwords match.");
      return;
    }
    if (!window.valCareAuth) {
      setAccountMessage("Account creation is unavailable right now. Please try again.");
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
      setUserName(account.name.trim());
      setAccount({ name: "", email: "", password: "", confirm: "" });
      setAccountMessage("");
      setActivePanel(null);
    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "An account already exists for this email.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/weak-password": "Use a stronger password with at least 6 characters.",
        "auth/operation-not-allowed": "Email account creation is disabled. Enable Email/Password in Firebase Authentication settings.",
        "auth/network-request-failed": "Could not reach Firebase. Check your internet connection and try again."
      };
      setAccountMessage(messages[error.code] || (adminMode ? "Account created, but the admin request could not be saved. Check your Firestore rules." : "Account creation failed. Check your Firebase Authentication settings and try again."));
    }
  };

  const login = async (event) => {
    event.preventDefault();
    if (!window.valCareAuth) {
      setAccountMessage("Sign in is unavailable right now. Please try again.");
      return;
    }
    try {
      await window.valCareAuth.signInWithEmailAndPassword(account.email, account.password);
      setAccount({ name: "", email: "", password: "", confirm: "" });
      setAccountMessage("");
      setActivePanel(null);
    } catch (error) {
      setAccountMessage("Email or password is incorrect. Please try again.");
    }
  };

  const signInWithProvider = async (providerName) => {
    if (window.location.protocol === "file:") {
      setAccountMessage("Social sign-in requires a web address. Open http://localhost:5500/ instead of opening index.html directly.");
      return;
    }
    if (!window.valCareAuth) {
      setAccountMessage(`${providerName} sign-in is unavailable right now. Please try again.`);
      return;
    }
    try {
      const providers = {
        Google: () => new firebase.auth.GoogleAuthProvider()
      };
      const provider = providers[providerName]();
      await window.valCareAuth.signInWithPopup(provider);
      setAccountMessage("");
      setActivePanel(null);
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
    await window.valCareAuth?.signOut();
    setActivePanel(null);
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
    <>
      <div className="announcement">Free delivery on UCC campus.</div>
      <header className="navbar">
        <a className="logo" href="#top" aria-label="Val's Glam Accessories home"><img className="brand-logo" src="vals.jpg" alt="Val's Glam Accessories" /><span className="logo-name">Val's Glam Accessories</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#shop">Shop all</a><a href="#shop">Beauty</a><a href="#shop">Lifestyle</a><a href="#about">Our story</a><a href="#locations">Locate us</a>
        </nav>
        <div className="nav-actions">
          {userName ? <button className={`user-name ${isAdmin ? "admin-user-name" : ""}`} onClick={() => setActivePanel(isAdmin ? "inventory" : "settings")} aria-label={isAdmin ? "Open admin dashboard" : "Open account settings"}><span className="user-avatar">{userName.charAt(0).toUpperCase()}</span><span className="user-identity"><span className="user-display-name">{userName}</span>{isAdmin && <small>Admin</small>}</span></button> : <button className="login-link" onClick={() => { setAuthMode("login"); setAccountMessage(""); setActivePanel("auth"); }}>Log in</button>}
          <button className="icon-button" aria-label="Search products" onClick={() => document.getElementById("product-search").focus()}><SearchIcon /></button>
          <button className="icon-button panel-trigger" aria-label="View notifications" onClick={() => setActivePanel("notifications")}><BellIcon /><span className="notification-dot" /></button>
          <button className="icon-button" aria-label="Open settings" onClick={() => setActivePanel("settings")}><SettingsIcon /></button>
          {isAdmin && <button className="icon-button admin-inventory-icon" aria-label="Manage products and stock" onClick={() => { resetProductForm(); setActivePanel("inventory"); }}>✦</button>}
          <button className="icon-button" aria-label={`${cart} items in bag`} onClick={() => setActivePanel("cart")}><BagIcon /><span className="cart-count">{cart}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Small things, soft moments</p>
            <h1>Little luxuries for <em>lovely</em> days.</h1>
            <p className="hero-text">Thoughtful accessories and feel-good finds to make your everyday a little more beautiful.</p>
            <a className="primary-button" href="#shop">Explore the collection</a>
          </div>
          <div className="hero-art"><span className="hero-bubble bubble-one" aria-hidden="true" /><span className="hero-bubble bubble-two" aria-hidden="true" /><span className="hero-bubble bubble-three" aria-hidden="true" /><span className="hero-shape shape-ring" aria-hidden="true" /><span className="hero-shape shape-spark" aria-hidden="true" /><img className="hero-photo" src="image.png" alt="Woman applying skincare" /></div>
        </section>

        <section className="section" id="shop">
          <div className="section-heading"><h2>Shop the <em>edit</em></h2><a className="view-all" href="#shop">View all pieces ↗</a></div>
          <input id="product-search" className="product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" aria-label="Search products" />
          <div className="category-row" role="tablist" aria-label="Product categories">
            {categories.map((category) => <button key={category} className={`category ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-image ${product.tone}`}>{product.imageUrl ? <img src={product.imageUrl} alt="" /> : <span>{product.icon}</span>}{product.tag && <span className="badge">{product.tag}</span>}</div>
                <div className="product-info"><h3>{product.name}</h3><div className="product-bottom"><span className="price">{formatPrice(product.price)}</span><span className={`stock-label ${product.stock === 0 ? "out-of-stock" : ""}`}>{product.stock === 0 ? "Sold out" : `${product.stock} left`}</span><button className="review-button" onClick={() => openReviews(product)}>Reviews</button><button className="add-button" onClick={() => addToBag(product)} disabled={product.stock === 0}>+ Add to bag</button></div></div>
              </article>
            ))}
            {!filteredProducts.length && <p className="empty">Nothing found just yet. Try another little search.</p>}
          </div>
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
          <h2>A little note from us</h2>
          <p>New drops, sweet offers, and good things in your inbox.</p>
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
      {activePanel && <div className="panel-backdrop" onClick={closePanel}>
        <aside className={`account-panel theme-${theme}`} onClick={(event) => event.stopPropagation()}>
          <div className="panel-header"><div><p className="eyebrow">ValCare account</p><h2>{activePanel === "cart" ? text.cart : activePanel === "notifications" ? text.notifications : activePanel === "transactions" ? text.transactions : activePanel === "reviews" ? "Product reviews" : activePanel === "inventory" ? "Manage products" : activePanel === "create-account" || (activePanel === "auth" && authMode === "create") ? "Create your account" : activePanel === "auth" ? "Log in" : text.settings}</h2></div><button className="close-button" onClick={closePanel} aria-label="Close panel">×</button></div>
          {(activePanel === "create-account" || activePanel === "auth") && <div className="panel-content account-form"><p className="account-intro">{authMode === "create" ? adminMode ? "Create the store admin account. Admin access must be approved securely in Firebase." : "Create your account to collect your ValCare finds." : "Log in to continue shopping and manage your account."}</p><div className="social-auth-grid"><button className="social-auth-button google-auth-button" type="button" onClick={() => signInWithProvider("Google")}><ProviderLogo name="Google" />Continue with Google</button></div><div className="form-divider"><span>or use email</span></div><form onSubmit={authMode === "create" ? createAccount : login}>{authMode === "create" && <input type="text" placeholder="Your name" value={account.name} onChange={(event) => setAccount({ ...account, name: event.target.value })} required />}<input type="email" placeholder="Email address" value={account.email} onChange={(event) => setAccount({ ...account, email: event.target.value })} required /><input type="password" placeholder="Password" value={account.password} onChange={(event) => setAccount({ ...account, password: event.target.value })} minLength="6" required />{authMode === "create" && <input type="password" placeholder="Confirm password" value={account.confirm} onChange={(event) => setAccount({ ...account, confirm: event.target.value })} minLength="6" required />}<button className="settings-save" type="submit">{authMode === "create" ? adminMode ? "Create admin account" : "Create account" : "Log in"}</button>{accountMessage && <small className="password-message">{accountMessage}</small>}</form><button className="auth-switch" type="button" onClick={() => { setAuthMode(authMode === "create" ? "login" : "create"); setAdminMode(false); setAccountMessage(""); }}>{authMode === "create" ? "Already have an account? Log in" : "New to ValCare? Create an account"}</button>{authMode === "create" && <button className="admin-setup-link" type="button" onClick={() => { setAdminMode(!adminMode); setAccountMessage(""); }}>{adminMode ? "Use regular account creation" : "Set up the one-time store admin account"}</button>}</div>}
          {activePanel === "cart" && <div className="panel-content">
            {orderPlaced && <div className="success-message">Order received. We’ll be in touch shortly.</div>}
            {!cartItems.length && !orderPlaced && <div className="panel-empty"><BagIcon /><p>Your cart is waiting for something lovely.</p><a href="#shop" onClick={closePanel}>Continue shopping</a></div>}
            {cartItems.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><div className={`cart-thumb ${product.tone}`}>{product.icon}</div><div><strong>{product.name}</strong><span>{formatPrice(product.price)}</span></div><button className="remove-item" onClick={() => removeFromBag(index)} aria-label={`Remove ${product.name}`} title={`Remove ${product.name}`}>×</button></div>)}
            {!!cartItems.length && <><div className="cart-total"><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><button className="primary-button checkout-button" onClick={placeOrder} disabled={isCheckingOut}>{isCheckingOut ? "Opening secure payment..." : "Pay securely with Paystack"}</button></>}
            {orderMessage && <small className="password-message order-message">{orderMessage}</small>}
          </div>}
          {activePanel === "notifications" && <div className="panel-content notification-list"><div className="notice-item"><span className="notice-mark">✦</span><div><strong>Welcome to ValCare</strong><p>New little luxuries have landed in the shop.</p><small>Today</small></div></div><div className="notice-item"><span className="notice-mark">$</span><div><strong>Free delivery on UCC campus</strong><p>Enjoy delivery on your next ValCare order.</p><small>Yesterday</small></div></div></div>}
          {activePanel === "transactions" && <div className="panel-content"><div className="transaction-card"><div><strong>VC-1042</strong><span>Aug 28, 2026 · 2 items</span></div><strong>{formatPrice(34)}</strong><em>Delivered</em></div><div className="transaction-card"><div><strong>VC-0987</strong><span>Jul 14, 2026 · 1 item</span></div><strong>{formatPrice(18)}</strong><em>Delivered</em></div><div className="panel-empty"><p>Your purchases will appear here after checkout.</p></div></div>}
          {activePanel === "reviews" && selectedProduct && <div className="panel-content reviews-panel"><div className="reviews-product"><span className={`cart-thumb ${selectedProduct.tone}`}>{selectedProduct.icon}</span><div><strong>{selectedProduct.name}</strong><span>{formatPrice(selectedProduct.price)}</span></div></div><div className="review-list">{reviews.length ? reviews.map((review) => <article className="review-item" key={review.id}><div className="review-meta"><strong>{review.userName}</strong><span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span></div><p>{review.comment}</p></article>) : <p className="review-empty">No reviews yet. Be the first to share your thoughts.</p>}</div><form className="review-form" onSubmit={submitReview}><label htmlFor="review-rating">Your rating</label><select id="review-rating" value={reviewRating} onChange={(event) => setReviewRating(event.target.value)}><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select><textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Share your thoughts" maxLength="500" required /><button className="settings-save" type="submit" disabled={isSubmittingReview}>{isSubmittingReview ? "Saving review..." : "Add review"}</button>{reviewMessage && <small className="password-message">{reviewMessage}</small>}</form></div>}
          {activePanel === "settings" && <div className="panel-content settings-list">
            <div className="setting-control"><label htmlFor="currency">{text.currency}</label><select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>{Object.keys(currencies).map((code) => <option key={code} value={code}>{code} ({currencies[code].symbol})</option>)}</select></div>
            <div className="setting-control"><label htmlFor="language">{text.language}</label><select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="en">English</option><option value="tw">Twi</option><option value="fr">Français</option></select></div>
            <div className="setting-control"><label htmlFor="theme">{text.theme}</label><select id="theme" value={theme} onChange={(event) => setTheme(event.target.value)}><option value="light">{text.light}</option><option value="dark">{text.dark}</option><option value="system">{text.system}</option></select></div>
            <div className="motion-control"><label htmlFor="cosmetic-motion">Cosmetic animations</label><input id="cosmetic-motion" type="range" min="0" max="100" step="5" value={cosmeticMotion} onChange={(event) => setCosmeticMotion(Number(event.target.value))} /><small>{cosmeticMotion === 0 ? "Off" : `${cosmeticMotion}% intensity`}</small></div>
            <label><span><strong>{text.orderUpdates}</strong><small>Get delivery and order notifications</small></span><input type="checkbox" checked={preferences.updates} onChange={() => setPreferences((current) => ({ ...current, updates: !current.updates }))} /></label><label><span><strong>{text.offers}</strong><small>Hear about fresh ValCare finds</small></span><input type="checkbox" checked={preferences.offers} onChange={() => setPreferences((current) => ({ ...current, offers: !current.offers }))} /></label>
            <form className="password-form" onSubmit={updatePassword}><h3>{text.password}</h3><input type="password" placeholder="Current password" value={password.current} onChange={(event) => setPassword({ ...password, current: event.target.value })} required /><input type="password" placeholder="New password" value={password.next} onChange={(event) => setPassword({ ...password, next: event.target.value })} required /><input type="password" placeholder="Confirm new password" value={password.confirm} onChange={(event) => setPassword({ ...password, confirm: event.target.value })} required /><button className="settings-save" type="submit">{text.save}</button>{passwordMessage && <small className="password-message">{passwordMessage}</small>}</form>
            {isAdmin && <form className="password-form admin-security-form" onSubmit={updateAdminEmail}><h3>Admin email</h3><p className="account-intro">Changing the admin email requires your current password.</p><input type="email" placeholder="New admin email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} required /><input type="password" placeholder="Current password" value={emailPassword} onChange={(event) => setEmailPassword(event.target.value)} required /><button className="settings-save" type="submit">Update admin email</button>{emailMessage && <small className="password-message">{emailMessage}</small>}</form>}
            <button className="settings-link" onClick={() => setActivePanel("transactions")}>{text.viewTransactions} <span>↗</span></button><button className="settings-logout" onClick={logOut}>Log out</button>
          </div>}
          {activePanel === "inventory" && isAdmin && <div className="panel-content inventory-panel"><p className="account-intro">Update prices, add new items, and keep stock levels current.</p><form className="product-admin-form" onSubmit={saveProduct}><input placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} required /><div className="admin-form-row"><select value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}><option>Beauty</option><option>Accessories</option><option>Home</option><option>Lifestyle</option></select><input type="number" min="0" step="0.01" placeholder="Price" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} required /><input type="number" min="0" step="1" placeholder="Stock" value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} required /></div><div className="admin-form-row"><input placeholder="Icon emoji" value={productForm.icon} onChange={(event) => setProductForm({ ...productForm, icon: event.target.value })} /><select value={productForm.tone} onChange={(event) => setProductForm({ ...productForm, tone: event.target.value })}><option value="tone-rose">Rose</option><option value="tone-sage">Sage</option><option value="tone-yellow">Yellow</option><option value="tone-lilac">Lilac</option><option value="tone-blue">Blue</option><option value="tone-peach">Peach</option><option value="tone-pink">Pink</option><option value="tone-green">Green</option></select><input placeholder="Tag (optional)" value={productForm.tag} onChange={(event) => setProductForm({ ...productForm, tag: event.target.value })} /></div><div className="admin-form-actions"><button className="settings-save" type="submit" disabled={isSavingProduct}>{isSavingProduct ? "Saving..." : productForm.id ? "Update product" : "Add product"}</button>{productForm.id && <button className="settings-link" type="button" onClick={resetProductForm}>Cancel edit</button>}</div>{productMessage && <small className="password-message">{productMessage}</small>}</form><div className="inventory-list">{products.map((product) => <button className="inventory-item" key={product.id} type="button" onClick={() => editProduct(product)}><span className={`cart-thumb ${product.tone}`}>{product.icon}</span><span><strong>{product.name}</strong><small>{formatPrice(product.price)} · {product.stock} in stock</small></span><em>Edit</em></button>)}</div></div>}
          {activePanel === "inventory" && isAdmin && <div className="product-image-url-field"><label htmlFor="product-image-file">Product picture</label><input id="product-image-file" type="file" accept="image/*" capture="environment" onChange={uploadProductImage} disabled={isUploadingImage} /><small>{isUploadingImage ? "Uploading image..." : productForm.id ? "Choose a replacement picture from your phone or camera." : "Choose a picture from your phone or camera."}</small><label htmlFor="product-image-url">Image URL</label><input id="product-image-url" type="url" placeholder="https://..." value={productForm.imageUrl} onChange={(event) => setProductForm({ ...productForm, imageUrl: event.target.value })} /></div>}
        </aside>
      </div>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
