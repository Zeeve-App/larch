/* eslint-disable no-await-in-loop */
import {
  getAllNetworks, Network, NetworkInfo, NetworkState,
} from './models/network.js';
import {
  checkPathExists, createDir, deleteDir, writeToFileFromBase64,
} from '../utils/fs_helper.js';
import {
  LARCH_DEFAULT_PROVIDER_NAME,
  ZOMBIENET_NETWORKS_COLLECTION_DIR, ZOMBIENET_VERSION,
} from '../config.js';
import { ExecRun, removeAllExecRunByRelatedId, getStatusCode } from './models/exec_run.js';
import { runZombienet } from './zombienet.js';
import { AppError } from '../utils/declaration.js';
import { networkCleanUp } from './providers/common.js';
import { deleteDirUnshare } from './providers/podman.js';
import { removeInProgressNetwork } from './exec_run.js';

const getNetworkPath = (networkName: string): string => `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkName}`;

async function networkStatusUpdate() {
  const sortedResult = await getAllNetworks();
  for (let i = 0; i < sortedResult.length; i++) {
    const result = await getStatusCode(sortedResult[i].name);
    const network = new Network(sortedResult[i].name);
    let state: NetworkState = 'failed';
    if (result === null) {
      state = 'creating';
    }
    if (result === 0) {
      state = 'running';
    }
    network.updateNetworkStatus(state);
  }
}
function startInterval() {
  setInterval(async () => {
    await networkStatusUpdate();
  }, 1000);
}

startInterval();

export const deleteNetwork = async (
  networkName: string,
): Promise<void> => {
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    throw new AppError({
      kind: 'NETWORK_NOT_FOUND',
      message: `Network with network name ${networkName} does not exists`,
    });
  }
  await network.updateStatus('in-cleanup');
  const networkInfo = await network.get();
  const networkPath = getNetworkPath(networkInfo.name);
  removeInProgressNetwork(networkInfo.name);
  if (await checkPathExists(networkPath)) await deleteDir(networkPath);
  if (await checkPathExists(networkInfo.networkDirectory)) {
    await networkCleanUp(
      networkInfo.networkProvider,
      networkInfo.name,
      networkInfo.networkDirectory,
    );
    try {
      await deleteDir(networkInfo.networkDirectory);
    } catch (error) {
      if (networkInfo.networkProvider === 'podman') {
        await deleteDirUnshare(networkInfo.networkDirectory, networkInfo.name);
      }
    }
  }
  await removeAllExecRunByRelatedId(networkInfo.name);
  await network.remove();
};

export const createNetwork = async (networkInfo: NetworkInfo): Promise<{
  name: string; runId: string;
}> => {
  const runInfo = new ExecRun();
  const network = new Network(networkInfo.name);
  const networkExists = await network.exists();
  if (networkExists) {
    throw new AppError({
      kind: 'NETWORK_EXISTS',
      message: `Network with network name ${networkInfo.name} already exists`,
    });
  }
  await network.set({ ...networkInfo, networkState: 'creating' });

  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkInfo.name}`;
  const networkConfigPath = `${networkDirPath}/${networkInfo.configFilename}`;
  await createDir(networkDirPath);
  await createDir(networkInfo.networkDirectory);
  await writeToFileFromBase64(networkConfigPath, networkInfo.configContent);
  if (networkInfo.testFilename && networkInfo.testContent) {
    const networkTestConfigPath = `${networkDirPath}/${networkInfo.testFilename}`;
    await writeToFileFromBase64(networkTestConfigPath, networkInfo.testContent);
  }
  await runZombienet({
    spawn: true,
    networkConfigPath: `${networkDirPath}/${networkInfo.configFilename}`,
    // @ts-ignore
    provider: networkInfo.networkProvider ?? LARCH_DEFAULT_PROVIDER_NAME,
    dir: networkInfo.networkDirectory,
  }, ZOMBIENET_VERSION, runInfo.id, networkInfo.name);

  return {
    name: networkInfo.name,
    runId: runInfo.id,
  };
};

export const testNetwork = async (networkName: string): Promise<{
  name: string; runId: string;
}> => {
  const runInfo = new ExecRun();
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    throw new AppError({
      kind: 'NETWORK_NOT_FOUND',
      message: `Network with network name ${networkName} does not exists`,
    });
  }
  const networkInfo = await network.get();
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkInfo.name}`;

  await runZombienet({
    test: true,
    testConfigPath: `${networkDirPath}/${networkInfo.testFilename}`,
    // @ts-ignore
    provider: networkInfo.networkProvider ?? LARCH_DEFAULT_PROVIDER_NAME,
    dir: networkInfo.networkDirectory,
  }, ZOMBIENET_VERSION, runInfo.id, networkName);

  return {
    name: networkInfo.name,
    runId: runInfo.id,
  };
};
