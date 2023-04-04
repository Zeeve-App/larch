import { Router } from 'express';
import {
  userOperationGetController, userOperationListController,
  userOperationPurgeController,
} from './controllers.js';

const router = Router();

router.get('/', userOperationGetController);
router.get('/purge', userOperationPurgeController);
router.post('/list', userOperationListController);

export default router;
