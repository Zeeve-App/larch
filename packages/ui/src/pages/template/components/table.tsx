/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { getFormattedLocalTime } from '../../../utils/time';
import { NetworkType, TemplateDelete } from '../types';

/* eslint-disable react/button-has-type */
type TemplateInfo = {
  id: string;
  name: string;
  networkProvider: string;
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
  setDuplicateTemplateObj: ({
    isOpen,
    templateId,
    templateName,
  }: TemplateDelete) => void;
  onCreateModal: (templateId: string, type: NetworkType) => void;
  editNetwork: (templateId: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};
export default function TemplateListTable({
  templateList,
  setDeleteTemplateObj,
  setDuplicateTemplateObj,
  onCreateModal,
  setSort,
  editNetwork,
  sort,
}: TemplateListTableProps) {
  return (
    <>
      <div className='rounded-xl border-2 border-dark-700 p-1'>
        <table className='text-white w-full'>
          <thead className='rounded-xl bg-larch-dark_2'>
            <tr className='border-b-2 border-dark-700'>
              <th className='px-6 py-3 w-56.25 text-left' scope='col'>
                ID
              </th>
              <th className='px-6 py-3 w-56.25 text-left' scope='col'>
                Template Name
              </th>
              <th className='px-6 py-3 text-left' scope='col'>
                Provider
              </th>
              <th className='px-6 py-3 text-center' scope='col'>
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
            {templateList.map((template, index) => (
              <tr className={(index + 1) < templateList.length ? 'border-b-2 border-dark-700' : ''}>
                <td className='px-6 py-3 w-max'>{template.id}</td>
                <td className='px-6 py-3 w-max '>{template.name}</td>
                <td className='px-6 py-3 w-max '>{template.networkProvider}</td>
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
                      setDuplicateTemplateObj({
                        isOpen: true,
                        templateId: template.id,
                        templateName: '',
                      });
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
      </div>
      {templateList.length === 0 &&
        <div className='w-full text-white text-center pt-5'>
          <div>To get started, please {' '}
            <Link to='/template/createNetwork'>
              <span className='text-center text-blue-500 cursor-pointer'>create network template</span>
            </Link>
          </div>
        </div>}
    </>
  );
}
