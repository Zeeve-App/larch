import { Request, Response, NextFunction } from 'express';
import { createNetworkSchema, updateNetworkSchema } from './schemas.js';
import { handleValidationError } from '../../../utils/validation.js';

export const createNetworkValidation = async (req: Request, res: Response, next: NextFunction) => {
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
