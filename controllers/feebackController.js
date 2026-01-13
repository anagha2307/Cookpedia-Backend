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
//get feedback list
exports.getFeedbacklistController = async (req,res) => {
    console.log("Inside getFeedbacklistController");
    try{
        const feedbackList = await feedbacks.find()
        res.status(200).json(feedbackList)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//update feedback status
exports.updateFeedbackStatusController = async (req,res) => {
    console.log("Inside updateFeedbackStatusController");
    const {id} = req.params
    const status = req.query.status
    try{
        const existingFeedback = await feedbacks.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//get approved feedback list
exports.getApprovedFeedbacksController = async (req,res) => {
    console.log("Inside getApprovedFeedbacksController");
    try{
        const allfeedbacks = await feedbacks.find({status:{eq:"approve"}})
        res.status(200).json(allfeedbacks)
    }
    catch(err){
        res.status(500).json(err)
    }
}