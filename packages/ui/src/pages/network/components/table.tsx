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
  networkList: NetworkInfo[],
  onNetworkDelete: (templateId: string) => void
  onNetworkTest: (name: string) => void
};

export default function NetworkListTable({ networkList, onNetworkDelete, onNetworkTest }: NetworkListTableProps) {
  return (
    <table className='text-white border-2 border-border font-rubik w-full rounded'>
      <thead className='bg-create-button'>
        <tr className=' border-b-2 border-border rounded '>
          <th className='px-6 py-3 w-56.25 text-left' scope='col'>Network Name</th>
          <th className='px-6 py-3 text-left' scope='col'>Provider</th>
          <th className='px-6 py-3 text-left' scope='col'>Network Directory</th>
          <th className='px-6 py-3' scope='col'>Created On </th>
          <th className='px-6 py-3' scope='col'>Status </th>
          <th className='px-6 py-3' scope='col'>Action</th>
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
                    className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-red hover:text-black'
                    onClick={() => { onNetworkDelete(network.name); }}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-green hover:text-black'
                    onClick={() => { onNetworkTest(network.name); }}
                  >
                    Test
                  </button>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
