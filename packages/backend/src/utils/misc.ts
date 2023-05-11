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

/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express';

export const convertToCamel = (stringToBeConverted: string): string => stringToBeConverted
  .toLowerCase()
  .split('_')
  .map((part: string, i: number) => ((i > 0) ? part.charAt(0).toUpperCase() + part.slice(1) : part))
  .join('');

export const convertRowFieldToCamelCase = (row: { [key: string]: any }): { [key: string]: any } => {
  const keys = Object.keys(row);
  keys.forEach((key) => {
    const value = row[key];
    delete row[key];
    row[convertToCamel(key)] = value;
  });
  return row;
};

// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
export const handlePromiseController = (fn: (req: Request, res: Response, next: NextFunction) => any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise
  .resolve(fn(req, res, next))
  .catch(next);
