import { getFormattedLocalTime } from '../../../utils/time';
import { Link } from 'react-router-dom';

type ActivityInfo = {
  id: string;
  operationDetail: string;
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
    <>
    <div className='rounded-xl border-2 border-dark-700 p-1'>
      <table className='text-white w-full rounded-lg'>
        <thead className='rounded-xl bg-larch-dark_2'>
          <tr className='border-b-2 border-dark-700'>
            <th className='px-6 py-3 w-56.25  text-left' scope='col'>
              ID
            </th>
            <th className='px-6 py-3  text-left' scope='col'>
              Operation Details
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
          {activityList.map((activity, index) => (
            <tr className={(index + 1) < activityList.length ? 'border-b-2 border-dark-700' : ''}>
              <td className='px-6 py-3 w-56.25'>{activity.id}</td>
              <td className='px-6 py-3 w-56.25 '>{activity.operationDetail}</td>
              <td className='px-6 py-3 w-56.25 text-center'>
                {getFormattedLocalTime(activity.createdAt)}
              </td>
              <td className='px-6 py-3 w-56.25 '>{activity.operation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {activityList.length === 0 && 
      <div className='w-full text-white text-center pt-5'>
        <div>Looks like there's no activity done, do opetations like {' '}
          <Link to='/template'>
            <span className='text-center text-blue-500 cursor-pointer'>Create Network Template</span>
          </Link>
        </div>
      </div>}
    </>
  );
}
