// Configuration to be able to use .env files
require('dotenv').config()

// Import model
const User = require('../modules/usersModel')

const express = require('express')

const router = express.Router()

// Bcrypt for password check
const bcrypt = require('bcryptjs')

// Token
const jwt = require('jsonwebtoken')

// Denna post hittar en user genom email, kollar hens hashade lösenord, skapar en payload och ger den en token som vi lägger i cookie.
router.post('/api/auth/', async (req, res) => {

    //Letar bara upp User via email.
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {

        //Jämför hashade req.password mot det du skriver in i det user loggar in.
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) res.json(err)

            //om resultatet inte är false, signa och skicka token. 
            if (result !== false) {
                const payload = {
                    _id: user._id
                }
            
                // denna metod ger oss en token, den behöver en payload och ett lösenord som vi gömt i vår env fil.
                const token = jwt.sign(payload, `${process.env.SECRET}`)
                res.cookie('auth-token', token)
                res.send({
                            token: token,
                            user
                        })
            } else {
                res.send('Fel lösen eller email')
            }
        })
    }
})

module.exports = router