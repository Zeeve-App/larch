/* eslint-disable import/prefer-default-export */
import { ValidationErrorItem } from 'joi';
import { HttpError, ValidationErrorDetail } from './declaration.js';

export const handleValidationError = (
  url: string,
  validationErrorsDetails: ValidationErrorItem[],
): HttpError => {
  const errorDetails: Array<ValidationErrorDetail> = [];
  validationErrorsDetails.forEach((error) => {
    errorDetails.push({
      path: error.path,
      message: error.message,
    });
  });
  return {
    type: 'VALIDATION_ERROR',
    title: 'Given data did not pass the data validations',
    detail: errorDetails,
    instance: url,
  };
};
