const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')

const routes = express.Router()

//get all recipes
routes.get('/recipes/all',recipeController.getAllRecipeController)
//register
routes.post('/register',userController.registerController)
//login
routes.post('/login',userController.loginController)

module.exports = routes