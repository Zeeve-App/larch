import { Request, Response, NextFunction } from 'express';
import { createNetworkSchema, updateNetworkSchema } from './schemas.js';
import { handleValidationError } from '../../../utils/validation.js';
import { addUserOperationEntry } from '../../../modules/user_operation.js';

export const createNetworkValidation = async (req: Request, res: Response, next: NextFunction) => {
  addUserOperationEntry('NETWORK_CREATE', 'Create network');
  const result = await createNetworkSchema.validate(req.body, { abortEarly: false });
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

export const updateNetworkValidation = async (req: Request, res: Response, next: NextFunction) => {
  addUserOperationEntry('NETWORK_UPDATE', `Update network with ID: ${req.query.networkId}`);
  const result = await updateNetworkSchema.validate(req.body, { abortEarly: false });
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
