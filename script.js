const signatures = [
  {
    id: "loaded-fire-chicken",
    name: "Loaded Fire Chicken",
    protein: "Crispy Chicken",
    badge: "★ Bestseller",
    chips: ["Sriracha Mayo + Sriracha Hot", "Jalapeños", "Maïs", "Verse ui", "Kerstomaten"],
    finish: "Crispy Onion + Chili Flakes",
    sizes: { Medium: 14.99, Large: 16.99 },
    images: {
      Medium: "assets/signature-fire-chicken-medium.png",
      Large: "assets/signature-fire-chicken-medium.png"
    }
  },
  {
    id: "loaded-crispy-chicken",
    name: "Loaded Crispy Chicken",
    protein: "Crispy Chicken",
    chips: ["Saus naar keuze", "Verse ui", "Maïs", "Jalapeños", "Komkommer"],
    finish: "Crispy Onion",
    sizes: { Medium: 13.5, Large: 16.5 },
    images: {
      Medium: "assets/signature-crispy-chicken-medium.png",
      Large: "assets/signature-crispy-chicken-large.png"
    }
  },
  {
    id: "loaded-stoofvlees",
    name: "Loaded Stoofvlees",
    protein: "Stoofvlees",
    chips: ["Saus naar keuze", "Maïs", "Rode ui", "Komkommer", "Kerstomaten"],
    finish: "Lente-ui",
    sizes: { Medium: 14.5, Large: 17.5 }
  },
  {
    id: "loaded-kebab",
    name: "Loaded Kebab",
    protein: "Kebab",
    chips: ["Saus naar keuze", "Verse ui", "Jalapeños", "Maïs", "Komkommer"],
    finish: "Chili Flakes",
    sizes: { Medium: 13.5, Large: 16.5 },
    images: {
      Medium: "assets/signature-kebab-medium-new.png",
      Large: "assets/signature-kebab-medium-new.png"
    }
  },
  {
    id: "loaded-chicken-kebab",
    name: "Loaded Chicken Kebab",
    protein: "Chicken Kebab",
    chips: ["Saus naar keuze", "Verse ui", "Maïs", "Jalapeños", "Kerstomaten"],
    finish: "Crispy Onion",
    sizes: { Medium: 13.5, Large: 16.5 },
    images: {
      Medium: "assets/signature-chicken-kebab-medium.png",
      Large: "assets/signature-chicken-kebab-large.png"
    }
  },
  {
    id: "loaded-pulled-chicken",
    name: "Loaded Pulled Chicken",
    protein: "Pulled Chicken",
    chips: ["Saus naar keuze", "Maïs", "Rode ui", "Kerstomaten", "Komkommer"],
    finish: "Crispy Onion",
    sizes: { Medium: 12.5, Large: 15.5 },
    images: {
      Medium: "assets/signature-pulled-chicken-medium.png",
      Large: "assets/signature-pulled-chicken-large.png"
    }
  },
  {
    id: "loaded-falafel",
    name: "Loaded Falafel",
    protein: "Falafel",
    chips: ["Saus naar keuze", "Komkommer", "Kerstomaten", "Rode ui", "Maïs"],
    finish: "Lente-ui",
    sizes: { Medium: 11.5, Large: 14.5 },
    images: {
      Medium: "assets/signature-falafel-medium-new.png",
      Large: "assets/signature-falafel-medium-new.png"
    }
  }
];

