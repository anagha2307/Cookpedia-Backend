const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exists.... Please Login!!!")
        } else {
            const encryptPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptPassword, profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
//login
exports.loginController = async (req, res) => {
    console.log('Inside loginController');
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            let userLoggedIn = existingUser.role == "user" ? await bcrypt.compare(password, existingUser.password)
                : password == existingUser.password
            if (userLoggedIn) {
                const token = jwt.sign({ email, role: existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
                alert("Login Successful")
            } else {
                res.status(401).json("Invalid Password")
            }
        } else {
            res.status(404).json("Invalid Email........PLease Register to access Cookpedia...")
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}
//update profile
exports.updateProfileController = async (req, res) => {
    console.log("Inside updateProfileController");
    const { username, password, profile } = req.body
    console.log(profile);
    const { id } = req.params
    try {
        const existingUser = await users.findById({ _id: id })
        //console.log("Before Updation");
        //console.log(existingUser);
        existingUser.username = username
        existingUser.profile = profile
        if (password != "") {
            const encryptPassword = await bcrypt.hash(password, 10)
            existingUser.password = encryptPassword
        }
        //console.log("After Updation");
        //console.log(existingUser);
        await existingUser.save()
        res.status(200).json(existingUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
//get all users - admin
exports.getAllUsersController = async (req, res) => {
    console.log("Inside getAllUsersController");
    try {
        const allUsers = await users.find({role:{$ne:"admin"}})
        res.status(200).json(allUsers)
    }
    catch(err) {
        res.status(500).json(err);
    }
}

