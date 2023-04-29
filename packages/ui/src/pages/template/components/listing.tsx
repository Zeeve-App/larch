import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateListTable from './table';
import PaginatedItems from '../../../components/pagination';
import {
  getTemplateList,
  deleteTemplate,
  duplicateTemplate,
  getTemplateData,
  createNetwork,
  testNetwork,
} from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import PopUpBox from './modal';
import DeletePopUpBox from './deleteTemplateModal';
import DuplicateTempPopUpBox from './duplicateTemplateModal';
import Filter from '../../../components/filter';
import { NetworkType, TemplateDelete } from '../types';
import RefreshButton from '../../../components/refresh';
import Loader from '../../../components/loader';
import { TemplateFilterInput } from '../../../types/filter.types';

export default function Listing() {
  const [templateList, setTemplateList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [pageToggle, setPageToggle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [createNetTemplateId, setCreateNetTemplateId] = useState('');
  const [networkType, setNetworkType] = useState<NetworkType>('evaluation');
  const [sort, setSort] = useState<boolean>(true);
  const [deleteTemplateObj, setDeleteTemplateObj] = useState({
    isOpen: false,
    templateId: '',
    templateName: '',
  } as TemplateDelete);
  const [duplicateTemplateObj, setDuplicateTemplateObj] = useState({
    isOpen: false,
    templateId: '',
    templateName: '',
  } as TemplateDelete);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [templateFilterData, setTemplateFilterData] = useState([
    {
      label: 'ID',
      key: 'id',
      isSearchOpen: false,
    },
    {
      label: 'Template Name',
      key: 'name',
      isSearchOpen: false,
    },
    {
      label: 'Provider',
      key: 'provider',
      isSearchOpen: false,
    },
    {
      label: 'Network Directory',
      key: 'status',
      isSearchOpen: false,
    },
    {
      label: 'Created On',
      key: 'createdAt',
      isSearchOpen: false,
    },
  ] as TemplateFilterInput[]);
  const [isFilterSubmit, setIsFilterSubmit] = useState<boolean>(false);

  const navigate = useNavigate();
  const updateListing = () => {
    setPageToggle(!pageToggle);
  };
  const onCreateModal = (templateId: string, type: NetworkType) => {
    setNetworkType(type);
    setCreateNetTemplateId(templateId);
    setIsOpen(true);
  };

  const editNetwork = (templateId: string) => {
    console.log('templateId', templateId);
    navigate('/template/createNetwork', { state: { templateId } });
  };

  const onNetworkCreate = (name: string, type: NetworkType) => {
    setIsShowLoader(true);
    getTemplateData(createNetTemplateId)
      .then((response) => ({
        ...response.result,
        name,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }))
      .then(type === 'evaluation' ? createNetwork : testNetwork)
      .then(() => {
        setIsOpen(false);
        setIsShowLoader(false);
        notify('success', 'Network created successfully');
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to create network');
      });
  };

  const filterData = () => {
    setIsShowLoader(true);
    const filter: { [name: string]: string } = {};
    templateFilterData.forEach((item) => {
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
    getTemplateList(payload)
      .then((response) => {
        setTemplateList(response.result);
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
  }, [pageNum, isFilterSubmit, sort]);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };
  const onTemplateDelete = (templateId: string) => {
    setIsShowLoader(true);
    deleteTemplate(templateId)
      .then(() => {
        updateListing();
        notify('success', 'Template deleted successfully');
        setDeleteTemplateObj({
          isOpen: false,
          templateId: '',
          templateName: '',
        });
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to delete template');
      });
  };

  const deleteTheTemplate = (templateId: string) => {
    onTemplateDelete(templateId);
  };

  const onTemplateDuplicate = () => {
    setIsShowLoader(true);
    duplicateTemplate(duplicateTemplateObj.templateId, {
      name: duplicateTemplateObj.templateName,
    })
      .then(() => {
        updateListing();
        notify('success', 'Template duplicated successfully');
        setDuplicateTemplateObj({
          isOpen: false,
          templateId: '',
          templateName: '',
        });
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to duplicate template');
      });
  };

  useEffect(() => {
    setIsShowLoader(true);
    getTemplateList({
      meta: {
        numOfRec: itemPerPage,
        pageNum,
      },
    })
      .then((response) => {
        setTemplateList(response.result);
        setMeta(response.meta);
        setIsShowLoader(false);
      })
      .catch(() => {
        setIsShowLoader(false);
        notify('error', 'Failed to fetch template list');
      });
  }, [pageNum, pageToggle]);

  return (
    <>
      {isShowLoader && <Loader />}
      <div className='flex w-full justify-end gap-4'>
        <Filter
          filterData={templateFilterData}
          isFilterSubmit={isFilterSubmit}
          setFilterData={setTemplateFilterData}
          setIsFilterSubmit={setIsFilterSubmit}
        />
        <RefreshButton onClick={() => setPageToggle(!pageToggle)} />
      </div>
      <div className='flex flex-col justify-between'>
        <TemplateListTable
          templateList={templateList}
          setDuplicateTemplateObj={setDuplicateTemplateObj}
          onCreateModal={onCreateModal}
          editNetwork={editNetwork}
          setSort={setSort}
          sort={sort}
          setDeleteTemplateObj={setDeleteTemplateObj}
        />
        <PopUpBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onNetworkCreate}
          templateId={createNetTemplateId}
          type={networkType}
        />
        <DeletePopUpBox
          setIsOpen={setDeleteTemplateObj}
          onConfirm={deleteTheTemplate}
          deleteTemplateObj={deleteTemplateObj}
        />
        <DuplicateTempPopUpBox
          onConfirm={onTemplateDuplicate}
          duplicateTemplateObj={duplicateTemplateObj}
          setDuplicateTemplateObj={setDuplicateTemplateObj}
        />
        {templateList.length > 0 && <div className='flex flex-row justify-end'>
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
