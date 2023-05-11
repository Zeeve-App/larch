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

import { Knex } from 'knex';

export type PaginationInfo = {
  pageNum: number,
  numOfRec: number,
};

export type SortInfo = {
  field: string,
  direction: 'asc' | 'desc',
}[];

export type FieldMap = { [key: string]: string };

export type DefaultSort = { [key: string]: 'desc' | 'asc' };

export const getPaginatedInfo = async (
  pageInfo: PaginationInfo,
  sortArray: SortInfo,
  getModel: () => Knex.QueryBuilder,
  fieldMap: FieldMap,
  defaultSort: DefaultSort,
): Promise<{
  result: any[], totalNumberOfRecCount: number, currentPageRecCount: number
}> => {
  const offsetFactor = pageInfo.pageNum <= 0 ? 0 : pageInfo.pageNum - 1;
  const getPagedModel = () => getModel().clone()
    .offset(pageInfo.numOfRec * offsetFactor)
    .limit(pageInfo.numOfRec);

  const result = await getPagedModel().clone()
    .select(['*'])
    .modify((queryBuilder) => {
      const localDefaultSort: DefaultSort = { ...defaultSort }; // destructure since single level
      sortArray.forEach((sort) => {
        if (localDefaultSort[sort.field]) delete localDefaultSort[sort.field];
        queryBuilder.orderBy(fieldMap[sort.field] ?? sort.field, sort.direction ?? 'asc');
      });
      Object.keys(localDefaultSort).forEach((field) => {
        queryBuilder.orderBy(fieldMap[field] ?? field, localDefaultSort[field]);
      });
    });
  const currentPageRecCount = result.length;
  const [countResult]: { [key: string]: number }[] = await getModel().clone()
    .count(['*']);
  const totalNumberOfRecCount = countResult ? countResult['count(*)'] : 0;
  return { result, totalNumberOfRecCount, currentPageRecCount };
};
