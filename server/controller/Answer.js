import mongoose from "mongoose";
import Question from "../models/Question.js";

export const postanswer=async(req,res)=>{
    const {id:_id}=req.params;
    const {userAnswered, answerBody, noOfAnswers}=req.body
    const userId=req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable...")
      }
      updatenoofquestion(_id,noOfAnswers)
      try {
        const updatequestion=await Question.findByIdAndUpdate(_id,{
            $addToSet:{answer:[{userAnswered, answerBody, noOfAnswers}]},
        });
        res.status(200).json(updatequestion)
      } catch (error) {
        res.status(404).json({message:"error is uploading..."});
        return
      }
};
const updatenoofquestion=async(_id,noOfAnswers)=>{
    try {
        await Question.findByIdAndUpdate(_id,{
            $set:{noOfAnswers:noOfAnswers},
        });
    } catch (error) {
        console.log(error)
    }
}

export const deleteanswer=async(req,res)=>{
    const {id:_id}=req.params;
    const {answerid, noOfAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable...");
    }
    if(!mongoose.Types.ObjectId.isValid(answerid)){
        return res.status(404).send("answer unavailable...");
    }
    updatenoofquestion(_id,noOfAnswers);
    try {
        await Question.updateOne(
            {_id},
            {$pull:{answer:{_id:answerid}}}
        );
        res.status(200).json({message:"sucessfully deleted..."})
    } catch (error) {
        res.status(404).json({message:"error in deleting..."})
    }
}