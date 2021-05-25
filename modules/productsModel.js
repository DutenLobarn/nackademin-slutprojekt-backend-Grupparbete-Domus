const mongoose = require('mongoose');



const productsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    price: Number,
    shortDesc: String,
    longDesc: String,
    imgFile: String

}

)

const Product = mongoose.model('Products', productsSchema)

module.exports = Product
