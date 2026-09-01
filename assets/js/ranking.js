const fallback = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    name: "INIU 25,000 mAh Power Bank",
    websiteUrl: "/mejor-power-bank-25000mah/",
    imageUrl: "/assets/img/products/powerbank-iniu.jpg",
    description: "Editorial pick for high-capacity portable power and travel.",
    category: "mobile",
    isCurated: true,
    paidCents: 0,
    boostCount: 0,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    name: "Fire TV Stick 4K",
    websiteUrl: "/reviews/gadgets-curiosos-amazon/",
    imageUrl: "/assets/img/products/fire-tv-stick-4k.jpg",
    description:
      "Editorial pick for simple 4K streaming and smart-home setups.",
    category: "home",
    isCurated: true,
    paidCents: 0,
    boostCount: 0,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    name: "Ergonomic Vertical Mouse",
    websiteUrl: "/mejor-raton-vertical-ergonomico/",
    imageUrl: "/assets/img/products/raton_ergonomico_3.jpg",
    description:
      "Editorial pick for a more comfortable desk and long work sessions.",
    category: "accessories",
    isCurated: true,
    paidCents: 0,
    boostCount: 0,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    name: "Creator USB Microphone",
    websiteUrl: "/reviews/mejor-microfono-usb-calidad-precio/",
    imageUrl: "/assets/img/products/microfono_3.jpg",
    description: "Editorial pick for podcasts, streaming and clear calls.",
    category: "creator",
    isCurated: true,
    paidCents: 0,
    boostCount: 0,
  },
];

const copy = {
  en: {
    navRanking: "Ranking",
    navGuides: "Guides",
    navRules: "Rules",
    listGadget: "List a gadget",
    eyebrow: "THE LIVE BATTLE FOR ATTENTION",
    heroLine1: "THE WORLD'S GADGETS.",
    heroLine2: "RANKED BY MOMENTUM.",
    heroCopy:
      "A transparent leaderboard where useful tech earns the spotlight. Discover what's rising, submit your gadget, or boost the products you believe in.",
    explore: "Explore the ranking",
    joinBattle: "Join the battle",
    verified: "Verified Stripe boosts",
    transparent: "Transparent scores",
    oneTime: "One-time payments",
    rankingLabel: "GLOBAL LEADERBOARD",
    rankingTitle: "What's winning attention",
    rankingNote:
      "Paid totals include completed, verified Stripe payments only. Editorial picks always show €0.",
    today: "Today",
    allTime: "All time",
    search: "Search gadgets",
    allCategories: "All categories",
    loading: "Loading live ranking…",
    howLabel: "ZERO MYSTERY",
    howTitle: "How the leaderboard works",
    step1Title: "Submit or select",
    step1Copy:
      "Add a public gadget page or choose an existing product from the ranking.",
    step2Title: "Choose your boost",
    step2Copy:
      "A boost starts at €10. Checkout is a secure one-time Stripe payment.",
    step3Title: "Climb transparently",
    step3Copy:
      "Only paid boosts count. Highest verified total ranks first for the selected period.",
    ctaOverline: "BUILT SOMETHING PEOPLE SHOULD SEE?",
    ctaTitle: "Put your gadget<br>on the global stage.",
    submitNow: "Submit your gadget",
    footerCopy:
      "Independent gadget discovery, transparent paid boosts and practical buying guides.",
    terms: "Terms & ranking rules",
    privacy: "Privacy",
    contact: "Contact",
    affiliate: "Some editorial links may be affiliate links.",
    formKicker: "JOIN THE RANKING",
    formTitle: "List or boost a gadget",
    formIntro:
      "No subscription. Your position is based on verified paid boosts.",
    productName: "Product name",
    productUrl: "Public product URL",
    imageUrl: "Image URL (optional)",
    categoryLabel: "Category",
    description: "Short description",
    email: "Contact email",
    boostAmount: "Boost amount",
    acceptRules: "I accept the",
    rulesLink: "ranking rules and terms",
    continueCheckout: "Continue to secure checkout",
    testNotice: "Test mode: no live charges are enabled yet.",
    editorial: "Editorial pick · no paid boost",
    paidBoost: "Verified paid boosts",
    view: "Visit gadget ↗",
    boost: "Boost position",
    empty: "No gadgets match these filters.",
    preview: "Showing editorial preview — live database unavailable.",
    results: "gadgets ranked",
    checkoutError:
      "Checkout could not be created. Please review the details and try again.",
  },
  es: {
    navRanking: "Ranking",
    navGuides: "Guías",
    navRules: "Reglas",
    listGadget: "Añadir gadget",
    eyebrow: "LA BATALLA EN VIVO POR LA ATENCIÓN",
    heroLine1: "LOS GADGETS DEL MUNDO.",
    heroLine2: "ORDENADOS POR IMPULSO.",
    heroCopy:
      "Un ranking transparente donde la tecnología útil gana visibilidad. Descubre qué está subiendo, presenta tu gadget o impulsa los productos en los que crees.",
    explore: "Explorar el ranking",
    joinBattle: "Entrar en la batalla",
    verified: "Impulsos verificados por Stripe",
    transparent: "Puntuaciones transparentes",
    oneTime: "Pagos únicos",
    rankingLabel: "CLASIFICACIÓN GLOBAL",
    rankingTitle: "Lo que está ganando atención",
    rankingNote:
      "Los totales de pago solo incluyen pagos completados y verificados por Stripe. La selección editorial siempre muestra 0 €.",
    today: "Hoy",
    allTime: "Histórico",
    search: "Buscar gadgets",
    allCategories: "Todas las categorías",
    loading: "Cargando ranking en vivo…",
    howLabel: "SIN MISTERIOS",
    howTitle: "Cómo funciona el ranking",
    step1Title: "Añade o selecciona",
    step1Copy:
      "Añade una página pública de tu gadget o elige un producto que ya esté en el ranking.",
    step2Title: "Elige tu impulso",
    step2Copy:
      "Los impulsos empiezan en 10 €. Checkout seguro y pago único con Stripe.",
    step3Title: "Sube con transparencia",
    step3Copy:
      "Solo cuentan los pagos verificados. El mayor total ocupa la primera posición del periodo.",
    ctaOverline: "¿HAS CREADO ALGO QUE DEBERÍA VERSE?",
    ctaTitle: "Pon tu gadget<br>en el escenario global.",
    submitNow: "Presentar mi gadget",
    footerCopy:
      "Descubrimiento independiente, impulsos de pago transparentes y guías prácticas de compra.",
    terms: "Términos y reglas",
    privacy: "Privacidad",
    contact: "Contacto",
    affiliate: "Algunos enlaces editoriales pueden ser de afiliado.",
    formKicker: "ENTRA EN EL RANKING",
    formTitle: "Añade o impulsa un gadget",
    formIntro:
      "Sin suscripción. La posición depende de impulsos de pago verificados.",
    productName: "Nombre del producto",
    productUrl: "URL pública del producto",
    imageUrl: "URL de imagen (opcional)",
    categoryLabel: "Categoría",
    description: "Descripción breve",
    email: "Email de contacto",
    boostAmount: "Importe del impulso",
    acceptRules: "Acepto las",
    rulesLink: "reglas del ranking y condiciones",
    continueCheckout: "Continuar al pago seguro",
    testNotice: "Modo de prueba: todavía no hay cobros reales activados.",
    editorial: "Selección editorial · sin pago",
    paidBoost: "Impulsos de pago verificados",
    view: "Visitar gadget ↗",
    boost: "Impulsar posición",
    empty: "No hay gadgets para estos filtros.",
    preview: "Vista editorial — base de datos en vivo no disponible.",
    results: "gadgets clasificados",
    checkoutError:
      "No se pudo crear el pago. Revisa los datos e inténtalo de nuevo.",
  },
};

