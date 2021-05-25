const express = require('express');

const Product = require('../modules/productsModel')
const router = express.Router();

// Token
const jwt = require('jsonwebtoken')


router.get('/api/products', async (req, res) => {

    //Hittar alla produkter
    const allProducts = await Product.find({})

    //Skickar tillbaka alla produkter
    res.json(allProducts)
})


// router.patch('/api/products/:id', async (req, res) => {

//     if (!req.cookies['auth-token']) {
//         res.send('Bara för inloggad ADMIN')
//     } else {

//         const token = req.cookies['auth-token']
//         jwt.verify(token, process.env.SECRET, (err, payload) => {
//             if (err) {
//                 res.json(err)
//             } else {

//             }
//         })
//     }


// })



module.exports = router