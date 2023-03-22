import { Router } from "express";
import { network , createNetwork, displayNetworks } from "../../../controllers/index.js";


const router = Router();

router.get("/networks",network);
router.post("/networks/create/", createNetwork);
router.get("/network/", displayNetworks);

export default router