import { useState } from 'react';
import Listing from './components/listing';

export default function Activity() {
  const [updateList, setUpdateList] = useState(true);


  return (
    <div className='p-6 gap-5 flex-col flex'>
      <Listing updateList={updateList} setUpdateList={setUpdateList} />
    </div>
  );
}
