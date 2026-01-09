const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const routes = express.Router()

//get all recipes
routes.get('/recipes/all',recipeController.getAllRecipeController)
//register
routes.post('/register',userController.registerController)
//login
routes.post('/login',userController.loginController)
//view recipe
routes.get('/recipes/:id/view',jwtMiddleware,recipeController.viewRecipeController)
//related recipes
routes.get('/related-recipes',jwtMiddleware,recipeController.getRelatedRecipesController)


module.exports = routes