import { Router } from "express";
import QuestionController from "../controllers/question";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateQuestion from "../validations/question";

const router = Router();
const { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } = QuestionController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateQuestion), createQuestion);

router.get("/", verifyToken, getAllQuestions);
router.get("/:id", verifyToken, getQuestionById);

router.patch("/:id", verifyToken, updateQuestion);
router.delete("/:id", verifyToken, deleteQuestion);

export default router;
