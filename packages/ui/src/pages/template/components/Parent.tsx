import { useEffect, useState } from 'react';
import TemplateListTable from './table';
import PaginatedItems from '../../../components/pagination';
import { getTemplateList, deleteTemplate, duplicateTemplate } from '../../../utils/api';
import { notify } from '../../../utils/notifications';

export function Parent() {
  const [templateList, setTemplateList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange);
  };
  const onTemplateDelete = (templateId: string) => {
    console.log('=================');

    deleteTemplate(templateId)
      .then(() => {
        notify('success', 'Template deleted successfully');
      }).catch(() => {
        notify('error', 'Failed to delete template');
      });
  };

  const onTemplateDuplicate = (templateId: string) => {
    console.log('=================');

    duplicateTemplate(templateId)
      .then(() => {
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
  }, [pageNum]);

  return (
    <div className=' '>
      <div className='h-[584px] flex flex-col justify-between'>
        <TemplateListTable
          templateList={templateList}
          onTemplateDelete={onTemplateDelete}
          onTemplateDuplicate={onTemplateDuplicate}
        />
        <div className='flex flex-row justify-end'>
          <PaginatedItems
            itemsPerPage={itemPerPage}
            totalRecords={meta.total}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
export default Parent;
