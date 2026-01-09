const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtMiddleware.email
            next()
        }
        catch(err){
            res.status(500).json(err)
        }  
    }
    else {
        res.status(404).json("Authorization Failed....Token Missing")
    }
}
module.exports = jwtMiddleware