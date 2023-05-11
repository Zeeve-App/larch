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
