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
