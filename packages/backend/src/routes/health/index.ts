import * as express from 'express';
import healthRoute from './health.js';

const router = express.Router();

router.use(healthRoute);

export default router;