/* eslint-disable import/prefer-default-export */
import { Provider } from '../models/network.js';
import * as podman from './podman.js';

export const networkCleanUp = async (
  provider: Provider,
  networkName: string,
  networkDirectory: string,
): Promise<void> => {
  if (provider === 'podman') {
    const namespace = await podman.getNamespace(networkDirectory);
    await podman.cleanUp(namespace, networkName);
  }
};
