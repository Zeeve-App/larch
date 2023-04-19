/* eslint-disable max-len */
import { getFormattedLocalTime } from '../../../utils/time';

type ActivityInfo = {
  id: string;
  intention: string;
  relatedId: string;
  statusCode: string;
  createdAt: string;
  operation: string;
};

type ActivityListTableProps = {
  activityList: ActivityInfo[];
  setSort: (value: boolean) => void;
  sort: boolean;
};

export default function ActivityListTable({
  activityList,
  setSort,
  sort,
}: ActivityListTableProps) {
  return (
    <table className='text-white border-2 border-border font-rubik w-full rounded'>
      <thead className='bg-create-button'>
        <tr className=' border-b-2 border-border'>
          <th className='px-6 py-3 w-56.25  text-left' scope='col'>
            ID
          </th>
          <th className='px-6 py-3  text-left' scope='col'>
            Operation
          </th>
          <th className='px-6 py-3  text-left' scope='col'>
            Network name
          </th>
          <th className='px-6 py-3  text-left' scope='col'>
            Status code
          </th>
          <th className='px-6 py-3 ' scope='col'>
            Date &nbsp;
            <span aria-hidden onClick={() => setSort(!sort)}>
              {sort ? <span>&darr;</span> : <span>&uarr;</span>}
            </span>
          </th>
          <th className='px-6 py-3  text-left' scope='col'>
            Operation
          </th>
        </tr>
      </thead>
      <tbody>
        {activityList.map((activity) => (
          <tr className=' border-b-2 border-border rounded '>
            <td className='px-6 py-3 w-56.25'>{activity.id}</td>
            <td className='px-6 py-3 w-56.25 '>{activity.intention}</td>
            <td className='px-6 py-3 w-56.25 '>{activity.relatedId}</td>
            <td className='px-6 py-3 w-56.25 '>{activity.statusCode}</td>
            <td className='px-6 py-3 w-56.25 text-center'>
              {getFormattedLocalTime(activity.createdAt)}
            </td>
            <td>
              <div className='flex flex-row'>
                <button
                  type='button'
                  className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-red-500 hover:text-black'
                  onClick={() => { }}
                >
                  View Command
                </button>
                <button
                  type='button'
                  className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-green hover:text-black'
                  onClick={() => { }}
                >
                  View Standard Output
                </button>
                <button
                  type='button'
                  className='border-border border-2 rounded px-2 bg-create-button mr-2 hover:bg-green hover:text-black'
                  onClick={() => { }}
                >
                  View Standard Error
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
