/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { getFormattedLocalTime } from 'src/utils/time';
import { NetworkType, TemplateDelete } from '../types';
import { ReactComponent as IconThreeDots } from 'src/assets/ThreeDots.svg';
import { ReactComponent as IconEdit } from 'src/assets/Edit.svg';
import { ReactComponent as IconDuplicate } from 'src/assets/Template.svg';
import { ReactComponent as IconDelete } from 'src/assets/Trash.svg';
import { useToggle } from 'src/hooks';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuList,
  DropdownMenuItem,
} from "src/components/DropdownMenu";
import { Button } from "src/components/Button";
import { useState } from "react";

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
  const { isOpen, handleToggle, handleClose } = useToggle();
  const [actionIdx, setActionIdx] = useState<number | null>(null);
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
                Created On &nbsp;{" "}
                <span aria-hidden onClick={() => setSort(!sort)}>
                  {sort ? <span>&darr;</span> : <span>&uarr;</span>}
                </span>
              </th>
              <th className='px-6 py-3' scope='col'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {templateList.map((template, index) => (
              <tr
                className={
                  index + 1 < templateList.length
                    ? 'border-b-2 border-dark-700'
                    : ''
                }
              >
                <td className='px-6 py-3 w-max'>{template.id}</td>
                <td className='px-6 py-3 w-max'>{template.name}</td>
                <td className='px-6 py-3 w-max'>{template.networkProvider}</td>
                <td className='px-6 py-3 w-max text-center'>
                  {getFormattedLocalTime(template.createdAt)}
                </td>
                <td className='flex justify-center items-center  py-3 '>
                  <Button
                    className='border-dark-700 border-2 rounded-md px-2 bg-larch-dark_3 hover:bg-brand-gradient'
                    onClick={() => {
                      onCreateModal(template.id, 'evaluation');
                    }}
                  >
                    Create Network
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    className='border-dark-700 border-2 rounded-md px-2 bg-larch-dark_3 hover:bg-brand-gradient mr-2'
                    onClick={() => {
                      onCreateModal(template.id, 'testing');
                    }}
                  >
                    Network Test
                  </Button>
                  <DropdownMenu
                    onClose={handleClose}
                    onClick={() => setActionIdx(index)}
                  >
                    <DropdownMenuButton
                      as={Button}
                      className='border-dark-700 border-2 rounded-md bg-larch-dark_3 hover:bg-brand-gradient'
                      colorScheme='dark'
                      iconRight={<IconThreeDots className='text-md w-6 h-6 font-bold' />}
                      onClick={handleToggle}
                    >
                    </DropdownMenuButton>
                    {actionIdx === index && (
                      <DropdownMenuList
                        direction='right'
                        isOpen={isOpen}
                        className='z-[501] bg-larch-dark_2 text-white'
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            setDuplicateTemplateObj({
                              isOpen: true,
                              templateId: template.id,
                              templateName: '',
                            });
                          }}
                          iconLeft={
                            <IconDuplicate className='text-md w-5 h-5' />
                          }
                          className='text-white hover:bg-larch-pink'
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            editNetwork(template.id);
                          }}
                          iconLeft={<IconEdit className='text-md w-4 h-4' />}
                          className='text-white hover:bg-larch-pink'
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDeleteTemplateObj({
                              isOpen: true,
                              templateId: template.id,
                              templateName: template.name,
                            });
                          }}
                          iconLeft={<IconDelete className='text-md w-5 h-5' />}
                          className='text-white hover:bg-larch-pink'
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuList>
                    )}
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {templateList.length === 0 && (
        <div className='w-full text-white text-center pt-5'>
          <div>
            To get started, please{' '}
            <Link to='/template/createNetwork'>
              <span className='text-center text-blue-500 cursor-pointer'>
                create network template
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
