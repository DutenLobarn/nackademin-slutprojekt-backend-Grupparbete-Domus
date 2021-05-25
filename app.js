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

// process.env.URI kommer från vår env fil så vi skyddar vår databas.
mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true, dbName: 'SynosWebshop' })

const db = mongoose.connection

db.on('error', (err) => { console.error(err) })
db.once('open', () => { console.log("Db ansluten.") })

// Middleware

// Denna för att kunna läsa req.body bättre.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Denna för att kunna läsa frontend filer.
app.use(express.static('public'))

// cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Denna för att använda de olika routes vi skapat.
app.use(routerJwt)
app.use(routerUser)
app.use(routerOrder)
app.use(routerProduct)

app.listen(process.env.PORT || 5000, () => console.log("It's running birch!"))