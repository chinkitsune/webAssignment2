// routes/cartRoutes.js
import express from 'express';
import {addToCart, changeQuantity, getCart} from '../data/cart.js'
const router = express.Router();

// Add item to cart
router.post('/add', (req, res) => {
    const { id } = req.body;
    const updatedCart = addToCart(id);
    res.json(updatedCart);
});

// Change item quantity in cart
router.post('/change', (req, res) => {
    const { id, amount } = req.body;
    const updatedCart = changeQuantity(id, amount);
    res.json(updatedCart);
});

// Get current cart contents
router.get('/', (req, res) => {
    res.json(getCart());
});

export default router; // Export the router