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
  label: "ma-za 11:00 - 15:00 en 17:00 - 22:00, zondag gesloten",
  orderLabel: "eerste tijdstip: 11:30 en 17:30",
  paymentSchedule: {
    0: [],
    1: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ],
    2: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ],
    3: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ],
    4: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ],
    5: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ],
    6: [
      { open: "11:00", close: "15:00", openMinutes: 11 * 60, closeMinutes: 15 * 60 },
      { open: "17:00", close: "22:00", openMinutes: 17 * 60, closeMinutes: 22 * 60 }
    ]
  },
  slotSchedule: {
    0: [],
    1: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    2: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    3: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    4: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    5: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
    ],
    6: [
      { open: "11:30", close: "14:45", openMinutes: 11 * 60 + 30, closeMinutes: 14 * 60 + 45 },
      { open: "17:30", close: "21:45", openMinutes: 17 * 60 + 30, closeMinutes: 21 * 60 + 45 }
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
const orderMethod = document.querySelector("#orderMethod");
const paymentChoice = document.querySelector("#paymentChoice");
const checkoutSubmit = document.querySelector("#checkoutSubmit");
const hoursNote = document.querySelector("#hoursNote");
const deliveryAddressLabel = document.querySelector("#deliveryAddressLabel");
const languageSelect = document.querySelector("#languageSelect");
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

const translations = {
  nl: {
    navBuild: "Build",
    navMenu: "Menu",
    navDrinks: "Drinks",
    navFind: "Find us",
    navCheckout: "Checkout",
    orderNow: "Order now",
    heroTitle: "Build it.<br><span>Load</span> it.<br>Devour it.",
    heroCopy: "Kies je basis: frieten, rijst of nachos. Stapel je proteine, toppings, sauzen en afwerking. Of ga direct voor een Signature Bowl in Gent. Vanaf <strong>€11,50.</strong>",
    buildYourBowl: "Build your bowl",
    seeSignatures: "See signatures",
    basesKicker: "/01 — De basis",
    basesTitle: "Make your <span>own bowl.</span>",
    basesIntro: "Drie fundamenten, allemaal gebouwd om een berg topping te dragen. Make Your Own vanaf €11,50 medium / €14,50 large.",
    baseTitleDefault: "Basis naar keuze",
    baseCopyDefault: "Kies frieten, nachos of rijst als fundament voor je bowl. Daarna kies je proteine, toppings, sauzen en afwerking.",
    includedTitle: "Make your own — inclusief",
    includedBase: "1× Basis",
    includedBaseValue: "frieten, nachos of rijst",
    includedProtein: "1× Proteïne",
    includedToppings: "3× Toppings",
    includedSauces: "2× Sauzen",
    includedFinish: "1× Afwerking",
    choiceValue: "naar keuze",
    signatureKicker: "/03 — Signature bowls",
    signatureTitle: "Signature <span>bowls.</span>",
    signatureIntro: "Basis naar keuze · Medium / Large",
    sweetKicker: "/04 — Desserts & dranken",
    sweetTitle: "Sweet <span>finish.</span>",
    checkoutKicker: "/05 — Checkout",
    checkoutTitle: "Order <span>now.</span>",
    openingHoursTitle: "Openingsuren",
    openingHoursText: "Maandag - zaterdag: 11:00 - 15:00 en 17:00 - 22:00. Zondag gesloten.",
    formNote: "Levering kan binnen 6 km van Loaded Bowls in Gent. Bereiding en levering duren gemiddeld 25-30 minuten.",
    findKicker: "/06 — Kom een bowl halen",
    findTitle: "Find the <span>drip.</span>",
    findCopy: "Walk-in, take-away en delivery in Gent. Bestellen kan online, aan de counter of via je favoriete delivery app. Bereiding en levering duurt gemiddeld 25-30 minuten.",
    pickupOrder: "Bestel afhaal",
    route: "Route",
    whenTitle: "Wanneer?",
    copyright: "© 2026 Loaded Bowls. Alle rechten voorbehouden.",
    termsText: "Online bestellingen zijn pas definitief na betaling. Levering is mogelijk binnen 6 km van Sint-Amandstraat 24, 9000 Gent. Bereiding en levering duren gemiddeld 25-30 minuten, afhankelijk van drukte en bereikbaarheid. Afhalen kan tijdens de openingsuren. Prijzen en beschikbaarheid kunnen wijzigen.",
    closedKicker: "Momenteel gesloten",
    closedTitle: "We zijn nu gesloten.",
    continueBrowsing: "Toch verder kijken",
    labelName: "Naam",
    labelPhone: "Telefoon",
    labelEmail: "E-mail",
    labelMethod: "Keuze",
    labelTime: "Gewenst uur",
    labelAddress: "Leveradres",
    labelNote: "Opmerking",
    labelPayment: "Betaling",
    placeOrder: "Bestelling plaatsen",
    continuePayment: "Verder naar betaling",
    chooseTime: "Kies een uur",
    noSlotsToday: "Vandaag geen tijdsloten meer",
    onlineOpen: "Online bestellen open",
    closedNow: "Momenteel gesloten",
    added: "Toegevoegd aan je order.",
    saved: "Je wijziging is opgeslagen.",
    noExtra: "Geen extra",
    extras: "Extra's",
    noExtras: "Geen extra's",
    noToppings: "geen toppings gekozen",
    noSauce: "geen saus gekozen",
    noFinish: "geen afwerking gekozen",
    finish: "Afwerking",
    size: "Maat",
    base: "Basis",
    sauce: "Saus",
    extraProtein: "Extra proteine",
    extraToppings: "Extra toppings",
    extraSauces: "Extra sauzen",
    extraFinish: "Extra afwerking",
    saveChange: "Wijziging opslaan",
    add: "Toevoegen",
    adjust: "Aanpassen",
    emptyCart: "Je order is nog leeg.",
    each: "per stuk",
    edit: "Wijzig",
    decrease: "Verminder",
    increase: "Verhoog",
    noOrders: "Nog geen orders ontvangen.",
    chooseBaseProtein: "Kies minstens je basis en proteine.",
    chooseBaseSauce: "Kies eerst basis en saus voor deze signature bowl.",
    addProductFirst: "Voeg eerst minstens een product toe.",
    closedOrder: "We nemen momenteel geen online bestellingen aan. Online bestellen kan vanaf 11:00 tijdens onze openingsdagen.",
    invalidTime: "Kies een geldig uur dat nog mogelijk is vanaf nu.",
    creatingPayment: "Mollie betaalpagina wordt aangemaakt...",
    sendingOrder: "Bestelling wordt doorgestuurd...",
    orderSendError: "Bestelling kon niet worden doorgestuurd.",
    orderReceived: "Bestelling ontvangen. Je krijgt een bevestigingsmail. Controleer ook je spam.",
    orderReceivedDelivery: "Bestelling ontvangen. Je krijgt een bevestigingsmail. Controleer ook je spam. Zodra je bestelling onderweg is, krijg je opnieuw een mail.",
    fullAddress: "Vul een volledig leveradres in. Afhalen kan altijd.",
    checkingAddress: "We controleren of je binnen onze leverzone van 6 km ligt...",
    deliveryZoneError: "Levering kan enkel binnen 6 km van Loaded Bowls in Gent.",
    deliveryOk: "Levering mogelijk: ongeveer {distance} km van Loaded Bowls.",
    addressCheckUnavailable: "Adrescontrole is tijdelijk niet beschikbaar. Probeer opnieuw of kies afhalen.",
    methods: ["Afhalen", "Levering", "Ter plaatse eten"],
    payment: ["Online betalen", "Betalen bij afhaal/levering"]
  },
  en: {
    navBuild: "Build",
    navMenu: "Menu",
    navDrinks: "Drinks",
    navFind: "Find us",
    navCheckout: "Checkout",
    orderNow: "Order now",
    heroTitle: "Build it.<br><span>Load</span> it.<br>Devour it.",
    heroCopy: "Choose fries, rice or nachos as your base. Stack your protein, toppings, sauces and finish. Or go straight for a Signature Bowl in Ghent. From <strong>€11,50.</strong>",
    buildYourBowl: "Build your bowl",
    seeSignatures: "See signatures",
    basesKicker: "/01 — The base",
    basesTitle: "Make your <span>own bowl.</span>",
    basesIntro: "Three foundations, all built to carry a mountain of toppings. Make Your Own from €11,50 medium / €14,50 large.",
    baseTitleDefault: "Base of your choice",
    baseCopyDefault: "Choose fries, nachos or rice as the base of your bowl. Then choose protein, toppings, sauces and finish.",
    includedTitle: "Make your own — included",
    includedBase: "1× Base",
    includedBaseValue: "fries, nachos or rice",
    includedProtein: "1× Protein",
    includedToppings: "3× Toppings",
    includedSauces: "2× Sauces",
    includedFinish: "1× Finish",
    choiceValue: "your choice",
    signatureKicker: "/03 — Signature bowls",
    signatureTitle: "Signature <span>bowls.</span>",
    signatureIntro: "Base of your choice · Medium / Large",
    sweetKicker: "/04 — Desserts & drinks",
    sweetTitle: "Sweet <span>finish.</span>",
    checkoutKicker: "/05 — Checkout",
    checkoutTitle: "Order <span>now.</span>",
    openingHoursTitle: "Opening hours",
    openingHoursText: "Monday - Saturday: 11:00 - 15:00 and 17:00 - 22:00. Sunday closed.",
    formNote: "Delivery is possible within 6 km of Loaded Bowls in Ghent. Preparation and delivery take around 25-30 minutes.",
    findKicker: "/06 — Come grab a bowl",
    findTitle: "Find the <span>drip.</span>",
    findCopy: "Walk-in, take-away and delivery in Ghent. Order online, at the counter or via your favourite delivery app. Preparation and delivery take around 25-30 minutes.",
    pickupOrder: "Order pickup",
    route: "Route",
    whenTitle: "When?",
    copyright: "© 2026 Loaded Bowls. All rights reserved.",
    termsText: "Online orders are final after payment. Delivery is possible within 6 km of Sint-Amandstraat 24, 9000 Ghent. Preparation and delivery take around 25-30 minutes depending on traffic and workload. Pickup is possible during opening hours. Prices and availability may change.",
    closedKicker: "Currently closed",
    closedTitle: "We are closed now.",
    continueBrowsing: "Continue browsing",
    labelName: "Name",
    labelPhone: "Phone",
    labelEmail: "E-mail",
    labelMethod: "Choice",
    labelTime: "Preferred time",
    labelAddress: "Delivery address",
    labelNote: "Note",
    labelPayment: "Payment",
    placeOrder: "Place order",
    continuePayment: "Continue to payment",
    chooseTime: "Choose a time",
    noSlotsToday: "No more time slots today",
    onlineOpen: "Online ordering open",
    closedNow: "Currently closed",
    added: "Added to your order.",
    saved: "Your change has been saved.",
    noExtra: "No extra",
    extras: "Extras",
    noExtras: "No extras",
    noToppings: "no toppings chosen",
    noSauce: "no sauce chosen",
    noFinish: "no finish chosen",
    finish: "Finish",
    size: "Size",
    base: "Base",
    sauce: "Sauce",
    extraProtein: "Extra protein",
    extraToppings: "Extra toppings",
    extraSauces: "Extra sauces",
    extraFinish: "Extra finish",
    saveChange: "Save change",
    add: "Add",
    adjust: "Customize",
    emptyCart: "Your order is still empty.",
    each: "each",
    edit: "Edit",
    decrease: "Decrease",
    increase: "Increase",
    noOrders: "No orders received yet.",
    chooseBaseProtein: "Choose at least your base and protein.",
    chooseBaseSauce: "Choose a base and sauce for this signature bowl first.",
    addProductFirst: "Add at least one product first.",
    closedOrder: "We are not accepting online orders right now. Online ordering is available from 11:00 on opening days.",
    invalidTime: "Choose a valid time that is still available.",
    creatingPayment: "Creating Mollie payment page...",
    sendingOrder: "Sending order...",
    orderSendError: "Order could not be sent.",
    orderReceived: "Order received. You will get a confirmation e-mail. Please also check spam.",
    orderReceivedDelivery: "Order received. You will get a confirmation e-mail. Please also check spam. When your order is on its way, you will receive another e-mail.",
    fullAddress: "Fill in a complete delivery address. Pickup is always possible.",
    checkingAddress: "We are checking whether you are within our 6 km delivery zone...",
    deliveryZoneError: "Delivery is only possible within 6 km of Loaded Bowls in Ghent.",
    deliveryOk: "Delivery possible: about {distance} km from Loaded Bowls.",
    addressCheckUnavailable: "Address check is temporarily unavailable. Try again or choose pickup.",
    methods: ["Pickup", "Delivery", "Eat in"],
    payment: ["Pay online", "Pay at pickup/delivery"]
  },
  fr: {
    navBuild: "Composer",
    navMenu: "Menu",
    navDrinks: "Boissons",
    navFind: "Adresse",
    navCheckout: "Commande",
    orderNow: "Commander",
    heroTitle: "Compose.<br><span>Charge</span>.<br>Devore.",
    heroCopy: "Choisissez votre base: frites, riz ou nachos. Ajoutez proteine, toppings, sauces et finition. Ou choisissez directement un Signature Bowl a Gand. A partir de <strong>€11,50.</strong>",
    buildYourBowl: "Composer un bowl",
    seeSignatures: "Voir signatures",
    basesKicker: "/01 — La base",
    basesTitle: "Compose ton <span>bowl.</span>",
    basesIntro: "Trois bases faites pour porter une montagne de toppings. Make Your Own a partir de €11,50 medium / €14,50 large.",
    baseTitleDefault: "Base au choix",
    baseCopyDefault: "Choisissez frites, nachos ou riz comme base. Ensuite proteine, toppings, sauces et finition.",
    includedTitle: "Make your own — inclus",
    includedBase: "1× Base",
    includedBaseValue: "frites, nachos ou riz",
    includedProtein: "1× Proteine",
    includedToppings: "3× Toppings",
    includedSauces: "2× Sauces",
    includedFinish: "1× Finition",
    choiceValue: "au choix",
    signatureKicker: "/03 — Signature bowls",
    signatureTitle: "Signature <span>bowls.</span>",
    signatureIntro: "Base au choix · Medium / Large",
    sweetKicker: "/04 — Desserts & boissons",
    sweetTitle: "Sweet <span>finish.</span>",
    checkoutKicker: "/05 — Commande",
    checkoutTitle: "Commander <span>maintenant.</span>",
    openingHoursTitle: "Heures d'ouverture",
    openingHoursText: "Lundi - samedi: 11:00 - 15:00 et 17:00 - 22:00. Dimanche ferme.",
    formNote: "Livraison possible dans un rayon de 6 km autour de Loaded Bowls a Gand. Preparation et livraison prennent environ 25-30 minutes.",
    findKicker: "/06 — Viens chercher un bowl",
    findTitle: "Find the <span>drip.</span>",
    findCopy: "Walk-in, take-away et livraison a Gand. Commandez en ligne, au comptoir ou via votre app de livraison preferee. Preparation et livraison prennent environ 25-30 minutes.",
    pickupOrder: "Commander a emporter",
    route: "Itineraire",
    whenTitle: "Quand?",
    copyright: "© 2026 Loaded Bowls. Tous droits reserves.",
    termsText: "Les commandes en ligne sont definitives apres paiement. Livraison possible dans un rayon de 6 km autour de Sint-Amandstraat 24, 9000 Gand. Preparation et livraison prennent environ 25-30 minutes selon l'affluence et l'accessibilite. Retrait possible pendant les heures d'ouverture. Prix et disponibilite peuvent changer.",
    closedKicker: "Actuellement ferme",
    closedTitle: "Nous sommes fermes.",
    continueBrowsing: "Voir le menu",
    labelName: "Nom",
    labelPhone: "Telephone",
    labelEmail: "E-mail",
    labelMethod: "Choix",
    labelTime: "Heure souhaitee",
    labelAddress: "Adresse de livraison",
    labelNote: "Remarque",
    labelPayment: "Paiement",
    placeOrder: "Passer commande",
    continuePayment: "Continuer vers le paiement",
    chooseTime: "Choisissez une heure",
    noSlotsToday: "Plus de créneaux aujourd'hui",
    onlineOpen: "Commande en ligne ouverte",
    closedNow: "Actuellement ferme",
    added: "Ajoute a votre commande.",
    saved: "Modification enregistree.",
    noExtra: "Sans extra",
    extras: "Extras",
    noExtras: "Sans extras",
    noToppings: "aucun topping choisi",
    noSauce: "aucune sauce choisie",
    noFinish: "aucune finition choisie",
    finish: "Finition",
    size: "Taille",
    base: "Base",
    sauce: "Sauce",
    extraProtein: "Proteine extra",
    extraToppings: "Toppings extra",
    extraSauces: "Sauces extra",
    extraFinish: "Finition extra",
    saveChange: "Enregistrer",
    add: "Ajouter",
    adjust: "Modifier",
    emptyCart: "Votre commande est encore vide.",
    each: "piece",
    edit: "Modifier",
    decrease: "Diminuer",
    increase: "Augmenter",
    noOrders: "Aucune commande recue.",
    chooseBaseProtein: "Choisissez au moins votre base et proteine.",
    chooseBaseSauce: "Choisissez d'abord une base et une sauce.",
    addProductFirst: "Ajoutez d'abord au moins un produit.",
    closedOrder: "Nous ne prenons pas de commandes en ligne pour le moment. Les commandes ouvrent a 11:00 les jours d'ouverture.",
    invalidTime: "Choisissez une heure valide encore disponible.",
    creatingPayment: "Creation de la page de paiement Mollie...",
    sendingOrder: "Envoi de la commande...",
    orderSendError: "La commande n'a pas pu etre envoyee.",
    orderReceived: "Commande recue. Vous recevrez un e-mail de confirmation. Verifiez aussi les spams.",
    orderReceivedDelivery: "Commande recue. Vous recevrez un e-mail de confirmation. Verifiez aussi les spams. Quand votre commande sera en route, vous recevrez un nouvel e-mail.",
    fullAddress: "Indiquez une adresse complete. Le retrait est toujours possible.",
    checkingAddress: "Nous verifions si vous etes dans notre zone de livraison de 6 km...",
    deliveryZoneError: "La livraison est possible uniquement dans un rayon de 6 km autour de Loaded Bowls a Gand.",
    deliveryOk: "Livraison possible: environ {distance} km de Loaded Bowls.",
    addressCheckUnavailable: "La verification d'adresse est temporairement indisponible. Reessayez ou choisissez le retrait.",
    methods: ["A emporter", "Livraison", "Sur place"],
    payment: ["Paiement en ligne", "Payer au retrait/livraison"]
  },
  de: {
    navBuild: "Build",
    navMenu: "Menu",
    navDrinks: "Getranke",
    navFind: "Standort",
    navCheckout: "Bestellen",
    orderNow: "Bestellen",
    heroTitle: "Build it.<br><span>Load</span> it.<br>Devour it.",
    heroCopy: "Wahle Pommes, Reis oder Nachos als Basis. Dazu Protein, Toppings, Saucen und Finish. Oder nimm direkt eine Signature Bowl in Gent. Ab <strong>€11,50.</strong>",
    buildYourBowl: "Bowl erstellen",
    seeSignatures: "Signatures ansehen",
    basesKicker: "/01 — Die Basis",
    basesTitle: "Make your <span>own bowl.</span>",
    basesIntro: "Drei Grundlagen, gebaut fuer viele Toppings. Make Your Own ab €11,50 medium / €14,50 large.",
    baseTitleDefault: "Basis nach Wahl",
    baseCopyDefault: "Waehle Pommes, Nachos oder Reis als Basis. Danach Protein, Toppings, Saucen und Finish.",
    includedTitle: "Make your own — inklusive",
    includedBase: "1× Basis",
    includedBaseValue: "Pommes, Nachos oder Reis",
    includedProtein: "1× Protein",
    includedToppings: "3× Toppings",
    includedSauces: "2× Saucen",
    includedFinish: "1× Finish",
    choiceValue: "nach Wahl",
    signatureKicker: "/03 — Signature bowls",
    signatureTitle: "Signature <span>bowls.</span>",
    signatureIntro: "Basis nach Wahl · Medium / Large",
    sweetKicker: "/04 — Desserts & Getraenke",
    sweetTitle: "Sweet <span>finish.</span>",
    checkoutKicker: "/05 — Bestellung",
    checkoutTitle: "Jetzt <span>bestellen.</span>",
    openingHoursTitle: "Oeffnungszeiten",
    openingHoursText: "Montag - Samstag: 11:00 - 15:00 und 17:00 - 22:00. Sonntag geschlossen.",
    formNote: "Lieferung ist innerhalb von 6 km von Loaded Bowls in Gent moeglich. Zubereitung und Lieferung dauern ca. 25-30 Minuten.",
    findKicker: "/06 — Komm eine Bowl holen",
    findTitle: "Find the <span>drip.</span>",
    findCopy: "Walk-in, Take-away und Lieferung in Gent. Bestelle online, am Counter oder ueber deine Lieblings-Lieferapp. Zubereitung und Lieferung dauern ca. 25-30 Minuten.",
    pickupOrder: "Abholung bestellen",
    route: "Route",
    whenTitle: "Wann?",
    copyright: "© 2026 Loaded Bowls. Alle Rechte vorbehalten.",
    termsText: "Online-Bestellungen sind nach Zahlung verbindlich. Lieferung ist innerhalb von 6 km von Sint-Amandstraat 24, 9000 Gent moeglich. Zubereitung und Lieferung dauern ca. 25-30 Minuten, je nach Auslastung und Erreichbarkeit. Abholung ist waehrend der Oeffnungszeiten moeglich. Preise und Verfuegbarkeit koennen sich aendern.",
    closedKicker: "Derzeit geschlossen",
    closedTitle: "Wir sind geschlossen.",
    continueBrowsing: "Trotzdem ansehen",
    labelName: "Name",
    labelPhone: "Telefon",
    labelEmail: "E-Mail",
    labelMethod: "Auswahl",
    labelTime: "Gewunschte Uhrzeit",
    labelAddress: "Lieferadresse",
    labelNote: "Bemerkung",
    labelPayment: "Zahlung",
    placeOrder: "Bestellung aufgeben",
    continuePayment: "Weiter zur Zahlung",
    chooseTime: "Uhrzeit waehlen",
    noSlotsToday: "Heute keine Zeiten mehr",
    onlineOpen: "Online-Bestellung offen",
    closedNow: "Derzeit geschlossen",
    added: "Zur Bestellung hinzugefuegt.",
    saved: "Aenderung gespeichert.",
    noExtra: "Kein Extra",
    extras: "Extras",
    noExtras: "Keine Extras",
    noToppings: "keine Toppings gewaehlt",
    noSauce: "keine Sauce gewaehlt",
    noFinish: "kein Finish gewaehlt",
    finish: "Finish",
    size: "Groesse",
    base: "Basis",
    sauce: "Sauce",
    extraProtein: "Extra Protein",
    extraToppings: "Extra Toppings",
    extraSauces: "Extra Saucen",
    extraFinish: "Extra Finish",
    saveChange: "Aenderung speichern",
    add: "Hinzufuegen",
    adjust: "Anpassen",
    emptyCart: "Deine Bestellung ist noch leer.",
    each: "pro Stueck",
    edit: "Aendern",
    decrease: "Verringern",
    increase: "Erhoehen",
    noOrders: "Noch keine Bestellungen erhalten.",
    chooseBaseProtein: "Waehle mindestens Basis und Protein.",
    chooseBaseSauce: "Waehle zuerst Basis und Sauce.",
    addProductFirst: "Fuege zuerst mindestens ein Produkt hinzu.",
    closedOrder: "Wir nehmen derzeit keine Online-Bestellungen an. Online-Bestellungen sind an Oeffnungstagen ab 11:00 moeglich.",
    invalidTime: "Waehle eine gueltige Uhrzeit, die noch moeglich ist.",
    creatingPayment: "Mollie-Zahlungsseite wird erstellt...",
    sendingOrder: "Bestellung wird gesendet...",
    orderSendError: "Bestellung konnte nicht gesendet werden.",
    orderReceived: "Bestellung erhalten. Du bekommst eine Bestaetigungs-E-Mail. Bitte auch Spam pruefen.",
    orderReceivedDelivery: "Bestellung erhalten. Du bekommst eine Bestaetigungs-E-Mail. Bitte auch Spam pruefen. Sobald deine Bestellung unterwegs ist, bekommst du nochmals eine E-Mail.",
    fullAddress: "Gib eine vollstaendige Lieferadresse ein. Abholung ist immer moeglich.",
    checkingAddress: "Wir pruefen, ob du in unserer 6-km-Lieferzone bist...",
    deliveryZoneError: "Lieferung ist nur innerhalb von 6 km von Loaded Bowls in Gent moeglich.",
    deliveryOk: "Lieferung moeglich: ca. {distance} km von Loaded Bowls.",
    addressCheckUnavailable: "Adresspruefung ist voruebergehend nicht verfuegbar. Versuche es erneut oder waehle Abholung.",
    methods: ["Abholung", "Lieferung", "Vor Ort essen"],
    payment: ["Online bezahlen", "Bei Abholung/Lieferung bezahlen"]
  }
};

let currentLanguage = localStorage.getItem("loadedBowlsLanguage") || "nl";

function t(key, replacements = {}) {
  const value = translations[currentLanguage]?.[key] || translations.nl[key] || key;
  return Object.entries(replacements).reduce((text, [name, replacement]) => text.replace(`{${name}}`, replacement), value);
}

function applyLanguage(language) {
  const copy = translations[language] || translations.nl;
  currentLanguage = translations[language] ? language : "nl";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (copy[key]) element.innerHTML = copy[key];
  });
  if (orderMethod) {
    [...orderMethod.options].forEach((option, index) => {
      option.textContent = copy.methods[index] || option.textContent;
    });
  }
  if (paymentChoice) {
    [...paymentChoice.options].forEach((option, index) => {
      option.textContent = copy.payment[index] || option.textContent;
    });
  }
  localStorage.setItem("loadedBowlsLanguage", language);
}

