// routes/orderRoutes.js
import express from 'express';
import { saveOrder } from '../data/cart.js';

const router = express.Router();

// POST /order/submit
// Expects body: { items, subtotal, tax, total }
router.post('/submit', async (req, res) => {
    const { items, subtotal, tax, total } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    try {
        // If your classmate adds login later, replace 'guest' with req.session.userId
        const userId = req.session?.userId || 'guest';

        const savedOrder = await saveOrder({ userId, items, subtotal, tax, total });

        res.json({ success: true, orderId: savedOrder._id });
    } catch (error) {
        console.error('Order save failed:', error);
        res.status(500).json({ success: false, message: 'Failed to save order.' });
    }
});

export default router;