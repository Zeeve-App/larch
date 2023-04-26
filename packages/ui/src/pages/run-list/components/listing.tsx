import { useEffect, useState } from 'react';
import RunListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getRunList } from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import Filter from '../../../components/filter';
import {
  useRunFilterStore,
} from '../../../store/runStore';
import { useFilterSubmit } from '../../../store/commonStore';
import CommandModal from './commandModal';
import StandardOutputModal from './standardOutputModal';
import RefreshButton from '../../../components/refresh';
import Loader from '../../../components/loader';

export default function Listing() {
  const [runList, setRunList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState<boolean>(true);
  const [pageToggle, setPageToggle] = useState(true);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);

  const defaultModalView = {
    command: false,
    standardOutput: false,
    standardError: false,
  };
  const [isOpen, setIsOpen] = useState(defaultModalView);
  const [runId, setRunId] = useState('');

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

  const setModalViewStatus = (modalSlug: string, status: boolean) => {
    setIsOpen({ ...defaultModalView, [modalSlug]: status });
  };

  const onViewCommand = (id: string) => {
    setRunId(id);
    setModalViewStatus('command', true);
  };

  const onStandardOutput = (id: string) => {
    setRunId(id);
    setModalViewStatus('standardOutput', true);
  };

  const filterData = () => {
    setIsShowLoader(true);
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
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to fetch activity list');
      });
  };
  useEffect(() => {
    filterData();
  }, [pageNum, isFilterSubmit, sort, pageToggle]);

  return (
    <>
      {isShowLoader && <Loader />}
      <div className='flex w-full justify-end gap-4'>
        <Filter
          filterData={runFilterData}
          isFilterSubmit={isFilterSubmit}
          setFilterData={setRunFilterData}
          setIsFilterSubmit={setIsFilterSubmit}
        />
        <RefreshButton onClick={() => setPageToggle(!pageToggle)} />
      </div>
      <div className='flex flex-col justify-between'>
        <RunListTable
          onViewCommand={onViewCommand}
          onViewStandardOutput={onStandardOutput}
          runList={runList}
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
      {isOpen.command && (
        <CommandModal
          isOpen={isOpen.command}
          setIsOpen={(status) => { setModalViewStatus('command', status); }}
          runId={runId}
        />
      )}
      {isOpen.standardOutput && (
        <StandardOutputModal
          isOpen={isOpen.standardOutput}
          setIsOpen={(status) => { setModalViewStatus('standardOutput', status); }}
          runId={runId}
        />
      )}
    </>
  );
}
