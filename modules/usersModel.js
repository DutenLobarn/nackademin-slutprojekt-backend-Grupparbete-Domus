const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // requirde därför det behövs för att kunna logga in.
    email: {
        type: String,
        required: true
    },
    // requirde därför det behövs för att kunna logga in.
    password: {
        type: String,
        required: true
    },
    name: String,
    // Vi sätter ett default värde för att kunna jämnföra om man är "anynom", "loggad in" eller "admin".
    role: {
        type: String,
        default: 'logged in customer'
    },
    adress: {
        street: String,
        zip: String,
        city: String
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User