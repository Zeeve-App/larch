/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Router } from 'express';
import {
  networkListController, networkCreateController,
  networkGetController, networkTestController,
  networkUpdateController, networkStatusController,
  networkRunGetController, networkRunListController,
  networkDeleteController,
} from './controllers.js';
import { networkCreateValidation, networkUpdateValidation } from './validations.js';
import { handlePromiseController } from '../../../utils/misc.js';

const router = Router();

router.get('/', handlePromiseController(networkGetController));
router.post('/list', handlePromiseController(networkListController));
router.post('/create', networkCreateValidation, handlePromiseController(networkCreateController));
router.post('/update', networkUpdateValidation, handlePromiseController(networkUpdateController));
router.get('/delete', handlePromiseController(networkDeleteController));
router.post('/test', networkCreateValidation, handlePromiseController(networkTestController));
router.get('/run', handlePromiseController(networkRunGetController));
router.post('/run-list', handlePromiseController(networkRunListController));
router.get('/status', handlePromiseController(networkStatusController));

export default router;
