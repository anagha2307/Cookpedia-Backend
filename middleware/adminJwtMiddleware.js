const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req, res, next) => {
    console.log("Inside adminJwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            //console.log(jwtResponse);
            if (jwtResponse.role=="admin") { next()}
            else {              
                res.status(401).json("Authorization Failed.....Admin has only access to our Resources..")
            }
        }catch(err){
            //console.log(err);
            res.status(500).json(err)
        }
    }
    else {
        res.status(404).json("Authorization Failed....Token Missing")
    }
}
module.exports = adminJwtMiddleware