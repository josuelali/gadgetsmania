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
    listGadget: "Add your gadget",
    eyebrow: "THE LIVE BATTLE FOR #1",
    heroLine1: "YOUR BOOST.",
    heroLine2: "YOUR POSITION.",
    heroCopy:
      "A transparent gadget leaderboard where verified paid boosts decide the order. Add your gadget, beat the score above you and fight for #1.",
    explore: "See who is #1",
    joinBattle: "Compete now",
    verified: "Verified Stripe payments",
    transparent: "Money decides the order",
    oneTime: "One-time payments",
    rankingLabel: "LIVE COMPETITIVE RANKING",
    rankingTitle: "Beat the score above you",
    rankingNote:
      "Every completed Stripe payment adds to that gadget's score. Higher verified total = higher position. Editorial starters remain at €0 until boosted.",
    today: "Today",
    allTime: "All time",
    search: "Search gadgets",
    allCategories: "All categories",
    loading: "Loading live ranking…",
    howLabel: "NO MYSTERY",
    howTitle: "How to take a higher position",
    step1Title: "Add or choose",
    step1Copy:
      "Add your gadget or choose one already in the ranking.",
    step2Title: "Beat the score",
    step2Copy:
      "Paid boosts start at €10. Each verified payment adds to the gadget's ranking score.",
    step3Title: "Climb instantly",
    step3Copy:
      "The highest verified total ranks first. If someone passes you, boost again to take the position back.",
    ctaOverline: "DO YOU SELL OR BUILD A GADGET?",
    ctaTitle: "Put it in the ranking.<br>Fight for #1.",
    submitNow: "Add my gadget",
    footerCopy:
      "Independent gadget discovery and a transparent ranking powered by verified paid boosts.",
    terms: "Terms & ranking rules",
    privacy: "Privacy",
    contact: "Contact",
    affiliate: "Some editorial links may be affiliate links.",
    formKicker: "COMPETE FOR VISIBILITY",
    formTitle: "Add or boost a gadget",
    formIntro:
      "This is a paid ranking boost, not a subscription. Completed payments add directly to the gadget's verified score.",
    productName: "Product name",
    productUrl: "Public product URL",
    imageUrl: "Image URL (optional)",
    categoryLabel: "Category",
    description: "Short description",
    email: "Contact email",
    boostAmount: "Paid boost amount",
    acceptRules: "I accept the",
    rulesLink: "ranking rules and terms",
    continueCheckout: "Pay securely with Stripe",
    testNotice: "Live payment: Stripe will charge the amount shown after confirmation.",
    editorial: "Editorial starter · €0 paid",
    paidBoost: "Verified paid total",
    view: "Visit gadget ↗",
    boost: "Boost this gadget",
    defend: "Defend #1",
    overtake: "Take #{rank}",
    empty: "No gadgets match these filters.",
    preview: "Showing editorial preview — live database unavailable.",
    results: "gadgets ranked",
    dailyCloses: "TODAY'S RANKING CLOSES IN",
    dailyReset: "Daily ranking resets at 00:00 UTC. All-time ranking keeps accumulating.",
    checkoutError:
      "Checkout could not be created. Please review the details and try again.",
  },
  es: {
    navRanking: "Ranking",
    navGuides: "Guías",
    navRules: "Reglas",
    listGadget: "Añadir mi gadget",
    eyebrow: "LA BATALLA EN VIVO POR EL #1",
    heroLine1: "TU IMPULSO.",
    heroLine2: "TU POSICIÓN.",
    heroCopy:
      "Un ranking transparente de gadgets donde los impulsos de pago verificados deciden el orden. Añade tu gadget, supera la puntuación de arriba y compite por el #1.",
    explore: "Ver quién es #1",
    joinBattle: "Competir ahora",
    verified: "Pagos verificados por Stripe",
    transparent: "El dinero decide el orden",
    oneTime: "Pagos únicos",
    rankingLabel: "RANKING COMPETITIVO EN VIVO",
    rankingTitle: "Supera la puntuación de arriba",
    rankingNote:
      "Cada pago completado en Stripe suma a la puntuación de ese gadget. Mayor total verificado = mejor posición. Los productos editoriales empiezan en 0 € hasta recibir un impulso.",
    today: "Hoy",
    allTime: "Histórico",
    search: "Buscar gadgets",
    allCategories: "Todas las categorías",
    loading: "Cargando ranking en vivo…",
    howLabel: "SIN MISTERIOS",
    howTitle: "Cómo conquistar una posición superior",
    step1Title: "Añade o elige",
    step1Copy:
      "Añade tu gadget o elige uno que ya esté dentro del ranking.",
    step2Title: "Supera la puntuación",
    step2Copy:
      "Los impulsos de pago empiezan en 10 €. Cada pago verificado suma a la puntuación del gadget.",
    step3Title: "Sube al instante",
    step3Copy:
      "El mayor total verificado ocupa el primer puesto. Si alguien te supera, puedes volver a impulsar para recuperar la posición.",
    ctaOverline: "¿VENDES O HAS CREADO UN GADGET?",
    ctaTitle: "Mételo en el ranking.<br>Compite por el #1.",
    submitNow: "Añadir mi gadget",
    footerCopy:
      "Descubrimiento independiente y un ranking transparente impulsado por pagos verificados.",
    terms: "Términos y reglas",
    privacy: "Privacidad",
    contact: "Contacto",
    affiliate: "Algunos enlaces editoriales pueden ser de afiliado.",
    formKicker: "COMPITE POR VISIBILIDAD",
    formTitle: "Añade o impulsa un gadget",
    formIntro:
      "Es un impulso de ranking de pago, no una suscripción. Cada pago completado suma directamente a la puntuación verificada del gadget.",
    productName: "Nombre del producto",
    productUrl: "URL pública del producto",
    imageUrl: "URL de imagen (opcional)",
    categoryLabel: "Categoría",
    description: "Descripción breve",
    email: "Email de contacto",
    boostAmount: "Importe del impulso de pago",
    acceptRules: "Acepto las",
    rulesLink: "reglas del ranking y condiciones",
    continueCheckout: "Pagar de forma segura con Stripe",
    testNotice: "Pago Live: Stripe cobrará el importe mostrado después de confirmarlo.",
    editorial: "Selección editorial · 0 € pagados",
    paidBoost: "Total pagado verificado",
    view: "Visitar gadget ↗",
    boost: "Impulsar este gadget",
    defend: "Defender #1",
    overtake: "Conquistar #{rank}",
    empty: "No hay gadgets para estos filtros.",
    preview: "Vista editorial — base de datos en vivo no disponible.",
    results: "gadgets clasificados",
    dailyCloses: "EL RANKING DE HOY CIERRA EN",
    dailyReset: "El ranking diario se reinicia a las 00:00 UTC. El histórico sigue acumulando.",
    checkoutError:
      "No se pudo crear el pago. Revisa los datos e inténtalo de nuevo.",
  },
};

