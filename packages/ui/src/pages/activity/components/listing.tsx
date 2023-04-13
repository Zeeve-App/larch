import { useEffect, useState } from 'react';
import ActivityListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getUserActivityList } from '../../../utils/api';
import { notify } from '../../../utils/notifications';

export default function Listing() {
  const [activityList, setActivityList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  useEffect(() => {
    getUserActivityList({
      meta: {
        numOfRec: itemPerPage,
        pageNum,
      },
    }).then((response) => {
      setActivityList(response.result);
      setMeta(response.meta);
    }).catch(() => {
      notify('error', 'Failed to fetch activity list');
    });
  }, [pageNum]);

  return (
    <div className='h-[584px] flex flex-col justify-between'>
      <ActivityListTable activityList={activityList} />
      <div className='flex flex-row justify-end'>
        <PaginatedItems itemsPerPage={itemPerPage} totalRecords={meta.total} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
