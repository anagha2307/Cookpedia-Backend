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
        console.error("Controller Crash:", error);
        res.status(500).json({ error: error.message });
    }
}