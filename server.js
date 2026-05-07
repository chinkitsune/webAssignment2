/**
 * Author : Younghoon
 */
import express from 'express';
import session  from 'express-session';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js'
import pageRouter from './routes/pageRoutes.js'
import productRoutes from './routes/shopRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import backupRoutes from './routes/backup.js'

const app = express();

// Logging middleware, this is only for dubugging purpose.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} //need to set true if using HTTPS.
}));


app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    
    // Log response when it's finished
    res.on('finish', () => {
        console.log(`[${timestamp}] Response: ${res.statusCode}`);
    });
    
    next();
});

//use static middleware.
app.use(express.static('public'));
app.set("view engine","pug");
app.use('/',userRouter);
app.use('/',productRouter);
app.use('/',pageRouter);
// Mount the route handlers
app.use('/', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/backup',backupRoutes)

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});