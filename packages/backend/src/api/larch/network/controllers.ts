/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import * as fs from 'fs';
import { randomUUID } from 'node:crypto';
import {
  LARCH_CONTEXT_DIR,
  ZOMBIENET_VERSION,
  LARCH_DEFAULT_PROVIDER_NAME,
  ZOMBIENET_NETWORKS_COLLECTION_DIR,
} from '../../../config.js';
// import { testZombienet } from '../../../utils/index.js';
import { runZombienet } from '../../../modules/zombienet.js';
import {
  showNetwork, createDirectory,
  displayZombienetRunOutput, addNetworkInfo,
  runZombienetForTest, createTestDirectory,
  displayZombienetTestRunOutput, updateWithConfig,
  updateWithoutConfig, updateNetworkStatus,
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
  const result = await showNetwork(updatedNetworkName);
  res.send(result);
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
  }, ZOMBIENET_VERSION, randomUUID());
  res.send('');
};

export const networkTestRunController = async (req: Request, res: Response) => {
  const networkId: any = req.query.networkRunId;
  const result = await displayZombienetTestRunOutput(networkId);
  res.send(result);
};

export const networkController = async (req: Request, res: Response) => {
  try {
    const { filter, meta } = req.body;

    const { networkName } = filter;
    const newNetworkName: string = networkName.replace(/\s/g, '');

    const { numberOfRecords } = meta;
    const results: any = {};

    const networkLocationArr = [];
    networkLocationArr.push(LARCH_CONTEXT_DIR);
    networkLocationArr.push('/networks.json');

    const networkLocation = networkLocationArr.join('');

    if (!(fs.existsSync(networkLocation))) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    fs.readFile(networkLocation, 'utf8', (err, data) => {
      if (err) {
        return res.status(404).send({ message: 'No Networks Available' });
      }
      const networkList = JSON.parse(data);

      for (let i = 0; i < networkList.length; i++) {
        if (networkList[i].name === newNetworkName) {
          const pageCount = (i / numberOfRecords) + 1;
          const pageNo = Math.trunc(pageCount);
          const startIndex: number = (pageNo - 1) * numberOfRecords;
          const endIndex: number = pageNo * numberOfRecords;

          if (endIndex < networkList.length) {
            results.next = {
              page: pageNo + 1,
              limit: numberOfRecords,
            };
          }
          if (startIndex > 0) {
            results.previous = {
              page: pageNo - 1,
              limit: numberOfRecords,
            };
          }

          results.results = [];
          results.results.push(networkList[i]);
          results.pageNo = pageNo;
          results.skippedRecords = i;
          results.skippedPages = pageNo - 1;
          results.totalRecords = networkList.length;

          return res.status(200).send(results);
        }
      }
      return res.status(404).json({ message: 'No Networks Available' });
    });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
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
  try {
    const searchNetwork = req.query.networkName;
    const networkLocationArr = [];
    networkLocationArr.push(LARCH_CONTEXT_DIR);
    networkLocationArr.push('/networks.json');

    const networkLocation = networkLocationArr.join('');

    fs.readFile(networkLocation, 'utf8', (err, data) => {
      if (err) {
        return res.status(404).json({ message: 'No Network to show the progress' });
      }
      const networkJson = JSON.parse(data);
      const arrLength: number = networkJson.length;

      if (arrLength <= 0) {
        return res.status(404).json({ message: 'No Network to show the progress' });
      }

      for (let i = 0; i < arrLength; i++) {
        if (networkJson[i].name === searchNetwork) {
          return res.status(200).json({ networkState: networkJson[i].networkState });
        }
      }

      return res.status(404).json({ message: 'No Network to show the progress' });
    });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
};
