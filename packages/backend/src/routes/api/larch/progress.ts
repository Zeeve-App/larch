import { Router } from "express";
import { progress } from "../../../controllers/index.js";

const router = Router();

router.get("/progress",progress);

export default router