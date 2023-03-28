/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import { LARCH_VERSION, ZOMBIENET_VERSION } from '../../../config.js';

export const versionController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ 'zombienet-version': ZOMBIENET_VERSION, 'larch-version': LARCH_VERSION });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
};
