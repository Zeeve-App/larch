/* eslint-disable import/prefer-default-export */
import { Provider } from '../models/network.js';
import * as podman from './podman.js';

export const networkCleanUp = async (
  provider: Provider,
  networkName: string,
  networkDirectory: string,
): Promise<void> => {
  if (provider === 'podman') {
    try {
      const namespace = await podman.getNamespace(networkDirectory);
      await podman.cleanUp(namespace, networkName);
    } catch (error) {
      // @ts-ignore
      if (error!.code === 'ENOENT') {
        console.error('File do not exists, skipping network deletion');
      }
    }
  }
};
