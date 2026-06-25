
const signatures = [
  {
    id: "loaded-fire-chicken",
    name: "Loaded Fire Chicken",
    protein: "Crispy Chicken",
    badge: "★ Bestseller",
    chips: ["Sriracha Mayo + Sriracha Hot", "Jalapeños", "Maïs", "Verse ui", "Kerstomaten"],
    finish: "Crispy Onion + Chili Flakes",
    sizes: { Medium: 16.5, Large: 18.5 }
  },
  {
    id: "loaded-crispy-chicken",
    name: "Loaded Crispy Chicken",
    protein: "Crispy Chicken",
    chips: ["Saus naar keuze", "Verse ui", "Maïs", "Jalapeños", "Komkommer"],
    finish: "Crispy Onion",
    sizes: { Medium: 14.99, Large: 17.99 }
  },
  {
    id: "loaded-stoofvlees",
    name: "Loaded Stoofvlees",
    protein: "Stoofvlees",
    chips: ["Saus naar keuze", "Maïs", "Rode ui", "Komkommer", "Kerstomaten"],
    finish: "Lente-ui",
    sizes: { Medium: 15.99, Large: 18.99 }
  },
  {
    id: "loaded-kebab",
    name: "Loaded Kebab",
    protein: "Kebab",
    chips: ["Saus naar keuze", "Verse ui", "Jalapeños", "Maïs", "Komkommer"],
    finish: "Chili Flakes",
    sizes: { Medium: 14.99, Large: 17.99 }
  },
  {
    id: "loaded-chicken-kebab",
    name: "Loaded Chicken Kebab",
    protein: "Chicken Kebab",
    chips: ["Saus naar keuze", "Verse ui", "Maïs", "Jalapeños", "Kerstomaten"],
    finish: "Crispy Onion",
    sizes: { Medium: 14.99, Large: 17.99 }
  },
  {
    id: "loaded-pulled-chicken",
    name: "Loaded Pulled Chicken",
    protein: "Pulled Chicken",
    chips: ["BBQ Sauce", "Maïs", "Rode ui", "Kerstomaten", "Komkommer"],
    finish: "Crispy Onion",
    sizes: { Medium: 13.99, Large: 16.99 }
  },
  {
    id: "loaded-falafel",
    name: "Loaded Falafel",
    protein: "Falafel",
    chips: ["Saus naar keuze", "Komkommer", "Kerstomaten", "Rode ui", "Maïs"],
    finish: "Lente-ui",
    sizes: { Medium: 12.99, Large: 15.99 }
  }
];

const bases = ["Frieten", "Nachos", "Rijst"];
const sauces = ["Looksaus", "Mayo", "Samurai", "Cocktail", "Andalouse", "Curry Sauce", "BBQ Sauce", "Cheddar Sauce", "Sriracha Mayo", "Sriracha Hot"];

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
    image: "assets/base-fries.jpg",
    copy: "Knapperig gefrituurd, perfect zout, sterk genoeg om de zwaarste topping te dragen zonder zacht te worden."
  },
  nachos: {
    title: "Nachos",
    image: "assets/thumb-nachos.jpg",
    copy: "Crunchy, stevig en ideaal voor cheddar, jalapeños en sauslagen met extra bite."
  },
  rijst: {
    title: "Rijst",
    image: "assets/thumb-rijst.jpg",
    copy: "Lichter, warm en vullend. De perfecte basis wanneer je bowl meer comfort dan crunch mag hebben."
  }
};

let cart = [];
let pendingOrder = null;

const money = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR"
});

const signatureGrid = document.querySelector("#signatureGrid");
const dessertList = document.querySelector("#dessertList");
const drinkList = document.querySelector("#drinkList");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const orderForm = document.querySelector("#orderForm");
const paymentSection = document.querySelector("#payment");
const paymentSummary = document.querySelector("#paymentSummary");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
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

