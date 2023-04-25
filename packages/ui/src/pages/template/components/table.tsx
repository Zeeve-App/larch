/* eslint-disable max-len */
import { getFormattedLocalTime } from '../../../utils/time';
import { NetworkType, TemplateDelete } from '../types';

/* eslint-disable react/button-has-type */
type TemplateInfo = {
  id: string;
  name: string;
  networkProvider: string;
  networkDirectory: string;
  createdAt: string;
  operation: string;
};
type TemplateListTableProps = {
  templateList: TemplateInfo[];
  setDeleteTemplateObj: ({
    isOpen,
    templateId,
    templateName,
  }: TemplateDelete) => void;
  onTemplateDuplicate: (templateId: string) => void;
  onCreateModal: (templateId: string, type: NetworkType) => void;
  editNetwork: (templateId: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};
export default function TemplateListTable({
  templateList,
  setDeleteTemplateObj,
  onTemplateDuplicate,
  onCreateModal,
  setSort,
  editNetwork,
  sort,
}: TemplateListTableProps) {
  return (
    <table className='text-white border-2 border-border font-rubik w-full rounded'>
      <thead className='bg-create-button'>
        <tr className=' border-b-2 border-border'>
          <th className='px-6 py-3 w-56.25 text-left' scope='col'>
            ID
          </th>
          <th className='px-6 py-3 w-56.25 text-left' scope='col'>
            Template Name
          </th>
          <th className='px-6 py-3 text-left' scope='col'>
            Provider
          </th>
          <th className='px-6 py-3 text-left' scope='col'>
            Network Directory
          </th>
          <th className='px-6 py-3' scope='col'>
            Created On &nbsp;
            {' '}
            <span aria-hidden onClick={() => setSort(!sort)}>
              {sort ? <span>&darr;</span> : <span>&uarr;</span>}
            </span>
          </th>
          <th className='px-6 py-3' scope='col'>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {templateList.map((template) => (
          <tr className='border-b-2 border-border rounded'>
            <td className='px-6 py-3 w-max'>{template.id}</td>
            <td className='px-6 py-3 w-max '>{template.name}</td>
            <td className='px-6 py-3 w-max '>{template.networkProvider}</td>
            <td className='px-6 py-3 w-max '>{template.networkDirectory}</td>
            <td className='px-6 py-3 w-max text-center'>
              {getFormattedLocalTime(template.createdAt)}
            </td>
            <td className='text-center'>
              <button
                type='button'
                className='border-border border-2 rounded px-2 bg-create-button mr-2'
                onClick={() => {
                  editNetwork(template.id);
                }}
              >
                Edit
              </button>
              <button
                type='button'
                className='border-border border-2 rounded px-2 bg-create-button mr-2'
                onClick={() => {
                  onCreateModal(template.id, 'evaluation');
                }}
              >
                Create Network
              </button>
              <button
                type='button'
                className='border-border border-2 rounded px-2 bg-create-button mr-2'
                onClick={() => {
                  onCreateModal(template.id, 'testing');
                }}
              >
                Network Test
              </button>
              <button
                className='border-border border-2 rounded px-2 bg-create-button text-white mr-2 hover:bg-yellow-200 hover:text-black'
                onClick={() => {
                  onTemplateDuplicate(template.id);
                }}
              >
                Duplicate
              </button>
              <button
                className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-red-500 hover:text-black'
                onClick={() => {
                  setDeleteTemplateObj({
                    isOpen: true,
                    templateId: template.id,
                    templateName: template.name,
                  });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
