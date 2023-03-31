/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import { createNetworkSchema, updateNetworkSchema } from './schemas.js';
import { Errors } from '../../declarations.js';

export const createNetworkValidation = async (req: Request, res: Response, next: NextFunction) => {
  const result = await createNetworkSchema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const errorInfo: Errors = {
      errorType: 'validationError',
      details: [],
    };
    result.error.details.forEach((error) => {
      errorInfo.details.push({
        path: error.path,
        message: error.message,
      });
    });
    res.statusCode = 400;
    res.json({
      success: false,
      errorInfo,
    });
    return;
  }
  next();
};

export const updateNetworkValidation = async (req: Request, res: Response, next: NextFunction) => {
  const result = await updateNetworkSchema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const errorInfo: Errors = {
      errorType: 'validationError',
      details: [],
    };
    result.error.details.forEach((error) => {
      errorInfo.details.push({
        path: error.path,
        message: error.message,
      });
    });
    res.statusCode = 400;
    res.json({
      success: false,
      errorInfo,
    });
    return;
  }
  next();
};
