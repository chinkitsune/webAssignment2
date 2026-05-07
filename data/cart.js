// data/cart.js

import ORDER from '../models/Order.js';

let cart = []; // This will hold the server-side cart state

// Function to get the current cart
export function getCart() {
    return cart;
}

// Function to add an item to the cart
export function addToCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    return cart; // Return the updated cart
}

// Function to change the quantity of an item in the cart
export function changeQuantity(productId, amount) {
    const item = cart.find(i => i.id === productId);

    if (!item) {
        return cart; // Item not found, return current cart unchanged
    }

    item.quantity += amount;

    // Filter out items with quantity <= 0
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    return cart; // Return the updated cart
}

// Add this function
export async function saveOrder(orderData) {
    try {
        const newOrder = new ORDER(orderData);
        await newOrder.save();
        return newOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

