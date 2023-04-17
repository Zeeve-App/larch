/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import ActivityListTable from './table';
import PaginatedItems from '../../../components/pagination';
import {
  getUserActivityList,
  getFilteredActvityList,
} from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import Filter from './filter';
import { useActivityFilterStore, useFilterSubmit } from '../../../store/activityStore';

export default function Listing() {
  const [activityList, setActivityList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);

  const activityFilterData = useActivityFilterStore(
    (state) => state.activityFilterData,
  );
  const isFilterSubmit = useFilterSubmit(
    (state) => state.isFilterSubmit,
  );

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  useEffect(() => {
    getUserActivityList({
      meta: {
        numOfRec: itemPerPage,
        pageNum,
      },
    })
      .then((response) => {
        setActivityList(response.result);
        setMeta(response.meta);
      })
      .catch(() => {
        notify('error', 'Failed to fetch activity list');
      });
  }, [pageNum]);

  useEffect(() => {
    console.log('isFilterSubmit', isFilterSubmit);
    const filterData = () => {
      console.log('activityFilterData', activityFilterData);
      const payload = {
        filter: {
          operation: '',
          operationDetail: '',
        },
        sort: [
          {
            field: 'date',
            direction: sort,
          },
        ],
        meta: {
          pageNum,
          numOfRec: itemPerPage,
        },
      };
      getFilteredActvityList(payload)
        .then((response) => {
          console.log('response', response);
          setActivityList(response.result);
          setMeta(response.meta);
        })
        .catch((err) => {
          notify('error', 'Failed to fetch activity list');
        });
    };
    filterData();
  }, [isFilterSubmit, sort]);

  return (
    <>
      <div className='flex w-full flex-wrap content-center item-center justify-end gap-4'>
        <Filter />
      </div>
      <div className='flex flex-col justify-between'>
        <ActivityListTable
          activityList={activityList}
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
