import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import { getTimestamp } from '../../utils/time.js';
import {
  DefaultSort, FieldMap, PaginationInfo, SortInfo, getPaginatedInfo,
} from '../../utils/pagination.js';

type TemplateInfo = {
  id: string;
  name: string;
  configFilename: string;
  configContent: string;
  networkProvider: string;
  testFilename: string;
  testContent: string;
  updatedAt: string | null;
  createdAt: string | null;
};

const primaryTableName = 'template';

export class Template {
  public id: string;

  private primaryTable = primaryTableName;

  private db = () => knexInstance(this.primaryTable);

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  async set(templateInfo: TemplateInfo): Promise<void> {
    const [result] = await this.db()
      .select(['id', 'created_at'])
      .where('id', this.id);

    const currentTimestamp = getTimestamp();
    await this.db()
      .insert({
        id: this.id,
        name: templateInfo.name,
        config_filename: templateInfo.configFilename,
        config_content: templateInfo.configContent,
        network_provider: templateInfo.networkProvider,
        test_filename: templateInfo.testFilename,
        test_content: templateInfo.testContent,
        updated_at: result ? currentTimestamp : null,
        created_at: result ? result.createdAt : currentTimestamp,
      })
      .onConflict('id')
      .merge();
  }

  async get(): Promise<TemplateInfo> {
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

type FilterInfo = {
  name: string,
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
  id: 'asc',
};

export const getTemplateList = async (
  filter: FilterInfo,
  sortArray: SortInfo,
  pageInfo: PaginationInfo,
) => {
  const getModel = () => knexInstance.table(primaryTableName).where((builder) => {
    if (!filter) return;
    if (filter.name) builder.whereLike('name', `%${filter.name}%`);
    if (filter.configFilename) builder.whereLike('config_filename', `%${filter.configFilename}%`);
    if (filter.networkProvider) builder.whereLike('network_provider', `%${filter.networkProvider}%`);
    if (filter.testFilename) builder.whereLike('test_filename', `%${filter.testFilename}%`);
  });
  return getPaginatedInfo(pageInfo, sortArray, getModel, fieldMap, defaultSort);
};
