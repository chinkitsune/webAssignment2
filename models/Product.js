import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        enum: ['baby', 'kid','woman','man'],
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    material:{
        type: String,
        required: true,
    },
    size:{
        type: [String],
        enum: ['S', 'M', 'L','XS','XL'],
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