const bases = ["Frieten", "Nachos", "Rijst"];
const sauces = ["Looksaus", "Mayo", "Samurai", "Cocktail", "Andalouse", "Curry Sauce", "BBQ Sauce", "Cheddar Sauce", "Sriracha Mayo", "Sriracha Hot"];
const signatureExtras = {
  protein: [
    { name: "Extra Crispy Chicken", price: 1.99 },
    { name: "Extra Kebab", price: 1.99 },
    { name: "Extra Chicken Kebab", price: 1.99 },
    { name: "Extra Pulled Chicken", price: 1.29 },
    { name: "Extra Falafel", price: 1.29 },
    { name: "Extra Stoofvlees", price: 2.49 },
    { name: "Extra Bacon", price: 1.99 }
  ],
  toppings: [
    { name: "Extra geraspte wortel", price: 0.5 },
    { name: "Extra rode ui", price: 0.5 },
    { name: "Extra kerstomaten", price: 0.5 },
    { name: "Extra mais", price: 0.5 },
    { name: "Extra komkommer", price: 0.5 },
    { name: "Extra jalapenos", price: 0.7 }
  ],
  sauces: [
    { name: "Extra looksaus", price: 0.8 },
    { name: "Extra mayo", price: 0.8 },
    { name: "Extra samurai", price: 0.8 },
    { name: "Extra cocktail", price: 0.8 },
    { name: "Extra andalouse", price: 0.8 },
    { name: "Extra curry sauce", price: 0.99 },
    { name: "Extra BBQ sauce", price: 0.99 },
    { name: "Extra cheddar sauce", price: 0.99 },
    { name: "Extra sriracha mayo", price: 0.99 },
    { name: "Extra sriracha hot", price: 0.99 }
  ],
  finish: [
    { name: "Extra crispy onion", price: 0.5 },
    { name: "Extra lente-ui", price: 0.5 },
    { name: "Extra chili flakes", price: 0.5 }
  ]
};
const openingHours = {
  label: "ma-vr 11:00 - 14:00 en 18:00 - 22:00, za 11:00 - 14:00 en 18:00 - 23:00, zondag gesloten",
  orderLabel: "eerste tijdstip: 11:30 en 18:30",
  paymentSchedule: {
    0: [],
    1: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "22:00", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
    ],
    2: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "22:00", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
    ],
    3: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "22:00", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
    ],
    4: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "22:00", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
    ],
    5: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "22:00", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
    ],
    6: [
      { open: "11:00", close: "14:00", openMinutes: 11 * 60, closeMinutes: 14 * 60 },
      { open: "18:00", close: "23:00", openMinutes: 18 * 60, closeMinutes: 23 * 60 }
    ]
  },
  slotSchedule: {
    0: [],
    1: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "21:45", openMinutes: 18 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    2: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "21:45", openMinutes: 18 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    3: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "21:45", openMinutes: 18 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    4: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "21:45", openMinutes: 18 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    5: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "21:45", openMinutes: 18 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    6: [
      { open: "11:30", close: "13:45", openMinutes: 11 * 60 + 30, closeMinutes: 13 * 60 + 45 },
      { open: "18:30", close: "22:45", openMinutes: 18 * 60 + 30, closeMinutes: 22 * 60 + 45 }
    ]
  }
};

const desserts = [
  { id: "tiramisu-classic", name: "Tiramisu Classic", price: 5.5 },
  { id: "tiramisu-biscoff", name: "Tiramisu Biscoff", price: 6.5 },
  { id: "red-velvet-cake", name: "Red Velvet Cake", price: 5.5 },
  { id: "pistachio-cake", name: "Pistachio Cake", price: 5.5 }
];

const drinks = [
  { id: "iced-latte", name: "Iced Latte", price: 5 },
  { id: "iced-matcha-latte", name: "Iced Matcha Latte", price: 6.5 },
  { id: "strawberry-matcha", name: "Strawberry Matcha Latte", price: 7.5 },
  { id: "mango-matcha", name: "Mango Matcha Latte", price: 7.5 },
  { id: "classic-mojito", name: "Classic Mojito", price: 5 },
  { id: "strawberry-mojito", name: "Strawberry Mojito", price: 6 },
  { id: "raspberry-mojito", name: "Raspberry Mojito", price: 6 },
  { id: "kefir-lemon-ginger", name: "Water Kefir — Lemon & Ginger", price: 3 },
  { id: "kefir-raspberry", name: "Water Kefir — Raspberry", price: 3 },
  { id: "kefir-yuzu-lemon", name: "Water Kefir — Yuzu & Lemon", price: 3 },
  { id: "coca-cola", name: "Coca-Cola", price: 2.5 },
  { id: "coca-cola-zero", name: "Coca-Cola Zero", price: 2.6 },
  { id: "sprite", name: "Sprite", price: 2.5 },
  { id: "fanta", name: "Fanta", price: 2.5 }
];

