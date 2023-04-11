import { useEffect, useState } from 'react';
import NetworkListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getNetworkList } from '../../../utils/apiCollection/fetchApi';

export default function Parent() {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };
  useEffect(() => {
    getNetworkList({
      meta: {
        numOfRec: itemPerPage,
        pageNum,
      },
    }).then((response) => {
      setNetworkList(response.result);
      setMeta(response.meta);
    });
  }, [pageNum]);

  return (
    <div className=' '>
      <NetworkListTable networkList={networkList} />
      <div className='flex flex-row justify-end'>
        <PaginatedItems itemsPerPage={itemPerPage} totalRecords={meta.total} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
