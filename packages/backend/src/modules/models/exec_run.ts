import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import {
  DefaultSort, FieldMap, PaginationInfo, SortInfo, getPaginatedInfo,
} from '../../utils/pagination.js';
import { getTimestamp } from '../../utils/time.js';

const primaryTableName = 'exec_run';

export type Intention = 'NETWORK_CREATE' | 'NETWORK_TEST';
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
