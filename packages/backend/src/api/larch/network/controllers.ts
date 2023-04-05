/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import {
  displayZombienetRunOutput,
  displayZombienetTestRunOutput,
  showNetworkProgress, deleteNetwork, createNetwork, testNetwork,
} from '../../../modules/network.js';

import { addUserOperationEntry } from '../../../modules/user_operation.js';
import { Network, getNetworkList } from '../../../modules/models/network.js';
import { AppError } from '../../../utils/declaration.js';

export const networkGetController = async (req: Request, res: Response): Promise<void> => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  addUserOperationEntry('NETWORK_GET', `Fetched network with Name: ${networkName}`);
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Network not found',
        detail: 'requested template is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const networkInfo = await network.get();

  res.json({
    success: true,
    result: networkInfo,
  });
};

export const networkUpdateController = async (req: Request, res: Response): Promise<void> => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  const networkData = req.body;
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Network not found',
        detail: 'Network requested to be updated is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const currentNetworkInfo = await network.get();

  await network.set({
    ...currentNetworkInfo,
    ...networkData,
  });

  const updatedNetworkInfo = await network.get();

  res.json({
    success: true,
    result: updatedNetworkInfo,
  });
};

export const networkCreateController = async (req: Request, res: Response) => {
  const networkData = req.body;
  try {
    const networkRunInfo = await createNetwork(networkData);
    res.status(200).json({
      success: true,
      result: { name: networkRunInfo.name, runId: networkRunInfo.runId },
    });
  } catch (error) {
    if (error instanceof AppError && error.kind === 'NETWORK_EXISTS') {
      res.statusCode = 400;
      res.json({
        success: false,
        error: {
          type: error.kind,
          title: 'Network already exists',
          detail: error.message,
          instance: req.originalUrl,
        },
      });
      return;
    }
    throw error;
  }
};

export const networkRunController = async (req: Request, res: Response) => {
  const runId = typeof req.query.runId === 'string' ? req.query.runId : '';
  const result = await displayZombienetRunOutput(runId);
  res.send(result);
};

export const networkTestController = async (req: Request, res: Response) => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  try {
    const networkTestRunInfo = await testNetwork(networkName);
    res.status(200).json({
      success: true,
      result: { name: networkTestRunInfo.name, runId: networkTestRunInfo.runId },
    });
  } catch (error) {
    if (error instanceof AppError && error.kind === 'NETWORK_NOT_FOUND') {
      res.statusCode = 404;
      res.json({
        success: false,
        error: {
          type: error.kind,
          title: 'Network not found',
          detail: error.message,
          instance: req.originalUrl,
        },
      });
      return;
    }
    throw error;
  }
};

export const networkTestRunController = async (req: Request, res: Response) => {
  const networkId: any = req.query.networkRunId;
  const result = await displayZombienetTestRunOutput(networkId);
  res.send(result);
};

export const progressController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  const result = await showNetworkProgress(updatedNetworkName);
  res.send(result);
};

export const networkDeleteController = async (req: Request, res: Response) => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  try {
    await deleteNetwork(networkName);
    res.status(200).json({
      success: true,
      result: { name: networkName },
    });
  } catch (error) {
    if (error instanceof AppError && error.kind === 'NETWORK_NOT_FOUND') {
      res.statusCode = 404;
      res.json({
        success: false,
        error: {
          type: error.kind,
          title: 'Network not found',
          detail: error.message,
          instance: req.originalUrl,
        },
      });
      return;
    }
    throw error;
  }
};

export const networkListController = async (req: Request, res: Response): Promise<void> => {
  addUserOperationEntry('NETWORK_LIST', 'Listed networks');
  const networkListReq = req.body;
  const pageNum = networkListReq.meta
    && networkListReq.meta.pageNum ? networkListReq.meta.pageNum : 1;
  const numOfRec = networkListReq.meta ? networkListReq.meta.numOfRec : 10;
  const {
    result: templates,
    totalNumberOfRecCount,
    currentPageRecCount,
  } = await getNetworkList(networkListReq.filter, networkListReq.sort ?? [], {
    pageNum,
    numOfRec,
  });

  res.json({
    success: true,
    result: templates,
    meta: {
      pageNum,
      numOfRec: currentPageRecCount,
      total: totalNumberOfRecCount,
    },
  });
};
