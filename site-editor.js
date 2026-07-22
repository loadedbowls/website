(function () {
  const editorMode = new URLSearchParams(window.location.search).get("editor") === "1";
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const contentDefaults = {};

  document.querySelectorAll("[data-cms-key]").forEach((element) => {
    const type = element.dataset.cmsType || "text";
    contentDefaults[element.dataset.cmsKey] = {
      label: element.dataset.cmsLabel || element.dataset.cmsKey,
      type,
      value: type === "image" ? element.getAttribute("src") : type === "html" ? element.innerHTML : element.textContent.trim()
    };
  });

  function currentDefaults() {
    return {
      version: 1,
      content: clone(contentDefaults),
      products: clone(signatures),
      lists: {
        bases: bases.map((name) => ({ name, price: 0, active: true })),
        sauces: sauces.map((name) => ({ name, price: 0, active: true })),
        proteins: clone(signatureExtras.protein),
        toppings: clone(signatureExtras.toppings),
        extraSauces: clone(signatureExtras.sauces),
        finishes: clone(signatureExtras.finish),
        desserts: clone(desserts),
        drinks: clone(drinks)
      },
      hours: clone(openingHours)
    };
  }

  let siteConfig = currentDefaults();

  function mergeConfig(remote) {
    if (!remote || typeof remote !== "object") return currentDefaults();
    const defaults = currentDefaults();
    return {
      ...defaults,
      ...remote,
      content: { ...defaults.content, ...(remote.content || {}) },
      products: Array.isArray(remote.products) ? remote.products : defaults.products,
      lists: { ...defaults.lists, ...(remote.lists || {}) },
      hours: { ...defaults.hours, ...(remote.hours || {}) }
    };
  }

  function replaceArray(target, values) {
    target.splice(0, target.length, ...clone(values || []));
  }

  function activeNames(rows) {
    return (rows || []).filter((row) => row.active !== false).map((row) => String(row.name || "").trim()).filter(Boolean);
  }

  function optionRows(rows, emptyLabel, includePrice = false) {
    return `<option value="">${emptyLabel}</option>${(rows || []).filter((row) => row.active !== false).map((row) => {
      const name = String(row.name || "").replace(/^Extra\s+/i, "");
      const price = Number(row.price || 0);
      return `<option value="${name}" data-price="${includePrice ? price : 0}">${name}${includePrice && price ? ` +${money.format(price)}` : ""}</option>`;
    }).join("")}`;
  }

  function refreshBuilderOptions(config) {
    const lists = config.lists || {};
    document.querySelectorAll('select[name="base"]').forEach((select) => {
      select.innerHTML = optionRows(lists.bases, "Maak je keuze");
    });
    document.querySelectorAll('select[name="protein"]').forEach((select) => {
      select.innerHTML = optionRows(lists.proteins, "Maak je keuze");
    });
    document.querySelectorAll('select[name^="topping"]').forEach((select) => {
      select.innerHTML = optionRows(lists.toppings, "Jouw keuze");
    });
    document.querySelectorAll('select[name="sauce"], select[name^="sauce1"], select[name^="sauce2"]').forEach((select) => {
      select.innerHTML = optionRows(lists.sauces, "Jouw keuze");
    });
    document.querySelectorAll('select[name="finish"]').forEach((select) => {
      select.innerHTML = optionRows(lists.finishes, "Geen afwerking");
    });
    const extras = {
      extraProtein: lists.proteins,
      extraTopping: lists.toppings,
      extraSauce: lists.extraSauces,
      extraFinish: lists.finishes
    };
    Object.entries(extras).forEach(([name, rows]) => {
      document.querySelectorAll(`select[name="${name}"]`).forEach((select) => {
        select.innerHTML = optionRows(rows, "Geen extra", true);
      });
    });
  }

  function applyConfig(config, notify = false) {
    siteConfig = mergeConfig(config);
    Object.entries(siteConfig.content || {}).forEach(([key, entry]) => {
      const element = document.querySelector(`[data-cms-key="${CSS.escape(key)}"]`);
      if (!element || !entry) return;
      if (entry.type === "image") element.setAttribute("src", entry.value || "");
      else if (entry.type === "html") element.innerHTML = entry.value || "";
      else element.textContent = entry.value || "";
    });

    replaceArray(signatures, siteConfig.products);
    replaceArray(bases, activeNames(siteConfig.lists.bases));
    replaceArray(sauces, activeNames(siteConfig.lists.sauces));
    replaceArray(signatureExtras.protein, siteConfig.lists.proteins);
    replaceArray(signatureExtras.toppings, siteConfig.lists.toppings);
    replaceArray(signatureExtras.sauces, siteConfig.lists.extraSauces);
    replaceArray(signatureExtras.finish, siteConfig.lists.finishes);
    replaceArray(desserts, siteConfig.lists.desserts);
    replaceArray(drinks, siteConfig.lists.drinks);
    Object.assign(openingHours, clone(siteConfig.hours));
    const paymentPeriods = openingHours.paymentSchedule?.[1] || [];
    const slotPeriods = openingHours.slotSchedule?.[1] || [];
    openingHours.label = `ma-za ${paymentPeriods.map((period) => `${period.open} - ${period.close}`).join(" en ")}, zondag gesloten`;
    openingHours.orderLabel = `beschikbare tijdstippen: ${slotPeriods.map((period) => `${period.open} - ${period.close}`).join(" en ")}`;
    document.querySelectorAll('[data-cms-hours-display="payment"]').forEach((element) => {
      element.textContent = paymentPeriods.map((period) => `${period.open} — ${period.close}`).join(" / ");
    });
    refreshBuilderOptions(siteConfig);
    renderSignatures();
    renderSimpleList(dessertList, desserts);
    renderSimpleList(drinkList, drinks);
    renderOrderTimeOptions();
    updateLocationStatus();
    updateHoursNote();
    if (notify && window.parent !== window) {
      window.parent.postMessage({ type: "loaded-cms-config", config: clone(siteConfig) }, "*");
    }
  }

  function selectionFor(element) {
    const content = element.closest("[data-cms-key]");
    if (content) {
      const key = content.dataset.cmsKey;
      return { kind: "content", key, data: clone(siteConfig.content[key]) };
    }
    const product = element.closest("[data-cms-product]");
    if (product) {
      const id = product.dataset.cmsProduct;
      return { kind: "product", key: id, data: clone(siteConfig.products.find((item) => item.id === id)) };
    }
    if (element.closest('[data-cms-settings="hours"]')) {
      return { kind: "hours", key: "hours", data: clone(siteConfig.hours) };
    }
    if (element.closest("#dessertList")) return { kind: "list", key: "desserts", data: clone(siteConfig.lists.desserts) };
    if (element.closest("#drinkList")) return { kind: "list", key: "drinks", data: clone(siteConfig.lists.drinks) };
    const select = element.closest("select");
    if (!select) return null;
    const map = {
      base: "bases", protein: "proteins", topping1: "toppings", topping2: "toppings", topping3: "toppings",
      sauce: "sauces", sauce1: "sauces", sauce2: "sauces", finish: "finishes",
      extraProtein: "proteins", extraTopping: "toppings", extraSauce: "extraSauces", extraFinish: "finishes"
    };
    const key = map[select.name];
    return key ? { kind: "list", key, data: clone(siteConfig.lists[key]) } : null;
  }

  function setSelectedElement(element) {
    document.querySelectorAll(".cms-selected").forEach((item) => item.classList.remove("cms-selected"));
    const target = element.closest("[data-cms-key], [data-cms-product], #dessertList, #drinkList, label") || element;
    target.classList.add("cms-selected");
  }

  if (editorMode) {
    document.documentElement.classList.add("cms-editor-mode");
    const style = document.createElement("style");
    style.textContent = `
      .cms-editor-mode [data-cms-key], .cms-editor-mode [data-cms-product],
      .cms-editor-mode #dessertList, .cms-editor-mode #drinkList, .cms-editor-mode [data-cms-settings],
      .cms-editor-mode .modal-form label { cursor: pointer !important; }
      .cms-editor-mode [data-cms-key]:hover, .cms-editor-mode [data-cms-product]:hover,
      .cms-editor-mode #dessertList:hover, .cms-editor-mode #drinkList:hover, .cms-editor-mode [data-cms-settings]:hover,
      .cms-editor-mode .modal-form label:hover { outline: 2px solid #f6b82e; outline-offset: 4px; }
      .cms-editor-mode .cms-selected { outline: 3px solid #81d889 !important; outline-offset: 5px; }
      .cms-editor-mode::before { content: "KLIK OP EEN ONDERDEEL OM TE WIJZIGEN"; position: fixed; z-index: 9998; left: 14px; bottom: 14px; padding: 10px 14px; background: #f6b82e; color: #07101b; font: 900 11px/1 Arial,sans-serif; letter-spacing: .08em; border-radius: 5px; }
    `;
    document.head.appendChild(style);
    document.addEventListener("click", (event) => {
      const selection = selectionFor(event.target);
      if (!selection) return;
      event.preventDefault();
      event.stopPropagation();
      setSelectedElement(event.target);
      window.parent.postMessage({ type: "loaded-cms-selected", selection }, "*");
    }, true);
  }

  window.addEventListener("message", (event) => {
    const message = event.data || {};
    if (message.type === "loaded-cms-apply" && message.config) applyConfig(message.config);
    if (message.type === "loaded-cms-select-list") {
      const key = message.key;
      window.parent.postMessage({ type: "loaded-cms-selected", selection: { kind: "list", key, data: clone(siteConfig.lists[key] || []) } }, "*");
    }
  });

  languageSelect?.addEventListener("change", () => window.setTimeout(() => applyConfig(siteConfig), 0));

  fetch("/api/site-config", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("Webshopinstellingen konden niet worden geladen.")))
    .then((result) => applyConfig(result.config || currentDefaults(), true))
    .catch(() => applyConfig(currentDefaults(), true));
})();
