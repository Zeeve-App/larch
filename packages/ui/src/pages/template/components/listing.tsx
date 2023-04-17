import { useEffect, useState } from 'react';
import TemplateListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getTemplateList, deleteTemplate, duplicateTemplate, getTemplateData, createNetwork } from '../../../utils/api';
import { notify } from '../../../utils/notifications';
import PopUpBox from './modal';

export default function Listing() {
  const [templateList, setTemplateList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [pageToggle, setPageToggle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [createNetTemplateId, setCreateNetTemplateId] = useState('');

  const updateListing = () => {
    setPageToggle(!pageToggle);
  };
  const onCreateModal = (templateId: string) => {
    setCreateNetTemplateId(templateId);
    setIsOpen(true);
  };

  const onNetworkCreate = (name: string) => {
    getTemplateData(createNetTemplateId)
      .then((response) => ({
        ...response.result,
        name,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }))
      .then(createNetwork)
      .then(() => {
        setIsOpen(false);
        notify('success', 'Network created successfully');
      })
      .catch(() => {
        notify('error', 'Failed to create network');
      });
  };

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };
  const onTemplateDelete = (templateId: string) => {
    deleteTemplate(templateId)
      .then(() => {
        updateListing();
        notify('success', 'Template deleted successfully');
      }).catch(() => {
        notify('error', 'Failed to delete template');
      });
  };

  const onTemplateDuplicate = (templateId: string) => {
    duplicateTemplate(templateId)
      .then(() => {
        updateListing();
        notify('success', 'Template duplicated successfully');
      }).catch(() => {
        notify('error', 'Failed to duplicate template');
      });
  };

  useEffect(() => {
    getTemplateList({
      meta: {
        numOfRec: itemPerPage,
        pageNum,
      },
    }).then((response) => {
      setTemplateList(response.result);
      setMeta(response.meta);
    }).catch(() => {
      notify('error', 'Failed to fetch template list');
    });
  }, [pageNum, pageToggle]);

  return (
    <div className='flex flex-col justify-between'>
      <TemplateListTable
        templateList={templateList}
        onTemplateDelete={onTemplateDelete}
        onTemplateDuplicate={onTemplateDuplicate}
        onCreateModal={onCreateModal}

      />
      <PopUpBox isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onNetworkCreate} templateId={createNetTemplateId} />
      <div className='flex flex-row justify-end'>
        <PaginatedItems
          itemsPerPage={itemPerPage}
          totalRecords={meta.total}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
