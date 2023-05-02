/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { getFormattedLocalTime } from '../../../utils/time';
import { ReactComponent as IconDelete } from 'src/assets/Trash.svg';
import { Button, IconButton } from 'src/components/Button';

type NetworkInfo = {
  name: string;
  type: string;
  networkProvider: string;
  networkDirectory: string;
  createdAt: string;
  networkState: string;
};

type NetworkListTableProps = {
  networkList: NetworkInfo[];
  onCreateModal: (name: string) => void;
  setSort: (value: boolean) => void;
  sort: boolean;
};

export default function NetworkListTable({
  networkList,
  onCreateModal,
  setSort,
  sort,
}: NetworkListTableProps) {
  return (
    <>
      <div className='rounded-xl border-2 border-dark-700 p-1'>
        <table className='text-white w-full'>
          <thead className='rounded-xl bg-larch-dark_2'>
            <tr className='border-b-2 border-dark-700'>
              <th className='px-6 py-3 w-56.25 text-left' scope='col'>
                Network Name
              </th>
              <th className='px-6 py-3 w-56.25 text-center' scope='col'>
                Type
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
                Status
                {' '}
              </th>
              <th className='px-6 py-3' scope='col'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='rounded-lg'>
            {networkList.map((network, index) => (
              <tr className={(index + 1) < networkList.length ? 'border-b-2 border-dark-700' : ''}>
                <td className='px-6 py-3 w-56.25'>{network.name}</td>
                <td className='px-6 py-3 w-56.25 text-center'>{network.type}</td>
                <td className='px-6 py-3 w-56.25'>{network.networkProvider}</td>
                <td className='px-6 py-3 w-56.25'>{network.networkDirectory}</td>
                <td className='px-6 py-3 w-56 text-center'>{getFormattedLocalTime(network.createdAt)}</td>
                <td className='px-6 py-3 w-56.25 text-center'>{network.networkState}</td>
                <td className='flex flex-row text-center justify-center items-center content-center px-6 py-3'>
                  <IconButton variant={'outline'} icon={<IconDelete className="text-md" />} className='border-larch-error text-larch-error' onClick={() => onCreateModal(network.name)} title="Delete" />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {networkList.length === 0 &&
        <div className='w-full text-white text-center pt-5'>
          <div>To get started, please create network from {' '}
            <Link to='/template'>
              <span className='text-center text-blue-500 cursor-pointer'>Network Templates</span>
            </Link>
          </div>
        </div>}
    </>
  );
}
