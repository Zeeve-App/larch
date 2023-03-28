import { Router } from 'express';
import { versionController } from './controllers.js';

const router = Router();

router.get('/', versionController);

export default router;
