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
  templateCreateController, templateGetController,
  templateUpdateController, templateListController,
  templateDeleteController, templateCloneController,
} from './controllers.js';
import { templateCreateValidation, templateUpdateValidation } from './validations.js';
import { handlePromiseController } from '../../../utils/misc.js';

const router = Router();

router.post('/create', templateCreateValidation, handlePromiseController(templateCreateController));
router.get('/', handlePromiseController(templateGetController));
router.post(
  '/update',
  handlePromiseController(templateUpdateValidation),
  handlePromiseController(templateUpdateController),
);
router.get('/delete', handlePromiseController(templateDeleteController));
router.post('/list', handlePromiseController(templateListController));
router.post('/clone', handlePromiseController(templateCloneController));

export default router;
