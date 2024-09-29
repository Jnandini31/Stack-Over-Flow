import Question from "../models/Question.js";
import mongoose from "mongoose";

export const AskQuestion=async(req,res)=>{
  const postquestiondata=req.body;
  const userid=req.userid;
  const postquestion=new Question({...postquestiondata,userid})
  try {
    await postquestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error)
    res.status(404).json("couldn't post a new question");
    return
  }
};

export const getAllQuestions= async (req, res) => {
  try {
    const Questionlist = await Question.find().sort({ askedOn: -1 });
    res.status(200).json(Questionlist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion =async(req,res)=>{
  const{id:_id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unavailable...");
  }try {
    await Question.findByIdAndDelete(_id);
    req.status(200).json({message:"Sucessfully deleted..."})
  } catch (error) {
    res.status(404).json({message:error.message});
    return
  }
}

export const voteQuestion=async(req,res)=>{
  const{id:_id}=req.params;
  const {value}=req.body;
  const userid=req.userid;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unavailable...")
  }
  try {
    const question =await Question.findById(_id);
    const upindex=question.upvote.findIndex((id)=>id===String(userid))
    const downindex=question.downvote.findIndex((id)=>id===String(userid))
    if(value==="upvote"){
      if(downindex !== -1){
        question.downvote=question.downvote.filter((id)=>id!== String(userid))
      }
      if(upindex === -1){
        question.upvote.push(userid);
    }else{
      question.upvote=question.upvote.filter((id)=>id!== String(userid))
  }
 } else if(value === "downvote ")

  if(upindex !== -1){
    question.upvote=question.upvote.filter((id)=>id!== String(userid))
  }
  if(upindex === -1){
    question.downvote.push(userid);
}else{
  question.downvote=question.downvote.filter((id)=>id!== String(userid))
}
await Question.findByIdAndUpdate(_id, question);
res.status(200).json({message: "voted successfully..."})
  } catch (error) {
    res.status(404).json({message:"id not found..."});
    return
  }
}