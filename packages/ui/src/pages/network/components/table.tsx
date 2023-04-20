/* eslint-disable max-len */
import { getFormattedLocalTime } from '../../../utils/time';

type NetworkInfo = {
  name: string;
  networkProvider: string;
  networkDirectory: string;
  createdAt: string;
  networkState: string;
};

type NetworkListTableProps = {
  networkList: NetworkInfo[];
  onCreateModal: (name: string) => void;
  onCreateTestModal: (name: string) => void
  setSort: (value: boolean) => void;
  sort: boolean;
};

export default function NetworkListTable({
  networkList,
  onCreateModal,
  onCreateTestModal,
  setSort,
  sort,
}: NetworkListTableProps) {
  return (
    <table className='text-white border-2 border-border font-rubik w-full rounded'>
      <thead className='bg-create-button'>
        <tr className=' border-b-2 border-border rounded '>
          <th className='px-6 py-3 w-56.25 text-left' scope='col'>
            Network Name
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
      <tbody>
        {
          networkList.map((network) => (
            <tr className=' border-b-2 border-border rounded '>
              <td className='px-6 py-3 w-56.25 '>{network.name}</td>
              <td className='px-6 py-3 w-56.25 '>{network.networkProvider}</td>
              <td className='px-6 py-3 w-56.25 '>{network.networkDirectory}</td>
              <td className='px-6 py-3 w-56 text-center'>{getFormattedLocalTime(network.createdAt)}</td>
              <td className='px-6 py-3 w-56.25 '>{network.networkState}</td>
              <td>
                <div className='flex flex-row'>
                  <button
                    type='button'
                    className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-red-500 hover:text-black'
                    onClick={() => { onCreateModal(network.name); }}
                  >
                    Delete
                  </button>
                  {network.networkState !== 'failed'
                    && (
                      <button
                        type='button'
                        className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-green hover:text-black'
                        onClick={() => { onCreateTestModal(network.name); }}
                      >
                        Test
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
