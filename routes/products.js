const express = require('express');
const mongoose = require('mongoose');

const Product = require('../modules/productsModel')
const router = express.Router();

const User = require('../modules/usersModel')

// Token


let userid = '';

const verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token'];

    if (token) {
        jwt.verify(token, `${process.env.SECRET}`, (err, decodedPayload) => {
            if (err) {
                res.send(err)
            } else {
                userid = decodedPayload._id;
                next();
            }
        })
    } else {
        res.send('token not true')
    }
}

// Get-----------------------------------------

router.get('/api/products', verifyToken, async (req, res) => {

    //Hittar alla produkter
    const allProducts = await Product.find({})

    //Skickar tillbaka alla produkter
    res.json(allProducts)
})

// Post--------------------------------------------
// Skapar en ny produkt om man har rollen admin och sparar den till databasen.
router.post('/api/products', verifyToken, async (req, res) => {
    let createProductAdmin = await User.findById({ "_id": userid })

    if (createProductAdmin.role === 'admin') {
        let newProduct = await new Product({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile,
        })
        try {
            newProduct.save()
            res.send(newProduct)
        } catch (error) {
            res.send('Cannot add product to DB')
        }
    } else {
        res.send('Not autorized')
    }
})

// Patch----------------------------------
// Uppdaterar en product.
router.patch('/api/products/:id', verifyToken, async (req, res) => {
    let createProductAdmin = await User.findById({ "_id": userid })

    if (createProductAdmin.role === 'admin') {
        let update = {
            _id: req.params.id,
            title: req.body.title,
            price: req.body.price,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            imgFile: req.body.imgFile,
        }
        let updateProduct = await Product.findOneAndUpdate({ "_id": req.params.id, }, update)
        try {
            res.send(updateProduct)
        } catch (error) {
            res.send('Cannot update product to DB')
        }
    } else {
        res.send('Not autorized to update products')
    }
})

// Delete----------------------------------
// Deletar en order.
router.delete('/api/products/:id', verifyToken, async (req, res) => {
    let createProductAdmin = await User.findById({ "_id": userid })

    if (createProductAdmin.role === 'admin') {

        let deleteProduct = await Product.deleteOne({ "_id": req.params.id, })
        try {
            res.send(deleteProduct)
        } catch (error) {
            res.send('Cannot delete product from DB')
        }
    } else {
        res.send('Not autorized to delete products')
    }
})


module.exports = router