// // Configuration to be able to use .env files
// require('dotenv').config()

// const express = require('express')
// const app = express()

// // Bcrypt for password check
// const bcrypt = require('bcryptjs')

// // Token
// const jwt = require('jsonwebtoken')

// // cookies
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())

// const createToken = (parameter, req, res) =>{

//     if (parameter) {

//         console.log(parameter)
//         console.log(req.body.password)
//         // console.log(res.cookie)
//         // console.log(res.cookies)

//         //Jämför hashade req.password mot det du skriver in i Insomnia. 
//         bcrypt.compare(req.body.password, parameter.password, function (err, result) {
//             if (err) res.json(err)

//             //om resultatet inte är false, signa och skicka token. 
//             if (result !== false) {
//                 console.log(result)
//                 console.log(parameter.role)
//                 const payload = parameter.role

//                 const token = jwt.sign(payload, `${process.env.SECRET}`)
//                 res.cookie('auth-token', token)
//                 res.send({
//                             token: token,
//                             parameter
//                         })
//             } else {
//                 res.send('Fel lösen eller email')
//             }
//         })
//     }
//     }

// module.exports = createToken


// const jwt = require('jsonwebtoken')

// const createToken = (req, res, next) =>{
//     const payload = user.role
//     const token = jwt.sign(payload, `${process.env.SECRET}`)
//                 res.cookie('auth-token', token)
//                 res.send({
//                             token: token,
//                             user
//                         })

// } 

// module.exports = {createToken};