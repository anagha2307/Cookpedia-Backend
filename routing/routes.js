const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const downloadController = require('../controllers/downloadController')
const saveRecipeController = require('../controllers/saveRecipeController')
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
//add to download
routes.put('/recipes/:id/download',jwtMiddleware,downloadController.addDownloadController)
//save recipe
routes.post('/recipes/:id/save',jwtMiddleware,saveRecipeController.addToCollectionController)
//get saved recipes
routes.get('/recipes/saved',jwtMiddleware,saveRecipeController.getSavedRecipesController)
//delete saved recipe
routes.delete('/saved-recipes/:id/delete',jwtMiddleware,saveRecipeController.deleteSavedRecipeController)

module.exports = routes