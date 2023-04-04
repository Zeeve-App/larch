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
