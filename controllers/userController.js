const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req,res) => {
    console.log("Inside registerController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exists.... Please Login!!!")
        }else{
            const encrptPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encrptPassword,profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

//login
exports.loginController = async(req,res) => {
    console.log('Inside loginController');
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            let userLoggedIn = existingUser.role == "user" ? await bcrypt.compare(password,existingUser.password) 
            : password == existingUser.password
            if(userLoggedIn){
                const token = jwt.sign({email,role:existingUser.role}, process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
                alert("Login Successful")
            }else{
                res.status(401).json("Invalid Password")
            }
        }else{
            res.status(404).json("Invalid Email........PLease Register to access Cookpedia...")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)      
    }    
}
