import { Router } from 'express';
import {
  templateCreateController, templateGetController,
  templateUpdateController, templateListController,
  templateDeleteController,
} from './controllers.js';
import { templateCreateValidation, templateUpdateValidation } from './validations.js';

const router = Router();

router.post('/create', templateCreateValidation, templateCreateController);
router.get('/', templateGetController);
router.post('/update', templateUpdateValidation, templateUpdateController);
router.get('/delete', templateDeleteController);
router.post('/list', templateListController);

export default router;