let language = localStorage.getItem("gm_language") || "en",
  period = "daily",
  requestController,
  lastEntries = [];
const $ = (selector) => document.querySelector(selector);
const t = (key) => copy[language][key] || key;

function formatEuros(cents) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

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
  updateCountdown();
}

function requiredBoost(entries, index) {
  if (index === 0) return 1000;
  const current = Number(entries[index]?.paidCents || 0);
  const target = Number(entries[index - 1]?.paidCents || 0);
  return Math.max(1000, target - current + 100);
}

function render(entries) {
  lastEntries = entries;
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
    amount.textContent = formatEuros(entry.paidCents);
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
    const needed = requiredBoost(entries, index);
    const action =
      index === 0
        ? t("defend")
        : t("overtake").replace("{rank}", String(index));
    boost.textContent = `${action} · ${formatEuros(needed)}`;
    boost.setAttribute(
      "aria-label",
      `${action}. ${t("boostAmount")}: ${formatEuros(needed)}`,
    );
    boost.addEventListener("click", () => openDialog(entry, needed));
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

function openDialog(entry, suggestedCents) {
  const form = $("#boost-form");
  form.reset();
  let suggested = suggestedCents;
  if (!entry && !suggested) {
    const topScore = Number(lastEntries[0]?.paidCents || 0);
    suggested = Math.max(1000, topScore + 100);
  }
  form.elements.amount.value = String(Math.max(10, Math.ceil((suggested || 1000) / 100)));
  form.elements.entryId.value = entry?.id || "";
  $("#new-entry-fields").classList.toggle("hidden", Boolean(entry));
  $("#new-entry-fields")
    .querySelectorAll("input,select,textarea")
    .forEach((field) => (field.required = !entry && field.name !== "imageUrl"));
  $("#form-error").textContent = "";
  $("#submit-dialog").showModal();
}

function updateCountdown() {
  const timer = $("#daily-countdown");
  const label = $("#daily-countdown-label");
  const note = $("#daily-countdown-note");
  if (!timer || !label || !note) return;
  const now = new Date();
  const nextUtcMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
  );
  const remaining = Math.max(0, nextUtcMidnight - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  label.textContent = t("dailyCloses");
  timer.textContent = `${hours}:${minutes}:${seconds}`;
  note.textContent = t("dailyReset");
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
updateCountdown();
setInterval(updateCountdown, 1000);
loadRanking();
