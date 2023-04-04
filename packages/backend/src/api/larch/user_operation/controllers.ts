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
