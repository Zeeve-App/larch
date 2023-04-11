import { Router } from 'express';
import {
  userOperationGetController, userOperationListController,
  userOperationPurgeController,
} from './controllers.js';
import { handlePromiseController } from '../../../utils/misc.js';

const router = Router();

router.get('/', handlePromiseController(userOperationGetController));
router.get('/purge', handlePromiseController(userOperationPurgeController));
router.post('/list', handlePromiseController(userOperationListController));

export default router;
