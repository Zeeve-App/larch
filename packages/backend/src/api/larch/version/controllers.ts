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
import { Request, Response } from 'express';
import { LARCH_VERSION, ZOMBIENET_VERSION } from '../../../config.js';

export const versionController = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      status: 'success',
      result: {
        zombienetVersion: ZOMBIENET_VERSION,
        larchVersion: LARCH_VERSION,
      },
    });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
};
