import express from 'express'
import { login, signup } from "../controller/auth.js";
import { getalluser,updateprofile } from '../controller/user.js';
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getalluser", getalluser);
router.patch("/update/:id",auth,updateprofile);

export default router

