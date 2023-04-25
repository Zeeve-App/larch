import { Router } from 'express';
import {
  templateCreateController, templateGetController,
  templateUpdateController, templateListController,
  templateDeleteController, templateCloneController,
} from './controllers.js';
import { templateCreateValidation, templateUpdateValidation } from './validations.js';
import { handlePromiseController } from '../../../utils/misc.js';

const router = Router();

router.post('/create', templateCreateValidation, handlePromiseController(templateCreateController));
router.get('/', handlePromiseController(templateGetController));
router.post(
  '/update',
  handlePromiseController(templateUpdateValidation),
  handlePromiseController(templateUpdateController),
);
router.get('/delete', handlePromiseController(templateDeleteController));
router.post('/list', handlePromiseController(templateListController));
router.post('/clone', handlePromiseController(templateCloneController));

export default router;
