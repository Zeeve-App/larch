import { Request, Response, NextFunction } from 'express';
import { templateCreateSchema, templateUpdateSchema } from './schemas.js';
import { handleValidationError } from '../../../utils/validation.js';

export const templateCreateValidation = async (req: Request, res: Response, next: NextFunction) => {
  const result = await templateCreateSchema.validate(req.body, { abortEarly: false });
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

export const templateUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
  const result = await templateUpdateSchema.validate(req.body, { abortEarly: false });
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
