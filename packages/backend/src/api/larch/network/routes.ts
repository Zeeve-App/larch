import { Router } from 'express';
import {
  networkController, createNetworkController,
  displayNetworkController, testNetworkController,
  updateNetworkController, progressController,
  testZombie,
} from './controllers.js';
import { createNetworkValidation, updateNetworkValidation } from './validations.js';

const router = Router();

router.get('/test-zombie', testZombie);
router.post('/list', networkController);
router.post('/create', createNetworkValidation, createNetworkController);
router.get('/', displayNetworkController);
router.get('/test', testNetworkController);
router.post('/update', updateNetworkValidation, updateNetworkController);
router.get('/progress', progressController);

export default router;
