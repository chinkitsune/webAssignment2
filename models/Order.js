// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    name:      { type: String, required: true },
    price:     { type: Number, required: true },
    quantity:  { type: Number, required: true, min: 1 },
    image:     { type: String }
});

const orderSchema = new mongoose.Schema({
    // Later your classmate can link this to a real User document
    userId:    { type: String, default: 'guest' },
    items:     { type: [orderItemSchema], required: true },
    subtotal:  { type: Number, required: true },
    tax:       { type: Number, required: true },
    total:     { type: Number, required: true },
    status:    { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;