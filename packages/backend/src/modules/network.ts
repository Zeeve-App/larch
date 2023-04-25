/* eslint-disable no-await-in-loop */
import {
  getAllNetworks, Network, NetworkInfo, NetworkState, NetworkType,
} from './models/network.js';
import {
  checkPathExists, createDir, deleteDir, writeToFileFromBase64,
} from '../utils/fs_helper.js';
import {
  LARCH_DEFAULT_PROVIDER_NAME,
  ZOMBIENET_NETWORKS_COLLECTION_DIR, ZOMBIENET_NETWORKS_EXECUTION_DIR, ZOMBIENET_VERSION,
} from '../config.js';
import { ExecRun, removeAllExecRunByRelatedId, getExecStatusCode } from './models/exec_run.js';
import { runZombienet } from './zombienet.js';
import { AppError } from '../utils/declaration.js';
import { isNetworkReady, networkCleanUp } from './providers/common.js';
import { deleteDirUnshare } from './providers/podman.js';
import { removeInProgressNetwork } from './exec_run.js';

const getNetworkPath = (networkName: string): string => `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkName}`;

let mutex = false;

async function networkStatusUpdate() {
  const networkList = await getAllNetworks();
  const networkUpdatePromiseList: Promise<any>[] = [];
  for (let i = 0; i < networkList.length; i++) {
    try {
      const network = new Network(networkList[i].name);
      // eslint-disable-next-line no-continue
      if ((await network.getNetworkState()) === 'failed') continue;
      const networkInfo = await network.get();
      const status = await getExecStatusCode(networkList[i].name, ['NETWORK_CREATE', 'NETWORK_TEST']);
      const networkReady = await isNetworkReady(
        networkInfo.networkProvider,
        networkInfo.networkDirectory,
      );
      const state: NetworkState = (() => {
        if (status !== null && status !== 0) return 'failed';
        if (networkReady) return 'running';
        if (status === null) return 'creating';
        return 'running';
      })();
      networkUpdatePromiseList.push(network.updateNetworkStatus(state));
    } catch (error) {
      console.error(error);
    }
  }
  await Promise.allSettled(networkUpdatePromiseList);
}

function startInterval() {
  setInterval(() => {
    if (mutex) return;
    mutex = true;
    networkStatusUpdate()
      .catch(console.error)
      .finally(() => { mutex = false; });
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

export const createNetwork = async (networkInfo: NetworkInfo, type: NetworkType): Promise<{
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
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkInfo.name}`;
  const networkExecPath = `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkInfo.name}`;
  const networkConfigPath = `${networkDirPath}/${networkInfo.configFilename}`;
  const setNetworkWithState = (networkState: NetworkState) => network.set({
    ...networkInfo,
    type,
    networkState,
    networkDirectory: networkExecPath,
  });
  try {
    await setNetworkWithState('creating');
    await createDir(networkDirPath);
    await createDir(ZOMBIENET_NETWORKS_EXECUTION_DIR);
    await writeToFileFromBase64(networkConfigPath, networkInfo.configContent);
    if (networkInfo.testFilename && networkInfo.testContent) {
      const networkTestConfigPath = `${networkDirPath}/${networkInfo.testFilename}`;
      await writeToFileFromBase64(networkTestConfigPath, networkInfo.testContent);
    }
  } catch (error) {
    await setNetworkWithState('failed');
    throw new AppError({
      kind: 'NETWORK_DIR_CREATE_ERROR',
      message: `Network dir creation error with network name ${networkInfo.name}`,
    });
  }
  await runZombienet({
    spawn: type === 'evaluation',
    test: type === 'testing',
    networkConfigPath: `${networkDirPath}/${networkInfo.configFilename}`,
    testConfigPath: `${networkDirPath}/${networkInfo.testFilename}`,
    provider: networkInfo.networkProvider ?? LARCH_DEFAULT_PROVIDER_NAME,
    dir: networkExecPath,
  }, ZOMBIENET_VERSION, runInfo.id, networkInfo.name);

  return {
    name: networkInfo.name,
    runId: runInfo.id,
  };
};
