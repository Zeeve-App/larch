import { Router } from "express";
import { version } from "../../../controllers/index.js";

const router = Router();

router.get("/version",version);

export default router