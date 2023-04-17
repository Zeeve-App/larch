import { useEffect, useState } from 'react';
import NetworkListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { deleteNetwork, getNetworkList } from '../../../utils/api';
import { notify } from '../../../utils/notifications';

export default function Listing() {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [pageToggle, setPageToggle] = useState(true);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };

  const onNetworkDelete = (networkName: string) => {
    deleteNetwork(networkName)
      .then(() => {
        notify('success', `Deleted the network ("${networkName}")`);
        setPageToggle(!pageToggle);
      })
      .catch(() => {
        notify('error', `Failed delete the network ("${networkName}")`);
      });
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
    }).catch(() => {
      notify('error', 'Failed to fetch network list');
    });
  }, [pageNum, pageToggle]);

  return (
    <div className='flex flex-col justify-between'>
      <NetworkListTable networkList={networkList} onNetworkDelete={onNetworkDelete} />
      <div className='right-2 bottom-0 flex flex-row justify-end'>
        <PaginatedItems itemsPerPage={itemPerPage} totalRecords={meta.total} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