function renderSignatures() {
  signatureGrid.innerHTML = signatures.map((item) => `
    <article class="signature-card ${item.badge ? "bestseller" : ""}">
      ${item.badge ? `<span class="badge">${item.badge}</span>` : ""}
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
      <p class="finish">Afwerking · <strong>${item.finish}</strong></p>
      <div class="signature-options">
        <label>
          Basis
          <select data-signature-base="${item.id}" required>
            <option value="" selected disabled>Maak keuze</option>
            ${bases.map((base) => `<option>${base}</option>`).join("")}
          </select>
        </label>
        <label>
          Saus
          <select data-signature-sauce="${item.id}" required>
            <option value="" selected disabled>Maak keuze</option>
            ${sauces.map((sauce) => `<option>${sauce}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="card-actions">
        <button class="add-button" type="button" data-signature="${item.id}" data-size="Medium">Medium</button>
        <button class="add-button" type="button" data-signature="${item.id}" data-size="Large">Large</button>
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
        </div>
        <div class="qty" aria-label="Aantal ${item.name}">
          <button class="qty-button" type="button" data-minus="${item.key}" aria-label="Verminder">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" type="button" data-plus="${item.key}" aria-label="Verhoog">+</button>
        </div>
      </div>
    `).join("");
  }

  const total = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = money.format(total);
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

document.querySelector(".base-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-base-tab]");
  if (!button) return;

  document.querySelectorAll(".base-tab").forEach((tab) => tab.classList.remove("active"));
  button.classList.add("active");

  const content = baseContent[button.dataset.baseTab];
  document.querySelector("#baseTitle").textContent = content.title;
  document.querySelector("#baseCopy").textContent = content.copy;
  document.querySelector("#baseImage").src = content.image;
  document.querySelector("#baseImage").alt = `${content.title} loaded bowl`;
});

document.querySelector("#builderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const sizeSelect = event.currentTarget.elements.size;
  const selected = sizeSelect.options[sizeSelect.selectedIndex];
  const size = formData.get("size");
  const extras = [...event.currentTarget.querySelectorAll("input[name='extras']:checked")].map((input) => ({
    name: input.value,
    price: Number(input.dataset.price || 0)
  }));
  const extraTotal = extras.reduce((sum, item) => sum + item.price, 0);
  const price = Number(selected.dataset.price) + extraTotal;
  const base = formData.get("base");
  const protein = formData.get("protein");
  const toppings = [formData.get("topping1"), formData.get("topping2"), formData.get("topping3")].filter(Boolean);
  const saucesChosen = [formData.get("sauce1"), formData.get("sauce2")].filter(Boolean);
  const finish = formData.get("finish");
  const extrasText = extras.length ? `Extra's: ${extras.map((item) => `${item.name} ${money.format(item.price)}`).join(", ")}` : "Geen extra's";

  addLine({
    key: `custom-${size}-${base}-${protein}-${toppings.join("-")}-${saucesChosen.join("-")}-${finish}-${extras.map((item) => item.name).join("-")}`.toLowerCase().replaceAll(" ", "-"),
    id: "custom-bowl",
    name: `Make Your Own Bowl ${size}`,
    details: `${base}, ${protein}, toppings: ${toppings.join(", ")}, sauzen: ${saucesChosen.join(", ")}, afwerking: ${finish}. ${extrasText}`,
    price
  });
});

signatureGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-signature]");
  if (!button) return;

  const item = signatures.find((signature) => signature.id === button.dataset.signature);
  const size = button.dataset.size;
  const card = button.closest(".signature-card");
  const base = card.querySelector(`[data-signature-base="${item.id}"]`).value;
  const sauce = card.querySelector(`[data-signature-sauce="${item.id}"]`).value;

  if (!base || !sauce) {
    showToast("Kies eerst basis en saus voor deze signature bowl.");
    return;
  }

  addLine({
    key: `${item.id}-${size}-${base}-${sauce}`,
    id: item.id,
    name: `${item.name} ${size}`,
    details: `Basis: ${base}, saus: ${sauce}, ${item.protein}, afwerking: ${item.finish}`,
    price: item.sizes[size]
  });
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
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  if (plus) changeQuantity(plus.dataset.plus, 1);
  if (minus) changeQuantity(minus.dataset.minus, -1);
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const lines = getCartLines();

  if (!lines.length) {
    showToast("Voeg eerst minstens een product toe.");
    return;
  }

  const formData = new FormData(orderForm);
  const total = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toLocaleString("nl-BE"),
    customer: {
      name: formData.get("name"),
      phone: formData.get("phone"),
      method: formData.get("method"),
      note: formData.get("note")
    },
    items: lines,
    total
  };

  pendingOrder = order;
  renderPayment(order);
  paymentSection.classList.remove("hidden");
  paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Kies nu een betaalmethode om af te ronden.");
});

function renderPayment(order) {
  const items = order.items.map((item) => `<li>${item.quantity}x ${item.name}</li>`).join("");
  paymentSummary.innerHTML = `
    <div>
      <strong>${order.customer.name}</strong>
      <span>${order.customer.method} · ${order.customer.phone}</span>
    </div>
    <ul>${items}</ul>
    <p><span>Totaal te betalen</span><strong>${money.format(order.total)}</strong></p>
  `;
}

document.querySelector("#payment").addEventListener("click", (event) => {
  const button = event.target.closest("[data-pay]");
  if (!button || !pendingOrder) return;

  startPayment(button.dataset.pay);
});

async function startPayment(paymentMethod) {
  const orderForPayment = {
    ...pendingOrder,
    paymentMethod
  };

  if (paymentMethod === "Cash bij afhalen") {
    const cashOrder = {
      ...orderForPayment,
      paymentStatus: "Te betalen bij afhalen"
    };
    saveOrders([cashOrder, ...readOrders()]);
    pendingOrder = null;
    cart = [];
    orderForm.reset();
    renderCart();
    paymentSection.classList.add("hidden");
    showToast("Bestelling bevestigd. Betaling gebeurt bij afhalen.");
    return;
  }

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

function resetCheckoutAfterPayment() {
  pendingOrder = null;
  cart = [];
  orderForm.reset();
  renderCart();
  paymentSection.classList.add("hidden");
}

renderSignatures();
renderSimpleList(dessertList, desserts);
renderSimpleList(drinkList, drinks);
renderCart();
renderOrders();
