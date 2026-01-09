const saveRecipes = require('../models/saveRecipeModel')

//add to collection
exports.addToCollectionController = async (req,res) => {
    console.log("Inside addToCollectionController");
    const {id} = req.params
    const userMail = req.payload
    const {name,image} = req.body
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if(existingRecipe){
            res.status(409).json("Recipe already added to your Collection.....Please add another one...")
        }
        else{
            const newRecipe = new saveRecipes({
                recipeId:id,
                recipeName:name,
                recipeImage:image,
                userMail
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}
//get saved recipes
exports.getSavedRecipesController = async (req,res) => {
    console.log("getSavedRecipesController");
    const userMail = req.payload
    try{
        const allSavedRecipes = await saveRecipes.find({userMail})
        res.status(200).json(allSavedRecipes)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//delete saved recipe
exports.deleteSavedRecipeController = async (req,res) => {
    console.log("Inside deleteSavedRecipeController");
    const {id} = req.params
    try{
        const deleteRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(deleteRecipe)
    }
    catch(err){
        res.status(500).json(err)
    }
}