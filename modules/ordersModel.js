const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: String,
    status: {
        type: String,
        default: 'In process'
    },
    // Skriver ut utc tiden, inte den lokala tiden.
    timestamps: {
        type: Date,
        default: Date.now
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    orderValue: {
        type: Number,
        default: 0
    }
},
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
