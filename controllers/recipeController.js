const recipes = require('../models/recipeModel')

//get all recipes
exports.getAllRecipeController = async (req, res) => {
    console.log('Inside getAllRecipeController');
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }
    catch (error) {
        //res.status(500).json(error)
        res.status(500).json({ error: error.message });
    }
}
//view recipe
exports.viewRecipeController = async (req, res) => {
    console.log("Inside viewRecipeController");
    const { id } = req.params
    try {
        const viewDetails = await recipes.findById({ _id: id })
        res.status(200).json(viewDetails)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
//related recipes
exports.getRelatedRecipesController = async (req, res) => {
    console.log("getRelatedRecipesController");
    const cuisine = req.query.cuisine
    try {
        const relatedRecipes = await recipes.find({ cuisine })
        res.status(200).json(relatedRecipes)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
//add recipe
exports.addRecipeController = async (req, res) => {
    console.log("addRecipeController");
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine,
        caloriesPerServing, image, mealType } = req.body
    try {
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            res.status(409).json("Recipe already exists in our Collection....Please add another recipe!!!")
        }
        else {
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}