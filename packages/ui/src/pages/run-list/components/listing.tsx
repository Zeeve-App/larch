import { useEffect, useState } from 'react';
import ActivityListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getRunList } from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import Filter from '../../../components/filter';
import {
  useRunFilterStore,
} from '../../../store/runStore';
import { useFilterSubmit } from '../../../store/commonStore';

export default function Listing() {
  const [runList, setRunList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);

  const runFilterData = useRunFilterStore(
    (state) => state.runFilterData,
  );
  const setRunFilterData = useRunFilterStore(
    (state) => state.setRunFilterData,
  );

  const isFilterSubmit = useFilterSubmit((state) => state.isFilterSubmit);
  const setIsFilterSubmit = useFilterSubmit((state) => state.setIsFilterSubmit);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const filterData = () => {
    const filter: { [name: string]: string } = {};
    runFilterData.forEach((item) => {
      if (item.inputValue) filter[item.key] = item.inputValue;
    });
    const payload = {
      filter,
      sort: [
        {
          field: 'createdAt',
          direction: sort ? 'asc' : 'desc',
        },
      ],
      meta: {
        pageNum,
        numOfRec: itemPerPage,
      },
    };
    getRunList(payload)
      .then((response) => {
        setRunList(response.result);
        setMeta(response.meta);
      })
      .catch(() => {
        notify('error', 'Failed to fetch activity list');
      });
  };
  useEffect(() => {
    filterData();
  }, [pageNum, isFilterSubmit, sort]);

  return (
    <>
      <div className='flex w-full justify-end gap-4'>
        <Filter
          filterData={runFilterData}
          isFilterSubmit={isFilterSubmit}
          setFilterData={setRunFilterData}
          setIsFilterSubmit={setIsFilterSubmit}
        />
      </div>
      <div className='flex flex-col justify-between'>
        <ActivityListTable
          activityList={runList}
          setSort={setSort}
          sort={sort}
        />
        <div className='right-2 bottom-0 flex flex-row justify-end'>
          <PaginatedItems
            itemsPerPage={itemPerPage}
            totalRecords={meta.total}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
