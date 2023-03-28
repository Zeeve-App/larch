import { Router } from "express";
import { network , createNetwork, displayNetworks, testNetwork, updateNetwork } from "../../../controllers/index.js";


const router = Router();

router.post("/networks",network);
router.post("/networks/create/", createNetwork);
router.get("/network/", displayNetworks);
router.get("/network/test/", testNetwork);
router.post("/network/update/", updateNetwork)

export default router