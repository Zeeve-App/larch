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