const baseContent = {
  frieten: {
    title: "Frieten",
    image: "assets/make-your-own-bowls.png",
    badge: "The OG",
    copy: "Knapperig gefrituurd, perfect zout, sterk genoeg om de zwaarste topping te dragen zonder zacht te worden."
  },
  nachos: {
    title: "Nachos",
    image: "assets/thumb-nachos.jpg",
    badge: "Crunch",
    copy: "Crunchy, stevig en ideaal voor cheddar, jalapeños en sauslagen met extra bite."
  },
  rijst: {
    title: "Rijst",
    image: "assets/thumb-rijst.jpg",
    badge: "Comfort",
    copy: "Lichter, warm en vullend. De perfecte basis wanneer je bowl meer comfort dan crunch mag hebben."
  }
};

let cart = [];
let editingCartKey = "";

const money = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR"
});

const signatureGrid = document.querySelector("#signatureGrid");
const dessertList = document.querySelector("#dessertList");
const drinkList = document.querySelector("#drinkList");
const navCartTotal = document.querySelector("#navCartTotal");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const orderForm = document.querySelector("#orderForm");
const orderTime = document.querySelector("#orderTime");
const paymentChoice = document.querySelector("#paymentChoice");
const checkoutSubmit = document.querySelector("#checkoutSubmit");
const hoursNote = document.querySelector("#hoursNote");
const openBuilderModalButton = document.querySelector("#openBuilderModal");
const builderModal = document.querySelector("#builderModal");
const builderModalBody = document.querySelector("#builderModalBody");
const signatureModal = document.querySelector("#signatureModal");
const signatureModalTitle = document.querySelector("#signatureModalTitle");
const signatureModalBody = document.querySelector("#signatureModalBody");
const closedModal = document.querySelector("#closedModal");
const closedMessage = document.querySelector("#closedMessage");
const continueBrowsing = document.querySelector("#continueBrowsing");
const locationStatus = document.querySelector("#locationStatus");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function minutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
}

function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function roundUpToQuarter(minutes) {
  return Math.ceil(minutes / 15) * 15;
}

function getMinimumSelectableMinutes() {
  return roundUpToQuarter(getNowMinutes() + 30);
}

function getTodayPeriods() {
  return openingHours.paymentSchedule[new Date().getDay()] || [];
}

function getTodaySlotPeriods() {
  return openingHours.slotSchedule[new Date().getDay()] || [];
}

function isOpenNow() {
  const nowMinutes = getNowMinutes();
  return getTodayPeriods().some((period) => nowMinutes >= period.openMinutes && nowMinutes <= period.closeMinutes);
}

function canAcceptOrdersNow() {
  const periods = getTodayPeriods();
  if (!periods.length) return false;

  const nowMinutes = getNowMinutes();
  const firstOpen = periods[0].openMinutes;
  const lastClose = periods[periods.length - 1].closeMinutes;
  return nowMinutes >= firstOpen && nowMinutes <= lastClose;
}

function isWithinOpeningHours(minutes) {
  return getTodaySlotPeriods().some((period) => minutes >= period.openMinutes && minutes <= period.closeMinutes);
}

function isSelectableOrderTime(minutes) {
  return minutes >= getMinimumSelectableMinutes() && isWithinOpeningHours(minutes);
}

function getNextOpeningText(nowMinutes) {
  const todayNextPeriod = getTodayPeriods().find((period) => nowMinutes < period.openMinutes);
  if (todayNextPeriod) return todayNextPeriod.open;

  const dayNames = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
  const today = new Date().getDay();
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = (today + offset) % 7;
    const periods = openingHours.paymentSchedule[day] || [];
    if (periods.length) return `${dayNames[day]} om ${periods[0].open}`;
  }

  return "onze volgende openingsdag";
}

