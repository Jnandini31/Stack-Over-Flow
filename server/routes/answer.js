import express from "express";

import { postAnswer, deleteAnswer } from "../controller/Answer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswer);

export default router;