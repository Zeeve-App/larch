import * as express from 'express';

import apiRoute from './api/index.js'
import healthRoute from './health/index.js'

const router = express.Router();

router.use(apiRoute);
router.use(healthRoute);

export default router;