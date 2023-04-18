import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import { getTimestamp } from '../../utils/time.js';
import {
  DefaultSort, FieldMap, PaginationInfo, SortInfo, getPaginatedInfo,
} from '../../utils/pagination.js';

type OperationInfo = {
  id: string;
  operation: string;
  operationDetail: string;
  createdAt: string;
};

const primaryTableName = 'user_operation';

export class UserOperation {
  public id: string;

  private primaryTable = primaryTableName;

  private db = () => knexInstance(this.primaryTable);

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  async set(operationInfo: OperationInfo): Promise<void> {
    const [result] = await this.db()
      .select(['id'])
      .where('id', this.id);
    if (result) throw new Error('Operation with same ID cannot be created');
    const currentTimestamp = getTimestamp();
    await this.db()
      .insert({
        id: this.id,
        operation: operationInfo.operation,
        operation_detail: operationInfo.operationDetail,
        created_at: currentTimestamp,
      });
  }

  async get(): Promise<OperationInfo> {
    const [result] = await this.db()
      .select('*')
      .where('id', this.id);
    return {
      id: this.id,
      ...result,
    };
  }

  async exists(): Promise<boolean> {
    const [result] = await this.db()
      .select('id')
      .where('id', this.id);
    return typeof result !== 'undefined';
  }

  async remove(): Promise<void> {
    await this.db()
      .delete()
      .where('id', this.id);
  }
}

export const purgeOperationData = async () => knexInstance(primaryTableName)
  .truncate();

type FilterInfo = {
  id: string,
  operation: string,
  operationDetail: string,
};

const fieldMap: FieldMap = {
  operationDetail: 'operation_detail',
  createdAt: 'created_at',
};

const defaultSort: DefaultSort = {
  createdAt: 'desc',
  id: 'asc',
};

export const getOperationList = async (
  filter: FilterInfo,
  sortArray: SortInfo,
  pageInfo: PaginationInfo,
) => {
  const getModel = () => knexInstance.table(primaryTableName).where((builder) => {
    if (!filter) return;
    if (filter.id) builder.where('id', filter.id);
    if (filter.operation) builder.where('operation', filter.operation);
    if (filter.operationDetail) builder.whereLike('operation_detail', `%${filter.operationDetail}%`);
  });
  return getPaginatedInfo(pageInfo, sortArray, getModel, fieldMap, defaultSort);
};
