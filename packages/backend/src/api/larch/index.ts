import * as express from 'express';
import networkRouter from './network/routes.js';
import templateRouter from './template/routes.js';
import userOperationRouter from './user_operation/routes.js';
import versionRouter from './version/routes.js';

const router = express.Router();

router.use('/network', networkRouter);
router.use('/template', templateRouter);
router.use('/user_operation', userOperationRouter);
router.use('/version', versionRouter);

export default router;
