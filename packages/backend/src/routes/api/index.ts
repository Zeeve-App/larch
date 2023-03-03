import * as express from 'express';
import allRoutes from './larch/index.js'

const router = express.Router();

router.use('/api',allRoutes);

export default router;

