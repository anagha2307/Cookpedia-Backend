const feedbacks = require('../models/feedbackModel')

//add feedback
exports.addFeedbackController = async (req,res) => {
    console.log("Inside addFeedbackController");
    const {name,email,message} = req.body
    try{
        const newFeedback = new feedbacks({
            name,email,message
        })
        await newFeedback.save()
        res.status(200).json("Thank you for your feedback....!!!!")
    }
    catch(err){
        res.status(500).json(err)
    }
}