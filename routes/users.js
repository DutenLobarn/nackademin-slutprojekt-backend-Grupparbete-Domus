const express = require('express')
const router = express.Router()
// Import model
const User = require('../modules/usersModel')

// Hashing/crypting for password
const bcrypt = require('bcryptjs')

// A Route to be able to register a user and save it to the database.
router.post('/api/register', async (req, res) => {

    //Hashing for the password 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    let newUser = await new User({
        email: req.body.email,
        password: hashPassword,
        name: req.body.name,
        // The default value is "customer" and if u want to register an admin u hardcode that into the database for example.
        role: req.body.role,
        adress: {
            street: req.body.adress.street,
            zip: req.body.adress.zip,
            city: req.body.adress.city
        }
    }) 

    try {
        newUser.save();
        res.send(`Ny användare tillagd i databasen: ${newUser.name}`)
    } catch (error) {
        res.send('Något gick fel när du försökte spara en ny användare')
    }
})

module.exports = router