function renderOrderTimeOptions() {
  const currentValue = orderTime.value;
  const slots = [];
  const periods = getTodaySlotPeriods();
  const minimumMinutes = getMinimumSelectableMinutes();
  periods.forEach((period) => {
    const startMinutes = Math.max(period.openMinutes, minimumMinutes);
    for (let minutes = roundUpToQuarter(startMinutes); minutes <= period.closeMinutes; minutes += 15) {
      slots.push(formatTime(minutes));
    }
  });

  const placeholder = periods.length && slots.length ? "Kies een uur" : "Vandaag geen tijdsloten meer";
  orderTime.innerHTML = `<option value="">${placeholder}</option>${slots.map((slot) => `<option value="${slot}">${slot}</option>`).join("")}`;
  if (slots.includes(currentValue)) {
    orderTime.value = currentValue;
  }
}

function showClosedModalIfNeeded() {
  if (canAcceptOrdersNow()) return;

  const nowMinutes = getNowMinutes();
  const message = `Online bestellen kan opnieuw vanaf ${getNextOpeningText(nowMinutes)}. Je kunt het menu wel al bekijken.`;

  closedMessage.textContent = message;
  closedModal.classList.remove("hidden");
}

function updateLocationStatus() {
  if (!locationStatus) return;
  locationStatus.textContent = canAcceptOrdersNow() ? "Online bestellen open" : "Momenteel gesloten";
}

function updateHoursNote() {
  if (!hoursNote) return;
  hoursNote.classList.toggle("hidden", canAcceptOrdersNow());
}

function addLine(line) {
  const existing = cart.find((item) => item.key === line.key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...line, quantity: 1 });
  }

  renderCart();
  showToast("Toegevoegd aan je order.");
}

function saveCartLine(line) {
  if (!editingCartKey) {
    addLine(line);
    return;
  }

  const current = cart.find((item) => item.key === editingCartKey);
  const quantity = current?.quantity || 1;
  cart = cart.filter((item) => item.key !== editingCartKey);

  const existing = cart.find((item) => item.key === line.key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...line, quantity });
  }

  editingCartKey = "";
  renderCart();
  showToast("Je wijziging is opgeslagen.");
}

function openModal(modal) {
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  editingCartKey = "";
}

function renderSignatureExtraGroup(title, items) {
  const selectedValue = renderSignatureExtraGroup.selected?.shift() || "";
  return `
    <label class="signature-extra-select">
      ${title}
      <select data-signature-extra-select>
        <option value="" data-price="0"${selectedValue ? "" : " selected"}>Geen extra</option>
        ${items.map((extra) => `<option value="${extra.name}" data-price="${extra.price}"${extra.name === selectedValue ? " selected" : ""}>${extra.name.replace("Extra ", "")} +${money.format(extra.price)}</option>`).join("")}
      </select>
    </label>
  `;
}

function getSignatureImage(item) {
  if (!item.images) return "";
  return item.images.Medium || item.images.Large || "";
}

function optionSelected(value, selected) {
  return value === selected ? " selected" : "";
}

