/**
 * Author : Younghoon Ok
 */
import mongoose from 'mongoose';
import USER from './User.js';
import PRODUCT from './Product.js';
// import to handle order data
import ORDER from './Order.js';

mongoose.connect('mongodb://localhost:27017/mydb')

export async function addUser(userId,password,userName, points, phoneNumber, deposit){
    try{
        const newUser = new USER(
            {
                userId : userId,
                password : password,
                userName : userName,
                points : points,
                phoneNumber : phoneNumber,
                deposit : deposit
            }
        );
        await newUser.save();
        return newUser;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function findUserById(userId){
    try{
        const user = await USER.findOne({userId:userId});
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function addProduct(name, description, price, image, category, age, color, material, size) {
    try {
        const newProduct = new PRODUCT({
            name,
            description,
            price,
            image,
            category,
            age,
            color,
            material,
            size
        });
        await newProduct.save();
        return newProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateProduct(productId, name, description, price, image, category, age, color, material, size) {
    try {
        const updatedProduct = await PRODUCT.findByIdAndUpdate(
            productId,
            { name, description, price, image, category, age, color, material, size },
            { new: true }
        )
        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * To get a list of product starting from start
 * and total number of searched item does not exceed
 * number. 
 * @param {*} start 
 * @param {*} number 
 * @returns [total number of documents, [documents]]
 */
export async function getProduct(start, number, keyword = "") {
    try{
        const skip = Math.max(0,parseInt(start));
        const limit = Math.max(1,parseInt(number));
        const query = {
            $or: [
                /** $regex is used for pattern matching in MongoDB queries.
                 *  $options: 'i' makes the search case-insensitive.
                 */
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }
        const products = await Promise.all([
            PRODUCT.countDocuments(query),
            PRODUCT.find(query).skip(skip).limit(limit)
        ]);
        return products;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function findProductById(productId){
    try{
        const product = await PRODUCT.findById(productId);
        return product;
    }catch(error){
        console.log(error);
        throw error;
    }
}



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

export async function getProductByCategory(start, number, category = "") {
    try {
        const skip  = Math.max(0, parseInt(start));
        const limit = Math.max(1, parseInt(number));

        const query = {};

        // Only filter by category if one is provided
        if (category && category !== 'all') {
            query.category = category;
        }

        const products = await Promise.all([
            PRODUCT.countDocuments(query),
            PRODUCT.find(query).skip(skip).limit(limit)
        ]);

        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


