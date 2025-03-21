/*
/ DECLARACIÓN DE VARIABLES
*/
let cart = {
    items: [],
    total: 0
};
const cartIcon = document.getElementById('cartIcon');
const cartContainer = document.getElementById('cartContainer');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');



// Cargar carrito desde localStorage si existe
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Abrir carrito
function openCart() {
    cartContainer.classList.add('active');
    overlay.classList.add('active');
}

// Cerrar carrito
function closeCartFunc() {
    cartContainer.classList.remove('active');
    overlay.classList.remove('active');
}

// Añadir producto al carrito
function addToCart(id, name, price, image, description) {
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.items.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Incrementar cantidad si ya existe
        cart.items[existingItemIndex].quantity++;
    } else {
        // Añadir nuevo item si no existe
        cart.items.push({
            id: id,
            name: name,
            price: price,
            image: image,
            description: description,
            quantity: 1
        });
    }
    
    // Actualizar el total
    updateCartTotal();
    
    // Actualizar la UI
    updateCartUI();
    
    // Guardar en localStorage
    saveCart();
    
    // Mostrar el carrito
    openCart();
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart.items = cart.items.filter(item => item.id !== id);
    updateCartTotal();
    updateCartUI();
    saveCart();
}

// Incrementar cantidad de un producto
function increaseQuantity(id) {
    const item = cart.items.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCartTotal();
        updateCartUI();
        saveCart();
    }
}

// Decrementar cantidad de un producto
function decreaseQuantity(id) {
    const item = cart.items.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartTotal();
        updateCartUI();
        saveCart();
    } else if (item && item.quantity === 1) {
        removeFromCart(id);
    }
}

// Actualizar el total del carrito
function updateCartTotal() {
    cart.total = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Actualizar la UI del carrito
function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.items.reduce((count, item) => count + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Actualizar total
    cartTotalElement.textContent = cart.total;
    
    // Actualizar items
    cartItemsContainer.innerHTML = '';
    
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-price">$${item.price}</div>
                <div class="item-controls">
                    <div class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                        <span class="material-symbols-outlined">remove_circle</span>
                    </div>
                    <span class="item-quantity">${item.quantity}</span>
                    <div class="quantity-btn" onclick="increaseQuantity(${item.id})">
                        <span class="material-symbols-outlined">add_circle</span>
                    </div>
                    <div class="remove-item" onclick="removeFromCart(${item.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Finalizar compra
function checkout() {
    alert('¡Gracias por tu compra! Total: $' + cart.total);
    cart.items = [];
    cart.total = 0;
    updateCartUI();
    saveCart();
    closeCartFunc();
}

// Event Listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFunc);
overlay.addEventListener('click', closeCartFunc);
checkoutBtn.addEventListener('click', checkout);

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', loadCart);