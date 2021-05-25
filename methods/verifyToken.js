const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const token = req.cookies['auth-token'];

    if (token){
        jwt.verify(token, `${process.env.SECRET}`, (err, decodedPayload) =>{
            if(err){
                console.log('Är det här:' + err);
            }else{
                console.log(decodedPayload.email);
                // return decodedPayload;
                res.json(decodedPayload)
                next();
            }
        })
    }else{
        console.log('token not true');
    }
} 

module.exports = verifyToken;