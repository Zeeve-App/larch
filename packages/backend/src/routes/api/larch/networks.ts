import { Router } from "express";
import { network , createNetwork, displayNetworks, testNetwork } from "../../../controllers/index.js";


const router = Router();

router.get("/networks",network);
router.post("/networks/create/", createNetwork);
router.get("/network/", displayNetworks);
router.get("/network/test/", testNetwork)

export default router