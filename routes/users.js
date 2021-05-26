const express = require('express')
const router = express.Router()
// Import model
const User = require('../modules/usersModel')

// Hashing/crypting for password
const bcrypt = require('bcryptjs')

// En route för att kunna registrera och spara en user till databasen.
router.post('/api/register', async (req, res) => {

    // Kontrollerar om email finns i databasen redan.
    const checkMail = await User.findOne({email: req.body.email})
    if(checkMail) return res.send('Email existerar redan, prova en ny.')

    //Hashar lösenordet. 

    // Hur långt/svårt den hashade lösenordet ska vara.
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    let newUser = await new User({
        email: req.body.email,
        password: hashPassword,
        name: req.body.name,
        // Default värde är "costumer" och vill du registrera en admin måste du hårdkoda det eller uppdater i databasen.
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
