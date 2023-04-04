import { Router } from 'express';
import {
  networkController, createNetworkController,
  displayNetworkController, testNetworkController,
  updateNetworkController, progressController,
  testZombie, networkRunController,
  networkTestRunController, deleteNetworkController,
} from './controllers.js';
import { createNetworkValidation, updateNetworkValidation } from './validations.js';

const router = Router();

router.get('/test-zombie', testZombie); // only for initial testing, should be deleted later
router.post('/list', networkController); // done
router.post('/create', createNetworkValidation, createNetworkController); // done
router.get('/network-run', networkRunController); // done
router.get('/test', testNetworkController); // done
router.get('/test-run', networkTestRunController); // done
router.get('/', displayNetworkController); // done
router.post('/update', updateNetworkValidation, updateNetworkController); // done
router.get('/progress', progressController); // done
router.get('/delete', deleteNetworkController); // done

export default router;