function renderSignatureModal(item, config = {}) {
  signatureModalTitle.textContent = item.name;
  const image = getSignatureImage(item, "Large");
  renderSignatureExtraGroup.selected = [...(config.extras || [])];
  signatureModalBody.innerHTML = `
    <form class="modal-form" id="signatureChoiceForm" data-signature-choice="${item.id}">
      ${image ? `<img class="signature-modal-photo" src="${image}" alt="${item.name}">` : ""}
      <div class="modal-summary">
        <strong>${item.protein}</strong>
        <span>${item.chips.join(" · ")}</span>
        <span>Afwerking: ${item.finish}</span>
      </div>
      <div class="signature-options">
        <label>
          Maat
          <select name="size" required>
            <option value="Medium" data-price="${item.sizes.Medium}"${optionSelected("Medium", config.size || "Medium")}>Medium - ${money.format(item.sizes.Medium)}</option>
            <option value="Large" data-price="${item.sizes.Large}"${optionSelected("Large", config.size)}>Large - ${money.format(item.sizes.Large)}</option>
          </select>
        </label>
        <label>
          Basis
          <select name="base" required>
            <option value=""${config.base ? "" : " selected"} disabled>Maak keuze</option>
            ${bases.map((base) => `<option${optionSelected(base, config.base)}>${base}</option>`).join("")}
          </select>
        </label>
        <label>
          Saus
          <select name="sauce" required>
            <option value=""${config.sauce ? "" : " selected"} disabled>Maak keuze</option>
            ${sauces.map((sauce) => `<option${optionSelected(sauce, config.sauce)}>${sauce}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="signature-extra-tabs" aria-label="Extra opties voor ${item.name}">
        ${renderSignatureExtraGroup("Extra proteine", signatureExtras.protein)}
        ${renderSignatureExtraGroup("Extra toppings", signatureExtras.toppings)}
        ${renderSignatureExtraGroup("Extra sauzen", signatureExtras.sauces)}
        ${renderSignatureExtraGroup("Extra afwerking", signatureExtras.finish)}
      </div>
      <button class="primary-btn builder-submit" type="submit">${editingCartKey ? "Wijziging opslaan" : "Toevoegen"} <span>→</span></button>
    </form>
  `;
  renderSignatureExtraGroup.selected = [];
}

function renderSignatures() {
  signatureGrid.innerHTML = signatures.map((item) => `
    <article class="signature-card ${item.badge ? "bestseller" : ""}">
      ${item.badge ? `<span class="badge">${item.badge}</span>` : ""}
      ${getSignatureImage(item, "Large") ? `<img class="signature-card-photo" src="${getSignatureImage(item, "Large")}" alt="${item.name}">` : ""}
      <div class="signature-head">
        <div>
          <h3>${item.name}</h3>
          <p class="protein">${item.protein}</p>
        </div>
        <div class="signature-price">
          <small>M / L</small>
          <strong>${money.format(item.sizes.Medium)} /<br>${money.format(item.sizes.Large)}</strong>
        </div>
      </div>
      <div class="chips">${item.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
      <p class="finish">Afwerking: <strong>${item.finish}</strong></p>
      <div class="card-actions">
        <button class="add-button" type="button" data-open-signature="${item.id}">Aanpassen</button>
      </div>
    </article>
  `).join("");
}

function renderSimpleList(target, items) {
  target.innerHTML = items.map((item) => `
    <p>
      <button class="menu-add" type="button" data-simple="${item.id}">${item.name}</button>
      <span>${money.format(item.price)}</span>
    </p>
  `).join("");
}

function getSimpleProduct(id) {
  return [...desserts, ...drinks].find((item) => item.id === id);
}

function getCartLines() {
  return cart;
}

function getCartSummary(lines = getCartLines()) {
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    subtotal,
    discount: 0,
    total: subtotal
  };
}

function renderCart() {
  const lines = getCartLines();

  if (!lines.length) {
    cartItems.innerHTML = `<div class="empty-state">Je order is nog leeg.</div>`;
  } else {
    cartItems.innerHTML = lines.map((item) => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <p>${item.details ? `${item.details} · ` : ""}${money.format(item.price)} per stuk</p>
          ${item.config ? `<button class="cart-edit" type="button" data-edit="${item.key}">Wijzig</button>` : ""}
        </div>
        <div class="qty" aria-label="Aantal ${item.name}">
          <button class="qty-button" type="button" data-minus="${item.key}" aria-label="Verminder">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" type="button" data-plus="${item.key}" aria-label="Verhoog">+</button>
        </div>
      </div>
    `).join("");
  }

  const summary = getCartSummary(lines);
  cartTotal.textContent = money.format(summary.total);
  navCartTotal.textContent = summary.total > 0 ? money.format(summary.total) : "";
}

function changeQuantity(key, direction) {
  const line = cart.find((item) => item.key === key);
  if (!line) return;

  line.quantity += direction;
  if (line.quantity <= 0) {
    cart = cart.filter((item) => item.key !== key);
  }
  renderCart();
}

function readOrders() {
  return JSON.parse(localStorage.getItem("loadedBowlsOrders") || "[]");
}

