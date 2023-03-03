import { Router } from "express";
import { health } from '../../controllers/index.js'


const router = Router();

router.get("/healthz",health);

export default router