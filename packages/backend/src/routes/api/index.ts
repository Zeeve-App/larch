import * as express from 'express';
import larchRoutes from './larch/index.js';

const apiRouter = express.Router();

apiRouter.use('/larch', larchRoutes);

export default apiRouter;