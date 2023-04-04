/* eslint-disable consistent-return */
import { Request, Response } from 'express';
// import * as fs from 'fs';
import { randomUUID } from 'node:crypto';
import {
  /* LARCH_CONTEXT_DIR, */
  ZOMBIENET_VERSION,
  LARCH_DEFAULT_PROVIDER_NAME,
  ZOMBIENET_NETWORKS_COLLECTION_DIR,
} from '../../../config.js';
import { runZombienet } from '../../../modules/zombienet.js';
import {
  showNetwork, createDirectory,
  displayZombienetRunOutput, addNetworkInfo,
  runZombienetForTest, createTestDirectory,
  displayZombienetTestRunOutput, updateWithConfig,
  updateWithoutConfig, updateNetworkStatus,
  showNetworkProgress, deleteNetwork,
  checkNetworkName, allNetworkInfo,
} from '../../../modules/network.js';

import { checkPathExists } from '../../../utils/fs_helper.js';

export const networkRunId = randomUUID();

export const testZombie = async (req: Request, res: Response) => {
  runZombienet({ version: true }, ZOMBIENET_VERSION, randomUUID());
  res.send('');
};

export const createNetworkController = async (req: Request, res: Response) => {
  const {
    networkName, dirName, confFileName, confFileData, dslFileName, dslFileData,
  } = req.body;
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkName}`;
  const pathExists = await checkPathExists(dirName);
  if (pathExists) {
    return res.status(400).json({ message: 'Directory Already Exists' });
  }
  await createDirectory(networkName, confFileName, confFileData);
  await addNetworkInfo(
    networkRunId,
    networkName,
    confFileName,
    confFileData,
    dirName,
    LARCH_DEFAULT_PROVIDER_NAME,
    dslFileName,
    dslFileData,
  );
  await runZombienet({
    spawn: true,
    networkConfigPath: `${networkDirPath}/${confFileName}`,
    provider: LARCH_DEFAULT_PROVIDER_NAME,
    dir: dirName,
  }, ZOMBIENET_VERSION, networkRunId);
  res.status(200).json({
    message: 'Network Running...',
  });
  await updateNetworkStatus(networkRunId);
};

export const networkRunController = async (req: Request, res: Response) => {
  const networkId: any = req.query.networkRunId;
  const result = await displayZombienetRunOutput(networkId);
  res.send(result);
};

export const displayNetworkController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  const result = await checkNetworkName(updatedNetworkName);
  if (result === 1) {
    res.json({ message: 'No Such Network' });
  }
  if (result === 0) {
    const networkDetails = await showNetwork(updatedNetworkName);
    res.send(networkDetails);
  }
};

export const testNetworkController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${updatedNetworkName}`;
  const result: any = await runZombienetForTest(updatedNetworkName);
  if (result == null) {
    res.json({ message: 'No Test File Available' });
  }
  await createTestDirectory(updatedNetworkName, result[0].test_filename, result[0].test_content);
  await runZombienet({
    test: true,
    testConfigPath: `${networkDirPath}/${result[0].test_filename}`,
    provider: LARCH_DEFAULT_PROVIDER_NAME,
  }, ZOMBIENET_VERSION, networkRunId);
  res.send('');
};

export const networkTestRunController = async (req: Request, res: Response) => {
  const networkId: any = req.query.networkRunId;
  const result = await displayZombienetTestRunOutput(networkId);
  res.send(result);
};

export const updateNetworkController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');

  const {
    dslFileName, dslFile, fileName, confFile,
  } = req.body;

  if ((!(dslFileName)) || (!(dslFile)) || (!(fileName))) {
    return res.status(404).json({ message: 'Empty values are not allowed' });
  }
  if (confFile) {
    await updateWithConfig(updatedNetworkName, dslFileName, dslFile, fileName, confFile);
    return res.status(200).send('');
  }
  if (!confFile) {
    await updateWithoutConfig(updatedNetworkName, dslFileName, dslFile, fileName);
    return res.status(200).send('');
  }
};

export const progressController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  const result = await showNetworkProgress(updatedNetworkName);
  res.send(result);
};

export const deleteNetworkController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  await deleteNetwork(updatedNetworkName);
  res.json({ message: 'Network Deleted Successfully' });
};

export const networkController = async (req: Request, res: Response) => {
  const { filter, meta } = req.body;
  const { networkName } = filter;
  const updatedNetworkName: string = networkName.replace(/\s/g, '');
  const { page, numberOfRecords } = meta;
  const storeResults = await allNetworkInfo();
  const startIndex: number = (page - 1) * numberOfRecords;
  const endIndex: number = page * numberOfRecords;
  const filteredItems = storeResults.filter(
    (storeResult: { name: string; }) => storeResult.name
      .includes(updatedNetworkName),
  );
  const pageItems = filteredItems.slice(startIndex, endIndex);
  const metaValue = {
    currentPage: page,
    totalPages: Math.ceil(filteredItems.length / numberOfRecords),
    totalCount: filteredItems.length,
    pageSize: pageItems.length,
  };
  res.json({ items: pageItems, metaValue });
};
