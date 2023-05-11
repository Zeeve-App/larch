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

import { Request, Response } from 'express';
import { UserOperation, getOperationList, purgeOperationData } from '../../../modules/models/user_operation.js';

export const userOperationGetController = async (req: Request, res: Response): Promise<void> => {
  const operationId = typeof req.query.operationId === 'string' ? req.query.operationId : '';
  const userOperation = new UserOperation(operationId);
  const userOperationExists = await userOperation.exists();
  if (!userOperationExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'User operation info not found',
        detail: 'requested user operation info is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const userOperationInfo = await userOperation.get();

  res.json({
    success: true,
    result: userOperationInfo,
  });
};

export const userOperationPurgeController = async (req: Request, res: Response): Promise<void> => {
  await purgeOperationData();

  res.json({
    success: true,
    result: {},
  });
};

export const userOperationListController = async (req: Request, res: Response): Promise<void> => {
  const operationListReq = req.body;
  const pageNum = operationListReq.meta
  && operationListReq.meta.pageNum ? operationListReq.meta.pageNum : 1;
  const numOfRec = operationListReq.meta ? operationListReq.meta.numOfRec : 10;
  const {
    result: operations,
    totalNumberOfRecCount,
    currentPageRecCount,
  } = await getOperationList(operationListReq.filter, operationListReq.sort ?? [], {
    pageNum,
    numOfRec,
  });

  res.json({
    success: true,
    result: operations,
    meta: {
      pageNum,
      numOfRec: currentPageRecCount,
      total: totalNumberOfRecCount,
    },
  });
};
