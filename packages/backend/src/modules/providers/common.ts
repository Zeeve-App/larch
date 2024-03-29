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

/* eslint-disable import/prefer-default-export */
import path from 'path';
import { checkPathExists } from '../../utils/fs_helper.js';
import { Provider } from '../models/network.js';
import * as podman from './podman.js';
import * as k8 from './k8.js';

export const checkZombieJson = async (
  networkDirectory: string,
): Promise<boolean> => checkPathExists(
  path.join(networkDirectory, 'zombie.json'),
);

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
  } else if (provider === 'kubernetes') {
    try {
      const namespace = await k8.getNamespace(networkDirectory);
      await k8.cleanUp(namespace, networkName);
    } catch (error) {
      // @ts-ignore
      if (error!.code === 'ENOENT') {
        console.error('File do not exists, skipping network deletion');
      }
    }
  }
};

export const isNetworkReady = async (
  provider: Provider,
  networkDirectory: string,
) => {
  switch (provider) {
    case 'podman': return checkZombieJson(networkDirectory);
    case 'kubernetes': return checkZombieJson(networkDirectory);
    default: return true;
  }
};
