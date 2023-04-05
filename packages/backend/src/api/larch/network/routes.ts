import { Router } from 'express';
import {
  networkListController, networkCreateController,
  networkGetController, networkTestController,
  networkUpdateController, progressController,
  networkRunController,
  networkTestRunController, networkDeleteController,
} from './controllers.js';
import { networkCreateValidation, networkUpdateValidation } from './validations.js';

const router = Router();

router.get('/', networkGetController);
router.post('/list', networkListController);
router.post('/create', networkCreateValidation, networkCreateController);
router.post('/update', networkUpdateValidation, networkUpdateController);
router.get('/delete', networkDeleteController);
router.get('/test', networkTestController);
router.get('/run', networkRunController);
router.get('/test-run', networkTestRunController);
router.get('/progress', progressController);

export default router;
