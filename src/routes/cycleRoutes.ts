import { Router } from "express";
import CycleController from "../controllers/cycle";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateCycle } from "../validations/cycle";

const router = Router();
const { createCycle, getCycles, getCycleById, updateCycle, deleteCycle } = CycleController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateCycle), createCycle);

router.get("/", verifyToken, getCycles);
router.get("/:id", verifyToken, getCycleById);

router.patch("/:id", verifyToken, updateCycle);
router.delete("/:id", verifyToken, deleteCycle);

export default router;
