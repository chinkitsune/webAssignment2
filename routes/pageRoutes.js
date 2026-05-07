/**
 * Author : Younghon Ok
 */
import express from 'express'
const router = express.Router();

router.get("/", async (req, res) => {
    res.render("index", {});
});

router.get("/all", async (req, res) => {
    res.render("all", {});
});

router.get("/login", async (req, res) => {
    res.render("login");
})

router.get("/product_manage", async (req, res) => {
    res.render("product_manage");
})

router.get("/search", async (req, res) => {
    res.render("search");
})

router.get("/createaccount", async (req, res) => {
    res.render("createaccount");
})


router.get("/contact", async(req,res)=>{
    res.render("contact");
    // console.log("hello");
    // res.status(200).json({res:"success"});
})
export default router;