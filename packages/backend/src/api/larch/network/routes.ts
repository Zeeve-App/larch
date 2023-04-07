import { Router } from 'express';
import {
  networkListController, networkCreateController,
  networkGetController, networkTestController,
  networkUpdateController, networkStatusController,
  networkRunGetController, networkRunListController,
  networkDeleteController,
} from './controllers.js';
import { networkCreateValidation, networkUpdateValidation } from './validations.js';

const router = Router();

router.get('/', networkGetController);
router.post('/list', networkListController);
router.post('/create', networkCreateValidation, networkCreateController);
router.post('/update', networkUpdateValidation, networkUpdateController);
router.get('/delete', networkDeleteController);
router.get('/test', networkTestController);
router.get('/run', networkRunGetController);
router.post('/run-list', networkRunListController);
router.get('/status', networkStatusController);

export default router;
