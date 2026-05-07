let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
let productsData = []; // To store the reference list

export function initializeCart(products) {
    productsData = products;
    updateUI();
}

export function addToCart(productId) {
    // Find the product details from our master list
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateUI();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateUI();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; 
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function updateUI() {
    const container = document.getElementById('cartItems');
    const template = document.getElementById('cartItemTemplate');
    if (!container || !template) return;

    container.innerHTML = ''; 

    cart.forEach(item => {
        const clone = template.content.cloneNode(true);

        // Image
        clone.querySelector('.item-img').src = item.image;

        // Name
        clone.querySelector('.item-name').textContent = item.name;

        // Single price
        clone.querySelector('.item-price-single').textContent =
            `$${item.price.toFixed(2)}`;

        // Quantity
        clone.querySelector('.item-qty').textContent = item.quantity;

        // Total price
        clone.querySelector('.item-total').textContent =
            `$${(item.price * item.quantity).toFixed(2)}`;

        // ➖ decrease
        clone.querySelector('.qty-minus').addEventListener('click', () => {
            item.quantity--;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== item.id);
            }
            updateUI();
        });

        // ➕ increase
        clone.querySelector('.qty-plus').addEventListener('click', () => {
            item.quantity++;
            updateUI();
        });

        container.appendChild(clone);
    });

    const totals = calculateTotals();
    document.getElementById('cartSubtotal').textContent = totals.subtotal.toFixed(2);
    document.getElementById('cartTax').textContent = totals.tax.toFixed(2);
    document.getElementById('cartTotal').textContent = totals.total.toFixed(2);

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}



export function setupCartToggle() {
    const cartWindow = document.getElementById('cartWindow');
    const cartIcon = document.getElementById('cartBtn'); 
    const closeBtn = document.getElementById('closeCart');

    if (cartIcon && cartWindow) {
        cartIcon.addEventListener('click', () => {
            cartWindow.classList.add('open'); 
        });
    }

    if (closeBtn && cartWindow) {
        closeBtn.addEventListener('click', () => {
            cartWindow.classList.remove('open');
        });
    }
}

// Add to the bottom of cart.js

export async function submitOrder() {
    if (cart.length === 0) {
        return { success: false, message: 'Your cart is empty!' };
    }

    const { subtotal, tax, total } = calculateTotals();

    // Build the payload — matches the Order schema
    const orderPayload = {
        items: cart.map(item => ({
            productId: item.id,
            name:      item.name,
            price:     item.price,
            quantity:  item.quantity,
            image:     item.image
        })),
        subtotal,
        tax,
        total
    };

    try {
        const response = await fetch('/order/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });

        const result = await response.json();

        if (result.success) {
            // Clear the cart after a successful order
            cart = [];
            localStorage.removeItem('shoppingCart');
            updateUI();
            return { success: true, orderId: result.orderId };
        } else {
            return { success: false, message: result.message };
        }
    } catch (error) {
        console.error('submitOrder error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}