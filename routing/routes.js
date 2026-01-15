const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const downloadController = require('../controllers/downloadController')
const saveRecipeController = require('../controllers/saveRecipeController')
const feedbackController = require('../controllers/feebackController')
const adminJwtMiddleware = require('../middleware/adminJwtMiddleware')
const routes = express.Router()

//user
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
//get downloaded recipes
routes.get('/recipes/downloaded',jwtMiddleware,downloadController.getDownloadRecipeController)
//save recipe
routes.post('/recipes/:id/save',jwtMiddleware,saveRecipeController.addToCollectionController)
//get saved recipes
routes.get('/recipes/saved',jwtMiddleware,saveRecipeController.getSavedRecipesController)
//delete saved recipe
routes.delete('/saved-recipes/:id/delete',jwtMiddleware,saveRecipeController.deleteSavedRecipeController)

//edit user profile
routes.put('/users/:id/edit',jwtMiddleware,userController.updateProfileController)
//add feedback
routes.post('/user/feedback',feedbackController.addFeedbackController)
//get approved feedback list
routes.get('/user/feedbacks/approved',feedbackController.getApprovedFeedbacksController)

//admin
//get all users
routes.get('/users',adminJwtMiddleware,userController.getAllUsersController)
//get download list
routes.get('/download-list',adminJwtMiddleware,downloadController.getDownloadListController)
//get feedback list
routes.get('/feedbacks',adminJwtMiddleware,feedbackController.getFeedbacklistController)
//update feedback status
routes.put('/feedbacks/:id/edit',adminJwtMiddleware,feedbackController.updateFeedbackStatusController)
//add recipe
routes.post('/add-recipe',adminJwtMiddleware,recipeController.addRecipeController)

module.exports = routes
