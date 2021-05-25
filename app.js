// How to start use data from .env
require('dotenv').config()

// Import all Routes
const routerJwt = require('./routes/jwt')
const routerUser = require('./routes/users')
const routerOrder = require('./routes/orders')
const routerProduct = require('./routes/products')

// Uppkoppling till db
const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true, dbName: 'SynosWebshop' })

const db = mongoose.connection

db.on('error', (err) => {console.error(err)})
db.once('open', () => {console.log("Db ansluten.")})

// Middleware

// This one to be able to read req.body better.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// This to use the frontend files.
app.use( express.static('public') )

// cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// This to use different Routes.
app.use(routerJwt)
app.use(routerUser)
app.use(routerOrder)
app.use(routerProduct)

app.listen(process.env.PORT || 5000, () => console.log("It's running birch!"))
// module.exports = app