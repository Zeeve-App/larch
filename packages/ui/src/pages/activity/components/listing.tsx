import { useEffect, useState } from 'react';
import ActivityListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getUserActivityList } from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import Filter from '../../../components/filter';
import RefreshButton from '../../../components/refresh';
import Loader from '../../../components/loader';
import { ActivityFilterInput } from '../../../types/filter.types';

type ListingProps = {
  updateList: boolean
};

export default function Listing({ updateList }: ListingProps) {
  const [activityList, setActivityList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);
  const [pageToggle, setPageToggle] = useState(true);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [activityFilterData, setActivityFilterData] = useState([
    {
      label: 'ID',
      key: 'id',
      isSearchOpen: false,
    },
    {
      label: 'Operation Details',
      key: 'operationDetail',
      isSearchOpen: false,
    },
    {
      label: 'Date',
      key: 'createdAt',
      isSearchOpen: false,
    },
    {
      label: 'Operation',
      key: 'operation',
      isSearchOpen: false,
    },
  ] as ActivityFilterInput[]);
  const [isFilterSubmit, setIsFilterSubmit] = useState<boolean>(false);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const filterData = () => {
    setIsShowLoader(true);
    const filter: { [name: string]: string } = {};
    activityFilterData.forEach((item) => {
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
    getUserActivityList(payload)
      .then((response) => {
        setActivityList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to fetch activity list');
      });
  };
  useEffect(() => {
    filterData();
  }, [pageNum, isFilterSubmit, sort, updateList, pageToggle]);

  return (
    <>
      {isShowLoader && <Loader />}
      <div className='flex w-full justify-end gap-4'>
        <Filter
          filterData={activityFilterData}
          isFilterSubmit={isFilterSubmit}
          setFilterData={setActivityFilterData}
          setIsFilterSubmit={setIsFilterSubmit}
        />
        <RefreshButton onClick={() => setPageToggle(!pageToggle)} />
      </div>
      <div className='flex flex-col justify-between'>
        <ActivityListTable
          activityList={activityList}
          setSort={setSort}
          sort={sort}
        />
       {activityList.length > 0 && <div className='right-2 bottom-0 flex flex-row justify-end'>
          <PaginatedItems
            itemsPerPage={itemPerPage}
            totalRecords={meta.total}
            onPageChange={onPageChange}
          />
        </div>}
      </div>
    </>
  );
}
