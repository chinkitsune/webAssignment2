// routes/shopRoutes.js
import express from 'express';
import { getProductByCategory } from '../models/mongoosedb.js';
// const express = require('express');
const router = express.Router();


import allProducts from '../data/products.js'; 

// Homepage: Renders the actual Pug page
router.get('/', async (req, res) => {
        try {
        const [, products] = await getProductByCategory(0, 100);
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Failed to load products');
    }
});


router.get('/api/shop/products', async (req, res) => {
    try {
        const [, products] = await getProductByCategory(0, 100);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load products' });
    }
})

export default router;