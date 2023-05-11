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

import { Request, Response, NextFunction } from 'express';
import { networkCreateSchema, networkUpdateSchema } from './schemas.js';
import { handleValidationError } from '../../../utils/validation.js';
import { addUserOperationEntry } from '../../../modules/user_operation.js';

export const networkCreateValidation = async (req: Request, res: Response, next: NextFunction) => {
  addUserOperationEntry('NETWORK_CREATE', 'Create network');
  const result = await networkCreateSchema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const errorData = handleValidationError(req.originalUrl, result.error.details);
    res.statusCode = 400;
    res.json({
      success: false,
      error: errorData,
    });
    return;
  }
  next();
};

export const networkUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
  addUserOperationEntry('NETWORK_UPDATE', `Update network with ID: ${req.query.networkId}`);
  const result = await networkUpdateSchema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const errorData = handleValidationError(req.originalUrl, result.error.details);
    res.statusCode = 400;
    res.json({
      success: false,
      error: errorData,
    });
    return;
  }
  next();
};
