// public/js/product.js
// This module handles product display, filtering, and navigation.

let allProducts = []; 
// Set "all" as initial category
// will be updated if users click to another category.
let currentCategoryFilter = "all"; 

/**
 * initializes the display and sets up navigation links.
 */
export function initializeProductDisplay(data) {
    allProducts = data;
    displayProducts(currentCategoryFilter);
    setupNavLinks();
}


/**
 * Displays products based on the given filter
 */
export function displayProducts(filter = currentCategoryFilter) {
    // Update the filter if passing kids or babies.
    currentCategoryFilter = filter; 

    const container = document.getElementById("mainContent");

    // Clear previous products
    container.innerHTML = ""; 

    let filtered = currentCategoryFilter === "all"
        ? allProducts
        : allProducts.filter(p => p.category === currentCategoryFilter);

    if (filtered.length === 0) {
        container.innerHTML = "<p>No products found for this category or search query.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Add a data attribute for the product ID, which main.js will use for 'Add to Cart'
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <p class="meta">${product.color}  &#9825; ${product.material}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

/**
 * Navigation links setting
 */
function setupNavLinks() {
    const navLinks = [
        { id: "allproductsLink", category: "all" },
        { id: "babiesLink", category: "baby" },
        { id: "kidsLink", category: "kid" }
    ];

    navLinks.forEach(link => {
        const el = document.getElementById(link.id);
        if (el) {
            el.addEventListener("click", (e) => {
                // update category without reloading the page
                e.preventDefault();
                displayProducts(link.category); 
            });
        } else {
            console.warn(`Navigation link with ID "${link.id}" not found.`);
        }
    });
}