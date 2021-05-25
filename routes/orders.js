const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

// Token
const jwt = require('jsonwebtoken')

const Order = require('../modules/ordersModel');

// import User so we can update the orderHistory
const User = require('../modules/usersModel')

let userid='';

const verifyToken = (req, res, next) =>{
    const token = req.cookies['auth-token'];

    if (token){
        jwt.verify(token, `${process.env.SECRET}`, (err, decodedPayload) =>{
            if(err){
                res.send(err)
            }else{
                userid = decodedPayload._id;
                next();
            }
        })
    }else{
        res.send('token not true')
    }
} 

// Post-----------------------------------------------

router.post('/api/orders',verifyToken, async (req, res) => {
    // Ser till att anonyma gäster inte kan komma vidare, så vi skyddar de routes som vi vill skydda.
    if ( await req.body.customer.name == '') {
        console.log('U are not logged in')
    } else {
    
    // Skapar nu order enligt orderSchema. 
    let newOrder = await new Order({
        status: req.body.status,
        timestamp: new Date(),
        items: req.body.items,
        _id: new mongoose.Types.ObjectId(),
    })
    // Försöker spara, Order created tillbaka om det fungerar. 
    try {
        //Sparas till databasen
        await newOrder.save()
        res.send('Order created')
    } catch (err) {
        // Om det blir fel.
        res.send(err)
    }

    // Vi hittar en ordrar för att kunna populera dem.
    let findOrder = await Order.findOne({_id: newOrder._id}).populate('items')

    // Räkna ut en totalsumma som vi lägger i orderValue.
    let result = 0;
    findOrder.items.forEach(e => {
        result += e.price
    });

    newOrder.orderValue = result;

    await Order.updateOne({_id: newOrder._id}, {$set: {orderValue: result}})

    // Hittar rätt user genom att använda id från payload. Pushar in orderId och sen sparar.
    let updatingUser = await User.findById({"_id": userid})
    updatingUser.orderHistory.push(newOrder._id)
    updatingUser.save()
}
})

// Get------------------------------------

// Hämtar ordrar och visar upp dem beroende på vilken roll man har.
router.get('/api/orders',verifyToken, async (req, res) => {

    let showOrderstoUser = await User.findById({"_id": userid}).populate('orderHistory')

    if (showOrderstoUser.role === 'logged in customer') {
        res.json(showOrderstoUser.orderHistory)
        
    } 
    // Denna för admins.
    else {
        let allOrders = await Order.find({})
        res.json(allOrders)
    }

})

module.exports = router