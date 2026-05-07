// public/js/main.js
// main entry point

import { initializeProductDisplay } from './product.js';
import { initializeCart, addToCart, setupCartToggle, submitOrder } from './cart.js';




document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed. Initializing client-side scripts...');

    // fetch products data
    let allProductsData = [];

    try {
        // Centralized fetching of all product data
        console.log("main.js: Fetching all product data...");
        const response = await fetch('/api/shop/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // convert JSON (string) → JavaScript object
        allProductsData = await response.json();
        console.log("main.js: Products fetched successfully:", allProductsData.length, "items.");

        // Initialize product and cart
        initializeProductDisplay(allProductsData);
        initializeCart(allProductsData);
        setupCartToggle();

        const submitBtn = document.getElementById('submitOrderBtn');
        const orderMessage = document.getElementById('orderMessage');

        if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const result = await submitOrder();

        if (result.success) {
            orderMessage.textContent = `✅ Order placed! ID: ${result.orderId}`;
            orderMessage.style.color = 'green';
        } else {
            orderMessage.textContent = `❌ ${result.message}`;
            orderMessage.style.color = 'red';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Order';
    });
}

    } catch (error) {
        console.error('main.js: Error fetching or initializing data:', error);
        // Display an error message for users if products cannot be loaded
        const mainContent = document.getElementById("mainContent");
        if (mainContent) {
            mainContent.innerHTML = "<p >Failed to load products. Please try again later.</p>";
        }
    }




    // Event Listener for "Add to Cart" Buttons 
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.addEventListener('click', (event) => {
            const target = event.target;
            // Check if the clicked element is an "Add to Cart" button
            if (target.classList.contains('add-to-cart-btn')) {
                // Ensure data-product-id is an integer
                const buttonId = target.id;
                const productId = target.dataset.id;

                if (productId) {
                    console.log(`Add to cart: ${productId}`);
                    addToCart(productId);
                } else {
                    console.error("Invalid product ID");
                }
            }
        });
    } else {
        console.warn("#mainContent element not found. 'Add to Cart' buttons might not work.");
    }
});