import { Router } from 'express';
import {
  networkController, createNetworkController,
  displayNetworkController, testNetworkController,
  updateNetworkController, progressController,
} from './controllers.js';
import { createNetworkValidation } from './validations.js';

const router = Router();

router.post('/list', networkController);
router.post('/create', createNetworkValidation, createNetworkController);
router.get('/', displayNetworkController);
router.get('/test', testNetworkController);
router.post('/update', updateNetworkController);
router.get('/progress', progressController);

export default router;
