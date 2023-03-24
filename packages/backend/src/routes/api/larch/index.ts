import * as express from 'express';
import networkRouter from './networks.js'
import progressRouter from './progress.js'
import versionRouter from './version.js'

const router = express.Router();

router.use(networkRouter);
router.use(progressRouter);
router.use(versionRouter);

export default router;