import express from "express";
import { AskQuestion, getallquestion, deletequestion, votequestion } from "../controller/Question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, AskQuestion);
router.get("/get", getallquestion);
router.delete("/delete/:id",auth,deletequestion);
router.put("/vote/:id",auth,votequestion);

export default router;