function updateDeliveryAddressVisibility() {
  if (!orderMethod || !deliveryAddressLabel) return;
  const isDelivery = orderMethod.value === "Levering";
  deliveryAddressLabel.classList.toggle("hidden", !isDelivery);
  const addressInput = deliveryAddressLabel.querySelector("input");
  if (addressInput) {
    addressInput.required = isDelivery;
    if (!isDelivery) addressInput.value = "";
  }
}

function updateCheckoutButtonLabel() {
  if (!checkoutSubmit) return;
  checkoutSubmit.innerHTML = paymentChoice?.value === "later"
    ? `${t("placeOrder")} <span>→</span>`
    : `${t("continuePayment")} <span>→</span>`;
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

  const placeholder = periods.length && slots.length ? t("chooseTime") : t("noSlotsToday");
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
  locationStatus.textContent = canAcceptOrdersNow() ? t("onlineOpen") : t("closedNow");
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
  showToast(t("added"));
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
  showToast(t("saved"));
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
        <option value="" data-price="0"${selectedValue ? "" : " selected"}>${t("noExtra")}</option>
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
        <span>${t("finish")}: ${item.finish}</span>
      </div>
      <div class="signature-options">
        <label>
          ${t("size")}
          <select name="size" required>
            <option value="Medium" data-price="${item.sizes.Medium}"${optionSelected("Medium", config.size || "Medium")}>Medium - ${money.format(item.sizes.Medium)}</option>
            <option value="Large" data-price="${item.sizes.Large}"${optionSelected("Large", config.size)}>Large - ${money.format(item.sizes.Large)}</option>
          </select>
        </label>
        <label>
          ${t("base")}
          <select name="base" required>
            <option value=""${config.base ? "" : " selected"} disabled>Maak keuze</option>
            ${bases.map((base) => `<option${optionSelected(base, config.base)}>${base}</option>`).join("")}
          </select>
        </label>
        <label>
          ${t("sauce")}
          <select name="sauce" required>
            <option value=""${config.sauce ? "" : " selected"} disabled>Maak keuze</option>
            ${sauces.map((sauce) => `<option${optionSelected(sauce, config.sauce)}>${sauce}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="signature-extra-tabs" aria-label="Extra opties voor ${item.name}">
        ${renderSignatureExtraGroup(t("extraProtein"), signatureExtras.protein)}
        ${renderSignatureExtraGroup(t("extraToppings"), signatureExtras.toppings)}
        ${renderSignatureExtraGroup(t("extraSauces"), signatureExtras.sauces)}
        ${renderSignatureExtraGroup(t("extraFinish"), signatureExtras.finish)}
      </div>
      <button class="primary-btn builder-submit" type="submit">${editingCartKey ? t("saveChange") : t("add")} <span>→</span></button>
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
      <p class="finish">${t("finish")}: <strong>${item.finish}</strong></p>
      <div class="card-actions">
        <button class="add-button" type="button" data-open-signature="${item.id}">${t("adjust")}</button>
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
    cartItems.innerHTML = `<div class="empty-state">${t("emptyCart")}</div>`;
  } else {
    cartItems.innerHTML = lines.map((item) => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <p>${item.details ? `${item.details} · ` : ""}${money.format(item.price)} ${t("each")}</p>
          ${item.config ? `<button class="cart-edit" type="button" data-edit="${item.key}">${t("edit")}</button>` : ""}
        </div>
        <div class="qty" aria-label="Aantal ${item.name}">
          <button class="qty-button" type="button" data-minus="${item.key}" aria-label="${t("decrease")}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" type="button" data-plus="${item.key}" aria-label="${t("increase")}">+</button>
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
    document.querySelector("#ordersList").innerHTML = `<div class="empty-state">${t("noOrders")}</div>`;
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
  form.querySelector(".builder-submit").innerHTML = `${editingCartKey ? t("saveChange") : t("add")} <span>→</span>`;
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
    showToast(t("chooseBaseProtein"));
    return;
  }

  const extrasText = extras.length ? `${t("extras")}: ${extras.map((item) => `${item.name} ${money.format(item.price)}`).join(", ")}` : t("noExtras");
  const toppingsText = toppings.length ? toppings.join(", ") : t("noToppings");
  const saucesText = saucesChosen.length ? saucesChosen.join(", ") : t("noSauce");

  saveCartLine({
    key: `custom-${size}-${base}-${protein}-${toppings.join("-")}-${saucesChosen.join("-")}-${finish || "geen-afwerking"}-${extras.map((item) => item.name).join("-")}`.toLowerCase().replaceAll(" ", "-"),
    id: "custom-bowl",
    category: "bowl",
    name: `Make Your Own Bowl ${size}`,
    details: `${base}, ${protein}, toppings: ${toppingsText}, sauzen: ${saucesText}, afwerking: ${finish || t("noFinish")}. ${extrasText}`,
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
  const extrasText = extras.length ? `${t("extras")}: ${extras.map((extra) => `${extra.name} ${money.format(extra.price)}`).join(", ")}` : t("noExtras");

  if (!base || !sauce) {
    showToast(t("chooseBaseSauce"));
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
    showToast(t("addProductFirst"));
    return;
  }

  if (!canAcceptOrdersNow()) {
    showToast(t("closedOrder"));
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
    showToast(t("invalidTime"));
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
    showToast(t("creatingPayment"));
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
    showToast(t("sendingOrder"));
    const response = await fetch("/api/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || t("orderSendError"));
    }

    cart = [];
    renderCart();
    orderForm.reset();
    renderOrderTimeOptions();
    updateDeliveryAddressVisibility();
    const mailMessage = order.customer.method === "Levering"
      ? t("orderReceivedDelivery")
      : t("orderReceived");
    showToast(mailMessage);
  } catch (error) {
    showToast(`Bestelling niet doorgestuurd: ${error.message}`);
  }
}

paymentChoice?.addEventListener("change", () => {
  updateCheckoutButtonLabel();
});

orderMethod?.addEventListener("change", updateDeliveryAddressVisibility);

languageSelect?.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  renderSignatures();
  renderCart();
  renderOrders();
  renderOrderTimeOptions();
  updateLocationStatus();
  updateCheckoutButtonLabel();
});

async function checkDeliveryAddress(address) {
  if (address.length < 6) {
    showToast(t("fullAddress"));
    return false;
  }

  try {
    showToast(t("checkingAddress"));
    const response = await fetch("/api/check-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address })
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      showToast(data.error || t("deliveryZoneError"));
      return false;
    }

    showToast(t("deliveryOk", { distance: data.distanceKm }));
    return true;
  } catch (error) {
    showToast(t("addressCheckUnavailable"));
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
updateDeliveryAddressVisibility();
const savedLanguage = localStorage.getItem("loadedBowlsLanguage") || "nl";
if (languageSelect) languageSelect.value = savedLanguage;
applyLanguage(savedLanguage);
updateCheckoutButtonLabel();
showClosedModalIfNeeded();
renderCart();
renderOrders();
