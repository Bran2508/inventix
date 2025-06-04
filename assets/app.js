window.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  setupThemeToggle();

  // Product catalog rendering
  const catalogo = document.getElementById('catalogo-productos');
  if (!catalogo) return;

  productos.forEach(producto => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text"><strong>Duración:</strong> ${producto.duracion}</p>
        <div class="mt-auto">
          <p class="h5 text-primary mb-3">$${producto.precio.toFixed(2)}</p>
          <button class="btn btn-success w-100" onclick='addToCart({id: ${producto.id}, title: "${producto.nombre.replace(/"/g, '\\"')}", price: ${producto.precio}})'>Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
    catalogo.appendChild(col);
  });
});



// Theme toggle functionality (modo claro/oscuro)
function setupThemeToggle() {
  const themeCheckbox = document.getElementById('theme-toggle-checkbox');
  if (!themeCheckbox) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;

  function setTheme(dark) {
    if (dark) {
      body.classList.add('dark-mode');
      themeCheckbox.checked = true;
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      themeCheckbox.checked = false;
      localStorage.setItem('theme', 'light');
    }
  }

  // Initialize theme based on saved preference or system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  // Toggle theme when checkbox is changed
  themeCheckbox.addEventListener('change', () => {
    setTheme(themeCheckbox.checked);
  });
}


// --- Sidebar Cart Logic ---
const sidebarCart = document.getElementById('sidebar-cart');
const sidebarCartBackdrop = document.getElementById('sidebar-cart-backdrop');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartBtn = document.getElementById('open-cart-btn');// Botón para abrir el carrito

// Estado simple del carrito en memoria
let cart = [];

// Abrir carrito
function openCartSidebar() {
  sidebarCart.classList.add('open');
  sidebarCartBackdrop.classList.add('open');
  renderSidebarCart();
}

// Cerrar carrito
function closeCartSidebar() {
  sidebarCart.classList.remove('open');
  sidebarCartBackdrop.classList.remove('open');
}

// Eventos abrir/cerrar
cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openCartSidebar();
});
closeCartBtn.addEventListener('click', closeCartSidebar);
sidebarCartBackdrop.addEventListener('click', closeCartSidebar);

// Renderizar carrito
function renderSidebarCart() {
  const body = document.getElementById('sidebar-cart-body');
  const totalSpan = document.getElementById('sidebar-cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  if (cart.length === 0) {
    body.innerHTML = `<p class="text-center text-muted mt-4">Tu carrito está vacío.</p>`;
    totalSpan.textContent = '$0.00';
    checkoutBtn.disabled = true;
    return;
  }
  let total = 0;
  body.innerHTML = cart.map((item, idx) => {
    total += item.price * item.qty;
    return `
      <div class="sidebar-cart-item">
        <span class="sidebar-cart-item-title">${item.title}</span>
        <div class="sidebar-cart-item-qty">
          <button onclick="updateCartQty(${idx}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty(${idx}, 1)">+</button>
          <span class="ms-2 fw-semibold">$${(item.price * item.qty).toFixed(2)}</span>
          <button class="sidebar-cart-remove" onclick="removeCartItem(${idx})" title="Eliminar">&times;</button>
        </div>
      </div>
    `;
  }).join('');
  totalSpan.textContent = `$${total.toFixed(2)}`;
  checkoutBtn.disabled = false;
}

// Actualizar cantidad
window.updateCartQty = function (idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  renderSidebarCart();
};

// Eliminar item
window.removeCartItem = function (idx) {
  cart.splice(idx, 1);
  renderSidebarCart();
};

// Agregar producto al carrito (llámala desde tus tarjetas)
window.addToCart = function (product) {
  const idx = cart.findIndex(item => item.id === product.id);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderSidebarCart();
  openCartSidebar();
};

// Checkout (puedes personalizar)
document.getElementById('checkout-btn').addEventListener('click', function () {
  // Guarda el total actual para mostrarlo en el checkout
  const total = document.getElementById('sidebar-cart-total').textContent;
  localStorage.setItem('cartTotal', total);

  // (Opcional) Guarda los productos del carrito si quieres mostrarlos en el checkout
  localStorage.setItem('cartItems', JSON.stringify(cart));

  // Redirige a la página de checkout
  window.location.href = 'checkout.html';
});