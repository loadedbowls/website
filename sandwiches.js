// Toppings follow the corresponding bowl, including CMS updates.
const sandwiches = [
  { id: 'sandwich-falafel', image: 'assets/sandwich-falafel.jpg', name: 'Falafel Fresh', bowlId: 'loaded-falafel', price: 7 },
  { id: 'sandwich-kebab', image: 'assets/sandwich-kebab.jpg', name: 'The Kebab', bowlId: 'loaded-kebab', price: 7.9 },
  { id: 'sandwich-chicken-kebab', image: 'assets/sandwich-chicken-kebab.jpg', name: 'Spicy Chicken Kebab', bowlId: 'loaded-chicken-kebab', price: 7.9 },
  { id: 'sandwich-pulled', image: 'assets/sandwich-pulled.jpg', name: 'BBQ Pulled', bowlId: 'loaded-pulled-chicken', price: 8.5 },
  { id: 'sandwich-crispy', image: 'assets/sandwich-crispy.jpg', name: 'The Crispy', bowlId: 'loaded-crispy-chicken', price: 9 }
];
const sandwichUpgrades = [
  { name: '', label: 'Geen extra', price: 0 },
  { name: 'Fries inside', label: 'Fries inside', price: 1 },
  { name: 'Add Bacon', label: 'Add Bacon', price: 1.5 },
  { name: 'Fully Loaded', label: 'Fully Loaded (fries + bacon)', price: 2 }
];
const sandwichBowlDefaults = new Map(signatures.map(bowl => [bowl.id, JSON.parse(JSON.stringify(bowl))]));
function sandwichBowl(item) { return signatures.find(bowl => bowl.id === item.bowlId) || sandwichBowlDefaults.get(item.bowlId); }
function sandwichToppings(item) { return sandwichBowl(item).chips.slice(1); }
function renderSandwiches() {
  document.getElementById('sandwichGrid').innerHTML = sandwiches.map(item => `
    <article class="sandwich-card">${item.image ? `<img class="menu-product-photo" src="${item.image}" alt="${item.name}" loading="lazy">` : ''}
      <h3>${item.name}</h3><strong>${money.format(item.price)}</strong>
      <p>${sandwichBowl(item).protein} · ${sandwichToppings(item).join(' · ')} · ${sandwichBowl(item).finish}</p>
      <small>Saus naar keuze</small>
      <button type="button" class="add-button" data-open-sandwich="${item.id}">Kies je sandwich</button>
    </article>`).join('');
}
function renderSandwichModal(item, config = {}) {
  const bowl = sandwichBowl(item);
  signatureModalTitle.textContent = item.name;
  signatureModalBody.innerHTML = `
    <form class="modal-form" id="sandwichChoiceForm" data-sandwich="${item.id}">
      <img class="menu-detail-photo" src="${item.image}" alt="${item.name}">
      <div class="modal-summary"><strong>${money.format(item.price)} · ${bowl.protein}</strong>
      <span>${sandwichToppings(item).join(' · ')} · ${bowl.finish}</span></div>
      <label>Saus naar keuze<select name="sauce" required>
        <option value="" disabled ${config.sauce ? '' : 'selected'}>Kies je saus</option>
        ${sauces.map(sauce => `<option value="${sauce}"${optionSelected(sauce, config.sauce)}>${sauce}</option>`).join('')}
      </select></label>
      <label>Make it loaded<select name="upgrade">
        ${sandwichUpgrades.map(extra => `<option value="${extra.name}"${optionSelected(extra.name, config.upgrade || '')}>${extra.label}${extra.price ? ' + ' + money.format(extra.price) : ''}</option>`).join('')}
      </select></label>
      <button class="primary-btn builder-submit" type="submit">${editingCartKey ? t('saveChange') : t('add')} <span>→</span></button>
    </form>`;
}
document.getElementById('sandwichGrid').addEventListener('click', event => {
  const button = event.target.closest('[data-open-sandwich]');
  if (!button) return;
  const item = sandwiches.find(item => item.id === button.dataset.openSandwich);
  if (!item) return;
  editingCartKey = '';
  renderSandwichModal(item);
  openModal(signatureModal);
});
signatureModalBody.addEventListener('submit', event => {
  const form = event.target.closest('#sandwichChoiceForm');
  if (!form) return;
  event.preventDefault();
  const item = sandwiches.find(item => item.id === form.dataset.sandwich);
  const data = new FormData(form);
  const sauce = data.get('sauce');
  const extra = sandwichUpgrades.find(extra => extra.name === data.get('upgrade'));
  if (!item || !sauces.includes(sauce) || !extra || !form.reportValidity()) return;
  const bowl = sandwichBowl(item);
  saveCartLine({
    key: `${item.id}-${sauce}-${extra.name}`.toLowerCase().replaceAll(' ', '-'),
    id: item.id, category: 'sandwich', name: item.name,
    details: `Sandwich · ${bowl.protein} · ${sandwichToppings(item).join(', ')} · ${bowl.finish}. Saus: ${sauce}. ${extra.name || 'Geen extra'}`,
    price: item.price + extra.price,
    config: { type: 'sandwich', sandwichId: item.id, sauce, upgrade: extra.name,
      basePrice: item.price, extras: extra.name ? [{ name: extra.name, price: extra.price }] : [] }
  });
  closeModal(signatureModal);
});
renderSandwiches();

