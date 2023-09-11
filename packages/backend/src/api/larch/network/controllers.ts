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

/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import {
  deleteNetwork, createNetwork,
} from '../../../modules/network.js';
import { addUserOperationEntry } from '../../../modules/user_operation.js';
import { Network, NetworkInfo, getNetworkList } from '../../../modules/models/network.js';
import { AppError } from '../../../utils/declaration.js';
import { ExecRun, getExecRunList } from '../../../modules/models/exec_run.js';
import { readFromYamlFile } from '../../../utils/fs_helper.js';
import { ZOMBIENET_NETWORKS_EXECUTION_DIR } from '../../../config.js';

export const networkGetController = async (req: Request, res: Response): Promise<void> => {
  const networkName = typeof req.query.networkName === 'string' ? req.query.networkName : '';
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
    const networkRunInfo = await createNetwork(networkData, 'evaluation');
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
  const networkData: NetworkInfo = req.body;
  addUserOperationEntry('NETWORK_TEST', `Request to create network: '${networkData.name}'`);
  try {
    const networkRunInfo = await createNetwork(networkData, 'testing');
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
  
  await Promise.all(
    networks.map(async (network) => {
      if (!network.networkDirectory || network?.networkState !== 'running' || network?.networkProvider !== 'podman') return;
      let monitoringPort = 0;
      try {
        monitoringPort = (await readFromYamlFile(`${network.networkDirectory}/grafana.yaml`)).spec?.containers[0]?.ports[0]?.hostPort as number;
        if (monitoringPort) network.monitoringPort = monitoringPort;
      } catch (error) {
        console.error(`Not found port for monitoring, error: ${error}`);
      }
    })
  )

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
