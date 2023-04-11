import { Router } from 'express';
import {
  networkListController, networkCreateController,
  networkGetController, networkTestController,
  networkUpdateController, networkStatusController,
  networkRunGetController, networkRunListController,
  networkDeleteController,
} from './controllers.js';
import { networkCreateValidation, networkUpdateValidation } from './validations.js';
import { handlePromiseController } from '../../../utils/misc.js';

const router = Router();

router.get('/', handlePromiseController(networkGetController));
router.post('/list', handlePromiseController(networkListController));
router.post('/create', networkCreateValidation, handlePromiseController(networkCreateController));
router.post('/update', networkUpdateValidation, handlePromiseController(networkUpdateController));
router.get('/delete', handlePromiseController(networkDeleteController));
router.get('/test', handlePromiseController(networkTestController));
router.get('/run', handlePromiseController(networkRunGetController));
router.post('/run-list', handlePromiseController(networkRunListController));
router.get('/status', handlePromiseController(networkStatusController));

export default router;