let language = localStorage.getItem("gm_language") || "en",
  period = "daily",
  requestController;
const $ = (selector) => document.querySelector(selector);
const t = (key) => copy[language][key] || key;

function translate() {
  document.documentElement.lang = language;
  $("#language").textContent = language === "en" ? "ES" : "EN";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.dataset.i18n);
    if (el.dataset.i18n === "ctaTitle") el.innerHTML = value;
    else el.textContent = value;
  });
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
}

function render(entries) {
  const list = $("#ranking-list");
  list.replaceChildren();
  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = t("empty");
    list.append(empty);
    return;
  }
  entries.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "rank-card";
    const number = document.createElement("div");
    number.className = "rank-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const image = document.createElement("img");
    image.className = "rank-image";
    image.src = entry.imageUrl || "/assets/img/logo-gadgetsmania2.png";
    image.alt = "";
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";
    image.addEventListener(
      "error",
      () => {
        image.src = "/assets/img/logo-gadgetsmania2.png";
      },
      { once: true },
    );
    const info = document.createElement("div");
    info.className = "rank-info";
    const meta = document.createElement("div");
    meta.className = "rank-meta";
    const category = document.createElement("span");
    category.className = "tag";
    category.textContent = entry.category;
    meta.append(category);
    if (entry.isCurated) {
      const curated = document.createElement("span");
      curated.className = "tag curated";
      curated.textContent = t("editorial");
      meta.append(curated);
    }
    const title = document.createElement("h3");
    title.textContent = entry.name;
    const desc = document.createElement("p");
    desc.textContent = entry.description;
    info.append(meta, title, desc);
    const score = document.createElement("div");
    score.className = "rank-score";
    const label = document.createElement("small");
    label.textContent =
      entry.isCurated && entry.paidCents === 0
        ? t("editorial")
        : t("paidBoost");
    const amount = document.createElement("strong");
    amount.textContent = new Intl.NumberFormat(language, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(entry.paidCents / 100);
    if (!entry.paidCents) amount.className = "zero";
    score.append(label, amount);
    const view = document.createElement("a");
    view.className = "view-link";
    view.href =
      entry.websiteUrl && entry.id.startsWith("00000000-")
        ? entry.websiteUrl
        : `/api/click/${encodeURIComponent(entry.id)}`;
    view.target = "_blank";
    view.rel = "noopener noreferrer";
    view.textContent = t("view");
    const boost = document.createElement("button");
    boost.className = "boost";
    boost.type = "button";
    boost.textContent = t("boost");
    boost.addEventListener("click", () => openDialog(entry));
    card.append(number, image, info, score, view, boost);
    list.append(card);
  });
}

