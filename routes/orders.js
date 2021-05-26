const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

// Token
const jwt = require('jsonwebtoken')

const Order = require('../modules/ordersModel');

// import User so we can update the orderHistory
const User = require('../modules/usersModel');
const { find } = require('../modules/ordersModel');

let userPayload = '';

const verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token'];

    if (token) {
        jwt.verify(token, `${process.env.SECRET}`, (err, decodedPayload) => {
            if (err) {
                console.log('Är det här:' + err);
            } else {
                userEmail = decodedPayload.email;
                // res.json(decodedPayload)
                next();
            }
        })
    } else {
        console.log('token not true');
    }
}

router.post('/api/orders', verifyToken, async (req, res) => {
    if (await req.body.customer.name == '') {
        console.log('U are not logged in')
    } else {

        // Skapar nu order enligt orderSchema. 
        let newOrder = await new Order({
            status: req.body.status,
            timestamp: new Date(),
            items: req.body.items,
            _id: new mongoose.Types.ObjectId(),
        })
        // Försöker spara, Order create tillbaka om det fungerar. 
        // Ska till mer validering nu. 
        try {
            //Sparas till databasen
            await newOrder.save()
        } catch (err) {
            // Om det blir fel.
            res.send(err)
        }

        let findOrder = await Order.findOne({ _id: newOrder._id }).populate('items')

        let result = 0;
        findOrder.items.forEach(e => {
            result += e.price
        });

        newOrder.orderValue = result;

        await Order.updateOne({ _id: newOrder._id }, { $set: { orderValue: result } })

        // Finding correct user using the payload and after inserting orders.
        let updatingUser = await User.findOne({ email: userEmail })
        updatingUser.orderHistory.push(newOrder._id)
        updatingUser.save()
        console.log(updatingUser)
    }
})

// Get 

router.get('/api/orders/', verifyToken, async (req, res) => {
    let findUser = await User.findOne({ email: userEmail }).populate('orderHistory')

    console.log(req.body)
    console.log(res)


    res.send(findUser.orderHistory)
})


module.exports = router