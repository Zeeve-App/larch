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
import {
  DefaultSort, FieldMap, PaginationInfo, SortInfo, getPaginatedInfo,
} from '../../utils/pagination.js';
import { getTimestamp } from '../../utils/time.js';
import { AppError } from '../../utils/declaration.js';

const primaryTableName = 'exec_run';

export type Intention = 'NETWORK_CREATE' | 'NETWORK_TEST' | 'NETWORK_CLEANUP' | 'PODMAN_PREREQUISITES';
export type RelatedId = string | null;

export type ExecRunInfo = {
  id: string;
  intention: Intention;
  relatedId: RelatedId;
  command: string;
  stdError: string;
  stdOutput: string;
  statusCode: number;
};

export class ExecRun {
  public id: string;

  private primaryTable = primaryTableName;

  // Both latest std variables are used to improve
  // Race conditions, since nodejs runtime is single threaded
  // the locks are not needed and we only want to update latest value
  // or old value , even though query might run multiple times maybe for same value
  private latestStdError = '';

  private latestStdOutput = '';

  private db = () => knexInstance(this.primaryTable);

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  async addMinimalInfo(command: string, intention: Intention, relatedId: RelatedId): Promise<void> {
    const currentTimestamp = getTimestamp();
    await this.db()
      .insert({
        id: this.id,
        intention,
        related_id: relatedId,
        command,
        created_at: currentTimestamp,
      });
  }

  async updateStdError(stdError: string): Promise<void> {
    this.latestStdError = stdError;
    await this.db()
      .where('id', this.id)
      .update({ std_error: this.latestStdError });
  }

  async updateStdOutput(stdOutput: string): Promise<void> {
    this.latestStdOutput = stdOutput;
    await this.db()
      .where('id', this.id)
      .update({ std_output: this.latestStdOutput });
  }

  async updateStateCode(statusCode: number): Promise<void> {
    await this.db()
      .where('id', this.id)
      .update({ status_code: statusCode });
  }

  async get(): Promise<ExecRunInfo> {
    const [result] = await this.db()
      .select('*')
      .where('id', this.id);
    return result;
  }

  async exists(): Promise<boolean> {
    const [result] = await this.db()
      .select('id')
      .where('id', this.id);
    return typeof result !== 'undefined';
  }

  // eslint-disable-next-line class-methods-use-this
  async getRunInfoById(networkId: string): Promise<any> {
    const [result] = await this.db()
      .select('*')
      .where('id', networkId);
    return result;
  }

  async showNetworkState(networkId: string): Promise<any> {
    const result = await this.db()
      .select('status_code')
      .where('id', networkId);
    return result;
  }
}

type FilterInfo = {
  id: string,
  intention: string,
  relatedId: string,
  command: string,
};

const fieldMap: FieldMap = {
  relatedId: 'related_id',
  stdError: 'std_error',
  stdOutput: 'std_output',
  statusCode: 'status_code',
  createdAt: 'created_at',
};

const defaultSort: DefaultSort = {
  createdAt: 'desc',
  id: 'asc',
};

export const getExecRunList = async (
  filter: FilterInfo,
  sortArray: SortInfo,
  pageInfo: PaginationInfo,
) => {
  const getModel = () => knexInstance.table(primaryTableName).where((builder) => {
    if (!filter) return;
    if (filter.id) builder.whereLike('id', `%${filter.id}%`);
    if (filter.relatedId) builder.whereLike('related_id', `%${filter.relatedId}%`);
    if (filter.intention) builder.whereLike('intention', `%${filter.intention}%`);
    if (filter.command) builder.whereLike('network_provider', `%${filter.command}%`);
  });
  return getPaginatedInfo(pageInfo, sortArray, getModel, fieldMap, defaultSort);
};

export const removeAllExecRunByRelatedId = async (relatedId: string): Promise<void> => {
  await knexInstance.table(primaryTableName)
    .delete()
    .where('related_id', relatedId);
};

export const getExecStatusCode = async (
  relatedId: string,
  intentions: Intention[],
): Promise<number | null> => {
  const [result] = await knexInstance.table(primaryTableName)
    .select('status_code')
    .where('related_id', relatedId)
    .whereIn('intention', intentions)
    .orderBy('created_at', 'desc')
    .limit(1);
  if (!result) {
    throw new AppError({
      kind: 'NOT_FOUND',
      message: `No exec record found for "${relatedId}"`,
    });
  }
  return result.statusCode;
};
