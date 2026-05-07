/**
 * Author : Younghoon Ok
 */
import express from 'express'
import multer from 'multer';
import { addProduct, getProduct, updateProduct, findProductById} from '../models/mongoosedb.js';
import fs from 'node:fs/promises';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.post('/products', upload.single('productImage'), async (req, res) => {
    try {
        const {productName, productDescription, productPrice, productCategory, productAge, 
            productColor, productMaterial, productSize} = req.body;
        const srcPath = req.file.path;
        const homeRoot = "./public";
        const targetPath = "product_images";
        const dstPath = path.join(homeRoot,targetPath,path.basename(req.file.filename));
        const pathForDB = path.join(targetPath,path.basename(req.file.filename));
        console.log(srcPath + "--->" + dstPath);
        await fs.mkdir(targetPath, { recursive: true });
        await fs.rename(srcPath,dstPath);
        const newProduct = await addProduct(productName,productDescription,productPrice,pathForDB, 
            productCategory, productAge, productColor, productMaterial, productSize);
        /**
         * Instead of using other json fields, I use mongodb's document.
         * It's better to track down the product id and other information
         * dynamically. If the schema will change, the returned json format 
         * will be different.
         */
        res.status(200).json({ res: 'success', product: newProduct });
    } catch (error) {
        // res.status(499).json({ res: 'failed', reason: 'unknown error' });
        console.log(error);
        res.status(499).json({ res: 'failed'});
    }
});

router.get('/products', async (req, res) => {
    try {
        const { start, limit, keyword} = req.query;
        console.log(`start: ${start}, limit: ${limit}, keyword: ${keyword}`);
        const data = await getProduct(start,limit,keyword);
        res.status(200).json({ 
            res: 'success', 
            data: data
        });
    }catch(error){
        console.log(error);
        res.status(403).json({ res: 'failed', reason: 'unknown error' });
    }
});

// router.put('/products',async (req, res) => { // not working because I am using multer.
router.put('/products/:productId', upload.single('modify-productImage'),async (req, res) => {
    try {
        console.log(req.params.productId);
        console.log(req.body);
        const srcPath = req.file?.path;
        const homeRoot = "./public";
        const targetPath = "product_images";
        let dstPath;
        let pathForDB;
        //the cient someties doesn't want to update the existing image file.
        if(srcPath != undefined)
        {
            //if the user wants to update image file as well.
            dstPath = path.join(homeRoot,targetPath,path.basename(req.file.filename));
            console.log(srcPath + "--->" + dstPath);
            await fs.mkdir(targetPath, { recursive: true });
            await fs.rename(srcPath,dstPath);
            pathForDB = path.join(targetPath,path.basename(req.file.filename));
        }else{
            //if the user doesn't want to update image file.
            dstPath = undefined;
            pathForDB = undefined;
        }
        if(srcPath != undefined)
        {
            //remove the old file used before updating database.
            let oldProductInfo = await findProductById(req.params.productId);
            let oldImagePath = oldProductInfo.image;
            console.log(oldImagePath);
            try{
                await fs.unlink(path.join(homeRoot,oldImagePath));
            }catch(error)
            {
                console.log(error);
            }
        }
        //update database and return the result for the client to udpate its information.
        const updatedProduct = await updateProduct(req.params.productId,req.body.productName,req.body.productDescription,
            req.body.productPrice,pathForDB, req.body.productCategory, req.body.productAge, 
            req.body.productColor, req.body.ProductMaterial, req.body.productSize);
        res.status(200).json({ res: 'success', product: updatedProduct });
    }catch(error){
        console.log(error);
    }
});
 
export default router;