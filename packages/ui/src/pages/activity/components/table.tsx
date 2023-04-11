import { getFormattedLocalTime } from '../../../utils/time';

type ActivityInfo = {
  id: string,
  operationDetail: string,
  createdAt: string,
  operation: string,
};

type ActivityListTableProps = {
  activityList: ActivityInfo[],
};

export default function ActivityListTable({ activityList }: ActivityListTableProps) {
  return (
    <table className='text-white border-2 border-border font-rubik w-full rounded'>
      <thead className='bg-create-button'>
        <tr className=' border-b-2 border-border'>
          <th className='px-6 py-3 w-56.25  text-left' scope='col'>ID</th>
          <th className='px-6 py-3  text-left' scope='col'>Operation Details</th>
          <th className='px-6 py-3 ' scope='col'>Date</th>
          <th className='px-6 py-3  text-left' scope='col'>Operation</th>
        </tr>
      </thead>
      <tbody>
        {
          activityList.map((activity) => (
            <tr className=' border-b-2 border-border rounded '>
              <td className='px-6 py-3 w-56.25'>{activity.id}</td>
              <td className='px-6 py-3 w-56.25 '>{activity.operationDetail}</td>
              <td className='px-6 py-3 w-56 text-center'>{getFormattedLocalTime(activity.createdAt)}</td>
              <td className='px-6 py-3 w-56.25 '>{activity.operation}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
