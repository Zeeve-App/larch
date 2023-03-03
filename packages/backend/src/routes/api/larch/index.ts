import * as express from 'express';
import networkRouter from './networks.js'
import progressRouter from './progress.js'
import versionRouter from './version.js'

const router = express.Router();

router.use('/larch',networkRouter);
router.use('/larch',progressRouter);
router.use('/larch',versionRouter);


export default router;