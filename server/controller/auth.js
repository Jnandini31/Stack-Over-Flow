import bcrypt from "bcryptjs";
import User from "../models/auth.js";
import jwt from 'jsonwebtoken'

export const signup = async(req,res)=>{
  const {name, email, password}=req.body;
  try {
    const extinguser=await User.findOne({email});
    if(extinguser){
      return res.status(404).json({message:"User already exist"});
    }
    const hashedpassword=await bcrypt.hash(password, 12);
    const newuser = await User.create({
      name,
      email,
      password:hashedpassword
    });
    res.status(200).json({result:newuser});
  } catch (error) {
    res.status(500).json("something went wrong...")
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const extinguser = await users.findOne({ email });
    if (!extinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, extinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
      return
    }
    const token=jwt.sign({
        email:extinguser.email,id:extinguser._id
    },process.env.JWT_SECRET,{expiresIn:"1h"}
)
    res.status(200).json({ result: extinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};