async function loadRanking() {
  requestController?.abort();
  requestController = new AbortController();
  $("#ranking-status").textContent = t("loading");
  const params = new URLSearchParams({ period });
  const category = $("#category").value,
    search = $("#search").value.trim();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  try {
    const response = await fetch(`/api/rankings?${params}`, {
      signal: requestController.signal,
    });
    if (!response.ok) throw new Error("ranking unavailable");
    const data = await response.json();
    render(data.entries);
    $("#ranking-status").textContent = `${data.entries.length} ${t("results")}`;
  } catch (error) {
    if (error.name === "AbortError") return;
    const filtered = fallback.filter(
      (x) =>
        (!category || x.category === category) &&
        (!search ||
          `${x.name} ${x.description}`
            .toLowerCase()
            .includes(search.toLowerCase())),
    );
    render(filtered);
    $("#ranking-status").textContent = t("preview");
  }
}

function openDialog(entry) {
  const form = $("#boost-form");
  form.reset();
  form.elements.amount.value = "10";
  form.elements.entryId.value = entry?.id || "";
  $("#new-entry-fields").classList.toggle("hidden", Boolean(entry));
  $("#new-entry-fields")
    .querySelectorAll("input,select,textarea")
    .forEach((field) => (field.required = !entry && field.name !== "imageUrl"));
  $("#form-error").textContent = "";
  $("#submit-dialog").showModal();
}

document
  .querySelectorAll("[data-open-submit]")
  .forEach((button) => button.addEventListener("click", () => openDialog()));
$("#dialog-close").addEventListener("click", () => $("#submit-dialog").close());
$("#submit-dialog").addEventListener("click", (event) => {
  if (event.target === $("#submit-dialog")) $("#submit-dialog").close();
});
document.querySelectorAll("[data-period]").forEach((button) =>
  button.addEventListener("click", () => {
    period = button.dataset.period;
    document
      .querySelectorAll("[data-period]")
      .forEach((x) => x.classList.toggle("active", x === button));
    loadRanking();
  }),
);
$("#category").addEventListener("change", loadRanking);
let searchTimer;
$("#search").addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadRanking, 250);
});
$("#language").addEventListener("click", () => {
  language = language === "en" ? "es" : "en";
  localStorage.setItem("gm_language", language);
  translate();
  loadRanking();
});

$("#boost-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const submit = form.querySelector("button[type=submit]");
  submit.disabled = true;
  $("#form-error").textContent = "";
  const values = Object.fromEntries(new FormData(form));
  const key = sessionStorage.getItem("gm_checkout_key") || crypto.randomUUID();
  sessionStorage.setItem("gm_checkout_key", key);
  const payload = {
    idempotencyKey: key,
    entryId: values.entryId || undefined,
    name: values.name || undefined,
    websiteUrl: values.websiteUrl || undefined,
    imageUrl: values.imageUrl || undefined,
    description: values.description || undefined,
    category: values.category || undefined,
    contactEmail: values.contactEmail,
    amountCents: Math.round(Number(values.amount) * 100),
  };
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || t("checkoutError"));
    const checkout = new URL(data.checkoutUrl);
    if (
      checkout.protocol !== "https:" ||
      !(
        checkout.hostname === "checkout.stripe.com" ||
        checkout.hostname.endsWith(".stripe.com")
      )
    )
      throw new Error(t("checkoutError"));
    sessionStorage.removeItem("gm_checkout_key");
    location.assign(checkout.href);
  } catch (error) {
    sessionStorage.removeItem("gm_checkout_key");
    $("#form-error").textContent = error.message || t("checkoutError");
    submit.disabled = false;
  }
});

translate();
loadRanking();