function saveOrders(orders) {
  localStorage.setItem("loadedBowlsOrders", JSON.stringify(orders));
}

function renderOrders() {
  if (!document.querySelector("#ordersList")) return;
  const orders = readOrders();

  if (!orders.length) {
    document.querySelector("#ordersList").innerHTML = `<div class="empty-state">Nog geen orders ontvangen.</div>`;
    return;
  }

  document.querySelector("#ordersList").innerHTML = orders.map((order) => `
    <article class="order-card">
      <header>
        <strong>${order.customer.name}</strong>
        <span>${order.createdAt}</span>
      </header>
      <div>${order.customer.method} · ${order.customer.phone}</div>
      <ul>
        ${order.items.map((item) => `<li>${item.quantity}x ${item.name}</li>`).join("")}
      </ul>
      <strong>${money.format(order.total)}</strong>
      ${order.customer.note ? `<p>${order.customer.note}</p>` : ""}
    </article>
  `).join("");
}

if (builderModalBody && orderForm) {
  builderModalBody.appendChild(document.querySelector("#builderForm"));
}

function setSelectValue(form, name, value) {
  const field = form.elements[name];
  if (field) field.value = value || "";
}

function openBuilderForEdit(config = {}) {
  const form = document.querySelector("#builderForm");
  form.reset();
  setSelectValue(form, "size", config.size || "Medium");
  setSelectValue(form, "base", config.base);
  setSelectValue(form, "protein", config.protein);
  setSelectValue(form, "topping1", config.toppings?.[0]);
  setSelectValue(form, "topping2", config.toppings?.[1]);
  setSelectValue(form, "topping3", config.toppings?.[2]);
  setSelectValue(form, "sauce1", config.sauces?.[0]);
  setSelectValue(form, "sauce2", config.sauces?.[1]);
  setSelectValue(form, "finish", config.finish);
  setSelectValue(form, "extraProtein", config.extras?.[0]);
  setSelectValue(form, "extraTopping", config.extras?.[1]);
  setSelectValue(form, "extraSauce", config.extras?.[2]);
  setSelectValue(form, "extraFinish", config.extras?.[3]);
  form.querySelector(".builder-submit").innerHTML = `${editingCartKey ? "Wijziging opslaan" : "Toevoegen"} <span>→</span>`;
  openModal(builderModal);
}

openBuilderModalButton.addEventListener("click", () => {
  editingCartKey = "";
  openBuilderForEdit();
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeModal(document.querySelector(`#${button.dataset.closeModal}`)));
});

[builderModal, signatureModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.querySelector("#builderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const sizeSelect = event.currentTarget.elements.size;
  const selected = sizeSelect.options[sizeSelect.selectedIndex];
  const size = formData.get("size");
  const extras = ["extraProtein", "extraTopping", "extraSauce", "extraFinish"]
    .map((name) => {
      const select = event.currentTarget.elements[name];
      const option = select.options[select.selectedIndex];
      return {
        name: select.value,
        price: Number(option.dataset.price || 0)
      };
    })
    .filter((extra) => extra.name);
  const extraTotal = extras.reduce((sum, item) => sum + item.price, 0);
  const price = Number(selected.dataset.price) + extraTotal;
  const base = formData.get("base");
  const protein = formData.get("protein");
  const toppings = [formData.get("topping1"), formData.get("topping2"), formData.get("topping3")].filter(Boolean);
  const saucesChosen = [formData.get("sauce1"), formData.get("sauce2")].filter(Boolean);
  const finish = formData.get("finish");
  if (!base || !protein) {
    showToast("Kies minstens je basis en proteine.");
    return;
  }

  const extrasText = extras.length ? `Extra's: ${extras.map((item) => `${item.name} ${money.format(item.price)}`).join(", ")}` : "Geen extra's";
  const toppingsText = toppings.length ? toppings.join(", ") : "geen toppings gekozen";
  const saucesText = saucesChosen.length ? saucesChosen.join(", ") : "geen saus gekozen";

  saveCartLine({
    key: `custom-${size}-${base}-${protein}-${toppings.join("-")}-${saucesChosen.join("-")}-${finish || "geen-afwerking"}-${extras.map((item) => item.name).join("-")}`.toLowerCase().replaceAll(" ", "-"),
    id: "custom-bowl",
    category: "bowl",
    name: `Make Your Own Bowl ${size}`,
    details: `${base}, ${protein}, toppings: ${toppingsText}, sauzen: ${saucesText}, afwerking: ${finish || "geen afwerking gekozen"}. ${extrasText}`,
    price,
    config: {
      type: "custom",
      size,
      base,
      protein,
      toppings,
      sauces: saucesChosen,
      finish,
      extras: [
        formData.get("extraProtein") || "",
        formData.get("extraTopping") || "",
        formData.get("extraSauce") || "",
        formData.get("extraFinish") || ""
      ]
    }
  });
  closeModal(builderModal);
});

signatureGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-signature]");
  if (!button) return;

  const item = signatures.find((signature) => signature.id === button.dataset.openSignature);
  editingCartKey = "";
  renderSignatureModal(item);
  openModal(signatureModal);
});

signatureModalBody.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target.closest("#signatureChoiceForm");
  if (!form) return;

  const item = signatures.find((signature) => signature.id === form.dataset.signatureChoice);
  const formData = new FormData(form);
  const size = formData.get("size");
  const base = formData.get("base");
  const sauce = formData.get("sauce");
  const sizeSelect = form.elements.size;
  const selectedSize = sizeSelect.options[sizeSelect.selectedIndex];
  const extras = [...form.querySelectorAll("[data-signature-extra-select]")]
    .map((select) => {
      const selected = select.options[select.selectedIndex];
      return {
        name: select.value,
        price: Number(selected.dataset.price || 0)
      };
    })
    .filter((extra) => extra.name);
  const extraTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
  const extrasText = extras.length ? `Extra's: ${extras.map((extra) => `${extra.name} ${money.format(extra.price)}`).join(", ")}` : "Geen extra's";

  if (!base || !sauce) {
    showToast("Kies eerst basis en saus voor deze signature bowl.");
    return;
  }

  saveCartLine({
    key: `${item.id}-${size}-${base}-${sauce}-${extras.map((extra) => extra.name).join("-")}`.toLowerCase().replaceAll(" ", "-"),
    id: item.id,
    category: "bowl",
    name: `${item.name} ${size}`,
    details: `Basis: ${base}, saus: ${sauce}, proteine: ${item.protein}, standaard toppings: ${item.chips.join(", ")}, afwerking: ${item.finish}. ${extrasText}`,
    price: Number(selectedSize.dataset.price) + extraTotal,
    config: {
      type: "signature",
      signatureId: item.id,
      size,
      base,
      sauce,
      extras: extras.map((extra) => extra.name)
    }
  });
  closeModal(signatureModal);
});

document.querySelector("#sweet").addEventListener("click", (event) => {
  const button = event.target.closest("[data-simple]");
  if (!button) return;

  const item = getSimpleProduct(button.dataset.simple);
  addLine({
    key: item.id,
    id: item.id,
    name: item.name,
    details: "",
    price: item.price
  });
});

