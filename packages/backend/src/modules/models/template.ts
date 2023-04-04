import { randomUUID } from 'node:crypto';
import { knexInstance } from '../db/sqlite.js';
import { getTimestamp } from '../../utils/time.js';

type TemplateInfo = {
  id: string;
  name: string;
  configFilename: string;
  configContent: string;
  networkDirectory: string;
  networkProvider: string;
  testFilename: string;
  testContent: string;
  updatedAt: string | null;
  createdAt: string | null;
};

export class Template {
  public id: string;

  private primaryTable = 'template';

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
        network_directory: templateInfo.networkDirectory,
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

export const getTemplateList = async () => {
  const result = await knexInstance('template')
    .select(['*'])
    .orderBy(['created_at', 'id']);
  return result;
};
