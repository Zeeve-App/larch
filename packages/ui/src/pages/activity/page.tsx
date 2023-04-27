import { useState } from 'react';
import Listing from './components/listing';
import { purgeActivityRecord } from '../../utils/api';
import { notify } from '../../utils/notifications';

export default function Activity() {
  const [updateList, setUpdateList] = useState(true);

  const purgeRecord = () => {
    purgeActivityRecord()
      .then(() => {
        setUpdateList(!updateList);
        notify('success', 'Purge Record');
      })
      .catch(() => {
        notify('error', 'Failed to Purge Record');
      });
  };
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-full flex'>
        <div className='h-full flex w-full flex-wrap content-center item-center justify-end gap-4'>
          <div className='item-center'>
            {/* eslint-disable-next-line max-len */}
            <button
              type='button'
              className='bg-create-button text-white font-rubik flex border-2 border-border rounded h-10 px-4 items-center'
              onClick={purgeRecord}
            >
              <span>Purge Activity Record</span>
            </button>
          </div>
        </div>
      </div>
      <Listing updateList={updateList} />
    </div>
  );
}
