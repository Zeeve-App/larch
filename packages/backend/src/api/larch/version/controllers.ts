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
