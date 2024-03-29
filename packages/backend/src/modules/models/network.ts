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

import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import { getTimestamp } from '../../utils/time.js';
import {
  DefaultSort, FieldMap, PaginationInfo, SortInfo, getPaginatedInfo,
} from '../../utils/pagination.js';

const primaryTableName = 'networks';

export type NetworkState = 'creating' | 'running' | 'in-cleanup' | 'failed';
export type Provider = 'podman' | 'kubernetes' | 'native';
export type NetworkType = 'evaluation' | 'testing';

export type NetworkInfo = {
  name: string;
  type: NetworkType;
  configFilename: string;
  configContent: string;
  networkDirectory: string;
  networkProvider: Provider;
  testFilename: string;
  testContent: string;
  networkState: NetworkState;
  updatedAt: string | null;
  createdAt: string | null;
};

export class Network {
  public name: string;

  private primaryTable = primaryTableName;

  private db = () => knexInstance(this.primaryTable);

  constructor(name?: string) {
    this.name = name ?? randomUUID();
  }

  async set(networkInfo: NetworkInfo): Promise<void> {
    const [result] = await this.db()
      .select(['name', 'created_at'])
      .where('name', this.name);

    const currentTimestamp = getTimestamp();
    await this.db()
      .insert({
        name: this.name,
        type: networkInfo.type,
        config_filename: networkInfo.configFilename,
        config_content: networkInfo.configContent,
        network_directory: networkInfo.networkDirectory,
        network_provider: networkInfo.networkProvider,
        test_filename: networkInfo.testFilename,
        test_content: networkInfo.testContent,
        network_state: networkInfo.networkState,
        updated_at: result ? currentTimestamp : null,
        created_at: result ? result.createdAt : currentTimestamp,
      })
      .onConflict('name')
      .merge();
  }

  async get(): Promise<NetworkInfo> {
    const [result] = await this.db()
      .select('*')
      .where('name', this.name);
    return {
      id: this.name,
      ...result,
    };
  }

  async exists(): Promise<boolean> {
    const [result] = await this.db()
      .select('name')
      .where('name', this.name);
    return typeof result !== 'undefined';
  }

  async getNetworkState(): Promise<NetworkState> {
    const [result] = await this.db()
      .select('network_state')
      .where('name', this.name);
    return result.networkState;
  }

  async remove(): Promise<void> {
    await this.db()
      .where('name', this.name)
      .delete();
  }

  async updateStatus(
    state: NetworkState,
  ): Promise<void> {
    await this.db()
      .where('name', this.name)
      .update({
        network_state: state,
      });
  }

  async updateNetworkStatus(
    state: NetworkState,
  ): Promise<void> {
    await this.db()
      .where('name', this.name)
      .update({
        network_state: state,
      });
  }
}

type FilterInfo = {
  name: string,
  type: string,
  configFilename: string,
  networkProvider: string,
  testFilename: string
};

const fieldMap: FieldMap = {
  networkProvider: 'network_provider',
  configFilename: 'config_filename',
  testFilename: 'test_filename',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const defaultSort: DefaultSort = {
  createdAt: 'desc',
  name: 'asc',
};

export const getNetworkList = async (
  filter: FilterInfo,
  sortArray: SortInfo,
  pageInfo: PaginationInfo,
) => {
  const getModel = () => knexInstance.table(primaryTableName).where((builder) => {
    if (!filter) return;
    if (filter.name) builder.whereLike('name', `%${filter.name}%`);
    if (filter.type) builder.whereLike('type', `%${filter.type}%`);
    if (filter.configFilename) builder.whereLike('config_filename', `%${filter.configFilename}%`);
    if (filter.networkProvider) builder.whereLike('network_provider', `%${filter.networkProvider}%`);
    if (filter.testFilename) builder.whereLike('test_filename', `%${filter.testFilename}%`);
  });
  return getPaginatedInfo(pageInfo, sortArray, getModel, fieldMap, defaultSort);
};

export const getAllNetworks = async () => {
  const result = await knexInstance.table(primaryTableName)
    .select('*')
    .orderBy('created_at', 'desc');
  return result;
};
