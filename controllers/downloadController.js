const downloads = require('../models/downloadModel')

//add to download
exports.addDownloadController = async (req,res) => {
    console.log("Inside addDownloadController");
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body
    try{
        const existingRecipe = await downloads.findOne({recipeId:id})
        if(existingRecipe){
            //update count
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            //add recipe to download list
            const newDownload = new downloads({
                recipeId:id,
                recipeName:name,
                recipeCuisine:cuisine,
                recipeImage:image,
                count:1,
                userMail
            })
            await newDownload.save()
            res.status(200).json(newDownload)
        }
    }
    catch(err){
        res.status(500).json(err)
    }  
}