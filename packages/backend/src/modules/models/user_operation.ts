import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import { getTimestamp } from '../../utils/time.js';

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

export const getOperationList = async () => {
  const result = await knexInstance(primaryTableName)
    .select(['*'])
    .orderBy(['created_at', 'id']);
  return result;
};
