/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import * as fs from 'fs';
import { randomUUID } from 'node:crypto';
import { LARCH_CONTEXT_DIR, ZOMBIENET_VERSION } from '../../../config.js';
import { startZombienet, testZombienet } from '../../../utils/index.js';
import { runZombienet } from '../../../modules/zombienet.js';

export const testZombie = async (req: Request, res: Response) => {
  runZombienet({ version: true }, ZOMBIENET_VERSION, randomUUID());
  res.send('');
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

export const createNetworkController = async (req: Request, res: Response) => {
  try {
    const {
      dirName, fileName, networkName, confFile, dslFileName, dslFile,
    } = req.body;

    const updatedNetworkName = networkName.replace(/\s/g, '');
    if (fs.existsSync(dirName)) {
      return res.status(400).json({ message: 'This directory already exists at this location, please change the location or directory name' });
    }
    // eslint-disable-next-line max-len, block-scoped-var
    await startZombienet(dirName, fileName, updatedNetworkName, confFile, dslFileName, dslFile);

    return res.status(200).json({
      message: 'Network started successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server Error');
  }
};

export const displayNetworkController = async (req: Request, res: Response) => {
  const searchNetwork = req.query.networkName;

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
    const networkArr = JSON.parse(data);
    const networkArrLength: number = networkArr.length;

    if (networkArrLength <= 0) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    // Searching for the network in networks.json
    for (let i = 0; i < networkArrLength; i++) {
      if (networkArr[i].name === searchNetwork) {
        return res.status(200).send(networkArr[i]);
      }
    }
    return res.status(404).send({ message: 'No Networks Available' });
  });
};

export const testNetworkController = async (req: Request, res: Response) => {
  const searchNetwork: string | any = req.query.networkName;
  const updatedNetworkName = searchNetwork.replace(/\s/g, '');
  // res.send(searchNetwork)

  const networkLocationArr = [];
  networkLocationArr.push(LARCH_CONTEXT_DIR);
  networkLocationArr.push('/networks.json');

  const networkLocation = networkLocationArr.join('');

  if (!(fs.existsSync(networkLocation))) {
    return res.status(404).send({ message: 'No Networks Available' });
  }
  fs.readFile(networkLocation, 'utf8', async (err, data) => {
    if (err) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    const networkArr = JSON.parse(data);
    const networkArrLength: number = networkArr.length;

    if (networkArrLength <= 0) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    // Searching for the network in networks.json
    for (let i = 0; i < networkArrLength; i++) {
      if (networkArr[i].name === updatedNetworkName) {
        if (((networkArr[i].dslFileName === '')) || ((networkArr[i].dslFile === ''))) {
          return res.status(404).send({ message: 'Test Files Not Available, Please Add a Test File' });
        }
        if (!(networkArr[i].fileName)) {
          return res.status(404).send({ message: 'Configuration File Not Available' });
        }
        // If test file available then run the test file
        // eslint-disable-next-line no-await-in-loop
        await testZombienet(networkArr[i].name, networkArr[i].fileName, networkArr[i].dslFileName);
      }
    }
    return res.status(404).send({ message: 'No Networks Available' });
  });
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

  const networkLocationArr = [];
  networkLocationArr.push(LARCH_CONTEXT_DIR);
  networkLocationArr.push('/networks.json');

  const networkLocation = networkLocationArr.join('');
  if (!(fs.existsSync(networkLocation))) {
    return res.status(404).send({ message: 'No Networks Available' });
  }

  fs.readFile(networkLocation, 'utf8', async (err, data) => {
    if (err) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    const networkArr = JSON.parse(data);
    const networkArrLength: number = networkArr.length;

    if (networkArrLength <= 0) {
      return res.status(404).send({ message: 'No Networks Available' });
    }
    // Searching for the network in networks.json
    for (let i = 0; i < networkArrLength; i++) {
      if (networkArr[i].name === updatedNetworkName) {
        if (confFile) {
          networkArr[i].fileName = fileName;
          networkArr[i].confFile = confFile;
          networkArr[i].dslFileName = dslFileName;
          networkArr[i].dslFile = dslFile;

          const newArr = JSON.stringify(networkArr);

          // eslint-disable-next-line @typescript-eslint/no-shadow
          fs.writeFile(networkLocation, newArr, (err) => {
            // In case of a error throw err.
            if (err) {
              return res.status(404).send({ message: 'Error Finding Network' });
            }
          });

          return res.status(200).send({ message: 'Network Config Updated Successfully' });
        }
        if (!(confFile)) {
          networkArr[i].fileName = fileName;
          networkArr[i].dslFileName = dslFileName;
          networkArr[i].dslFile = dslFile;

          const newArr = JSON.stringify(networkArr);

          // eslint-disable-next-line @typescript-eslint/no-shadow
          fs.writeFile(networkLocation, newArr, (err) => {
            // In case of a error throw err.
            if (err) {
              return res.status(404).send({ message: 'Error Finding Network' });
            }
          });

          return res.status(200).send({ message: 'Network Config Updated Successfully' });
        }
      }
    }
    return res.status(404).send({ message: 'No Networks Available' });
  });
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
