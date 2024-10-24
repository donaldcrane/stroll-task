import { Router } from "express";
import RegionController from "../controllers/region";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateRegion from "../validations/region";

const router = Router();
const { createRegion, getAllRegions, getRegionById, updateRegion, deleteRegion } = RegionController;
const { verifyToken, verifyAdmin } = Authentication;

router.post("/", verifyToken, verifyAdmin, validator(validateRegion), createRegion);

router.get("/", verifyToken, getAllRegions);
router.get("/:id", verifyToken, getRegionById);

router.patch("/:id", verifyToken, verifyAdmin, updateRegion);
router.delete("/:id", verifyToken, deleteRegion);

export default router;
