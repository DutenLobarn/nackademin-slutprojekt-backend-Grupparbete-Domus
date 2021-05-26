const express = require('express');

const Product = require('../modules/productsModel')
const router = express.Router();

// Token



router.get('/api/products', async (req, res) => {

    //Hittar alla produkter
    const allProducts = await Product.find({})

    //Skickar tillbaka alla produkter
    res.json(allProducts)
})






module.exports = router