cartItems.addEventListener("click", (event) => {
  const edit = event.target.closest("[data-edit]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  if (edit) {
    const line = cart.find((item) => item.key === edit.dataset.edit);
    if (!line?.config) return;

    editingCartKey = line.key;
    if (line.config.type === "signature") {
      const item = signatures.find((signature) => signature.id === line.config.signatureId);
      if (!item) return;
      renderSignatureModal(item, line.config);
      openModal(signatureModal);
    } else if (line.config.type === "custom") {
      openBuilderForEdit(line.config);
    }
    return;
  }
  if (plus) changeQuantity(plus.dataset.plus, 1);
  if (minus) changeQuantity(minus.dataset.minus, -1);
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const lines = getCartLines();

  if (!lines.length) {
    showToast("Voeg eerst minstens een product toe.");
    return;
  }

  if (!canAcceptOrdersNow()) {
    showToast(`We nemen momenteel geen online bestellingen aan. Online bestellen kan vanaf 11:00 tijdens onze openingsdagen.`);
    showClosedModalIfNeeded();
    return;
  }

  const formData = new FormData(orderForm);
  const selectedTime = formData.get("orderTime");
  const selectedMinutes = selectedTime ? minutesFromTime(selectedTime) : 0;
  const method = formData.get("method");
  const address = String(formData.get("address") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const selectedPaymentChoice = formData.get("paymentChoice");

  if (!selectedTime || !isSelectableOrderTime(selectedMinutes)) {
    renderOrderTimeOptions();
    showToast("Kies een geldig uur dat nog mogelijk is vanaf nu.");
    return;
  }

  if (method === "Levering") {
    const deliveryAllowed = await checkDeliveryAddress(address);
    if (!deliveryAllowed) return;
  }

  const summary = getCartSummary(lines);
  const order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toLocaleString("nl-BE"),
    customer: {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      method,
      orderTime: selectedTime,
      address,
      note
    },
    items: lines,
    subtotal: summary.subtotal,
    discount: summary.discount,
    promotion: "",
    total: summary.total,
    paymentMethod: selectedPaymentChoice === "later" ? "Betalen bij afhaal/levering" : "Online betalen"
  };

  if (selectedPaymentChoice === "later") {
    submitPayLaterOrder(order);
  } else {
    startPayment(order);
  }
});

continueBrowsing.addEventListener("click", () => {
  closedModal.classList.add("hidden");
});

async function startPayment(order) {
  const orderForPayment = {
    ...order,
    paymentMethod: "Online betaald via Mollie"
  };

  try {
    showToast("Mollie betaalpagina wordt aangemaakt...");
    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderForPayment)
    });

    const data = await response.json();

    if (!response.ok || !data.checkoutUrl) {
      throw new Error(data.error || "Mollie betaling kon niet worden aangemaakt.");
    }

    window.location.href = data.checkoutUrl;
  } catch (error) {
    showToast(error.message);
  }
}

async function submitPayLaterOrder(order) {
  try {
    showToast("Bestelling wordt doorgestuurd...");
    const response = await fetch("/api/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "Bestelling kon niet worden doorgestuurd.");
    }

    cart = [];
    renderCart();
    orderForm.reset();
    renderOrderTimeOptions();
    const mailMessage = order.customer.method === "Levering"
      ? "Bestelling ontvangen. Je krijgt een bevestigingsmail. Controleer ook je spam. Zodra je bestelling onderweg is, krijg je opnieuw een mail."
      : "Bestelling ontvangen. Je krijgt een bevestigingsmail. Controleer ook je spam.";
    showToast(mailMessage);
  } catch (error) {
    showToast(`Bestelling niet doorgestuurd: ${error.message}`);
  }
}

paymentChoice?.addEventListener("change", () => {
  if (!checkoutSubmit) return;
  checkoutSubmit.innerHTML = paymentChoice.value === "later"
    ? "Bestelling plaatsen <span>→</span>"
    : "Verder naar betaling <span>→</span>";
});

async function checkDeliveryAddress(address) {
  if (address.length < 6) {
    showToast("Vul een volledig leveradres in. Afhalen kan altijd.");
    return false;
  }

  try {
    showToast("We controleren of je binnen onze leverzone van 6 km ligt...");
    const response = await fetch("/api/check-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address })
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      showToast(data.error || "Levering kan enkel binnen 6 km van Loaded Bowls in Gent.");
      return false;
    }

    showToast(`Levering mogelijk: ongeveer ${data.distanceKm} km van Loaded Bowls.`);
    return true;
  } catch (error) {
    showToast("Adrescontrole is tijdelijk niet beschikbaar. Probeer opnieuw of kies afhalen.");
    return false;
  }
}

renderSignatures();
renderSimpleList(dessertList, desserts);
renderSimpleList(drinkList, drinks);
renderOrderTimeOptions();
window.setInterval(renderOrderTimeOptions, 60000);
updateLocationStatus();
updateHoursNote();
showClosedModalIfNeeded();
renderCart();
renderOrders();
