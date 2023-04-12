/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import {
  deleteNetwork, createNetwork, testNetwork,
} from '../../../modules/network.js';
import { addUserOperationEntry } from '../../../modules/user_operation.js';
import { Network, NetworkInfo, getNetworkList } from '../../../modules/models/network.js';
import { AppError } from '../../../utils/declaration.js';
import { ExecRun, getExecRunList } from '../../../modules/models/exec_run.js';

export const networkGetController = async (req: Request, res: Response): Promise<void> => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  addUserOperationEntry('NETWORK_GET', `Request to fetch network information: '${networkName}'`);
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Network not found',
        detail: 'requested network is not found',
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
  addUserOperationEntry('NETWORK_UPDATE', `Request to update network: '${networkName}'`);
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
  const networkData: NetworkInfo = req.body;
  addUserOperationEntry('NETWORK_CREATE', `Request to create network: '${networkData.name}'`);
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

export const networkRunGetController = async (req: Request, res: Response) => {
  const runId = typeof req.query.runId === 'string' ? req.query.runId : '';
  addUserOperationEntry('NETWORK_RUN_GET', `Request to fetch network run information: '${runId}'`);
  const execRun = new ExecRun(runId);
  const execRunExists = await execRun.exists();
  if (!execRunExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Network run not found',
        detail: 'requested network run is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const execRunInfo = await execRun.get();

  res.json({
    success: true,
    result: execRunInfo,
  });
};

export const networkTestController = async (req: Request, res: Response) => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  addUserOperationEntry('NETWORK_TEST', `Request to test network: '${networkName}'`);
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

export const networkStatusController = async (req: Request, res: Response) => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  addUserOperationEntry('NETWORK_STATUS', `Request to fetch network status: '${networkName}'`);
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    res.statusCode = 404;
    res.json({
      success: false,
      error: {
        type: 'ERROR_NOT_FOUND',
        title: 'Network not found',
        detail: 'requested network is not found',
        instance: req.originalUrl,
      },
    });
    return;
  }
  const status = await network.getNetworkState();
  res.json({
    success: true,
    result: {
      name: networkName,
      status,
    },
  });
};

export const networkDeleteController = async (req: Request, res: Response) => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
  addUserOperationEntry('NETWORK_DELETE', `Request to delete network: '${networkName}'`);
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
  addUserOperationEntry('NETWORK_LIST', 'Request to list networks');
  const networkListReq = req.body;
  const pageNum = networkListReq.meta
    && networkListReq.meta.pageNum ? networkListReq.meta.pageNum : 1;
  const numOfRec = networkListReq.meta ? networkListReq.meta.numOfRec : 10;
  const {
    result: networks,
    totalNumberOfRecCount,
    currentPageRecCount,
  } = await getNetworkList(networkListReq.filter, networkListReq.sort ?? [], {
    pageNum,
    numOfRec,
  });

  res.json({
    success: true,
    result: networks,
    meta: {
      pageNum,
      numOfRec: currentPageRecCount,
      total: totalNumberOfRecCount,
    },
  });
};

export const networkRunListController = async (req: Request, res: Response): Promise<void> => {
  addUserOperationEntry('NETWORK_RUN_LIST', 'Request to list networks and test runs');
  const networkRunListReq = req.body;
  const pageNum = networkRunListReq.meta
    && networkRunListReq.meta.pageNum ? networkRunListReq.meta.pageNum : 1;
  const numOfRec = networkRunListReq.meta ? networkRunListReq.meta.numOfRec : 10;
  const {
    result: networkRuns,
    totalNumberOfRecCount,
    currentPageRecCount,
  } = await getExecRunList(networkRunListReq.filter, networkRunListReq.sort ?? [], {
    pageNum,
    numOfRec,
  });

  res.json({
    success: true,
    result: networkRuns,
    meta: {
      pageNum,
      numOfRec: currentPageRecCount,
      total: totalNumberOfRecCount,
    },
  });
};
