import { Router } from "express";
import { network , createNetwork} from "../../../controllers/index.js";
import { upload } from "../../../middleware/upload.js";


const router = Router();

router.get("/networks",network);
router.post("/networks/create/",upload.single('confFile'), createNetwork)

export default router