const snacks = [
  { id: 'snack-chicken-nuggets', image: 'assets/snack-chicken-nuggets.png', name: 'Chicken Nuggets', quantity: '6 stuks', price: 4 },
  { id: 'snack-chili-cheese', image: 'assets/snack-chili-cheese.png', name: 'Chili Cheese Nuggets', quantity: '6 stuks', price: 4.5 },
  { id: 'snack-mozzarella', image: 'assets/snack-mozzarella.png', name: 'Mozzarella Sticks', quantity: '5 stuks', price: 4.5 },
  { id: 'snack-onion-rings', image: 'assets/snack-onion-rings.png', name: 'Onion Rings', quantity: '6–8 stuks', price: 3.5 },
  { id: 'snack-tenders', image: 'assets/snack-tenders.png', name: 'Chicken Tenders', quantity: '3 stuks', price: 5.5 },
  { id: 'snack-hot-wings', image: 'assets/snack-hot-wings.png', name: 'Hot Chicken Wings', quantity: '5 stuks', price: 5.5 },
  { id: 'snack-mix-box', name: 'Loaded Mix Box', quantity: '13 stuks', price: 10.9, includedSauces: 2,
    description: '3 Chicken Nuggets · 3 Chili Cheese Nuggets · 3 Mozzarella Sticks · 4 Onion Rings' }
];
document.getElementById('snackGrid').innerHTML = snacks.map(item => `
  <article class="sandwich-card">${item.image ? `<img class="menu-product-photo" src="${item.image}" alt="${item.name}" loading="lazy">` : ''}<h3>${item.name}</h3><strong>${money.format(item.price)}</strong>
  <p>${item.quantity}${item.description ? ' · ' + item.description : ''}</p>
  ${item.includedSauces ? '<small>2 sauzen naar keuze inbegrepen</small>' : ''}
  <button class="add-button" type="button" data-open-snack="${item.id}">Kies je snack</button></article>`).join('');
function renderSnackModal(item, config = {}) {
  signatureModalTitle.textContent = item.name;
  const sauceSelect = (name, title, required, selected) => `<label>${title}<select name="${name}" ${required ? 'required' : ''}>
    <option value="" ${required ? 'disabled' : ''} ${selected ? '' : 'selected'}>${required ? 'Kies je saus' : 'Geen extra saus'}</option>
    ${sauces.map(sauce => `<option value="${sauce}"${optionSelected(sauce, selected)}>${sauce}</option>`).join('')}
    </select></label>`;
  signatureModalBody.innerHTML = `<form class="modal-form" id="snackChoiceForm" data-snack="${item.id}">
    ${item.image ? `<img class="menu-detail-photo" src="${item.image}" alt="${item.name}">` : ''}
    <div class="modal-summary"><strong>${item.quantity} · ${money.format(item.price)}</strong><span>${item.description || ''}</span></div>
    ${item.includedSauces ? sauceSelect('sauce1', 'Inbegrepen saus 1', true, config.sauce1) + sauceSelect('sauce2', 'Inbegrepen saus 2', true, config.sauce2) : ''}
    ${sauceSelect('extraSauce', 'Extra saus (+ €0,70)', false, config.extraSauce)}
    <button type="submit" class="primary-btn builder-submit">${editingCartKey ? t('saveChange') : t('add')} <span>→</span></button></form>`;
}
document.getElementById('snackGrid').addEventListener('click', event => {
  const button = event.target.closest('[data-open-snack]');
  if (!button) return;
  const item = snacks.find(item => item.id === button.dataset.openSnack);
  if (!item) return;
  editingCartKey = ''; renderSnackModal(item); openModal(signatureModal);
});
signatureModalBody.addEventListener('submit', event => {
  const form = event.target.closest('#snackChoiceForm');
  if (!form) return;
  event.preventDefault();
  const item = snacks.find(item => item.id === form.dataset.snack);
  if (!item || !form.reportValidity()) return;
  const data = new FormData(form);
  const sauce1 = data.get('sauce1') || '', sauce2 = data.get('sauce2') || '', extraSauce = data.get('extraSauce') || '';
  if ([sauce1,sauce2,extraSauce].some(sauce => sauce && !sauces.includes(sauce))) return;
  if (item.includedSauces && (!sauce1 || !sauce2)) return;
  saveCartLine({
    key: `${item.id}-${sauce1}-${sauce2}-${extraSauce}`.toLowerCase().replaceAll(' ', '-'),
    id: item.id, category: 'snack', name: item.name,
    details: `${item.quantity}${item.description ? ': ' + item.description : ''}${item.includedSauces ? '. Inbegrepen sauzen: ' + sauce1 + ', ' + sauce2 : ''}${extraSauce ? '. Extra saus: ' + extraSauce + ' (+ €0,70)' : ''}`,
    price: Math.round((item.price + (extraSauce ? 0.7 : 0))*100)/100,
    config: { type: 'snack', snackId: item.id, sauce1, sauce2, extraSauce }
  });
  closeModal(signatureModal);
});

// Native swipe scrolling, keyboard support and accessible arrow controls.
for (const id of ['signatureGrid','sandwichGrid','snackGrid']) {
  const shelf = document.getElementById(id);
  const buttons = [...document.querySelectorAll(`[data-target="${id}"]`)];
  const update = () => buttons.forEach(button => {
    button.disabled = Number(button.dataset.slide) < 0 ? shelf.scrollLeft < 2 : shelf.scrollLeft + shelf.clientWidth >= shelf.scrollWidth - 2;
  });
  const slide = direction => shelf.scrollBy({left:direction * ((shelf.firstElementChild?.getBoundingClientRect().width || 250) + parseFloat(getComputedStyle(shelf).columnGap)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  buttons.forEach(button => button.addEventListener('click',()=>slide(Number(button.dataset.slide))));
  shelf.addEventListener('keydown',event=>{if(event.target===shelf && ['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();slide(event.key==='ArrowRight'?1:-1);}});
  shelf.addEventListener('scroll',update,{passive:true});
  new ResizeObserver(update).observe(shelf);
  new MutationObserver(update).observe(shelf,{childList:true});
  update();
}

