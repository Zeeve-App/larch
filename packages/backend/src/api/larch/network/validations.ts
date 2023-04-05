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
