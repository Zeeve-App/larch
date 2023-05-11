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
