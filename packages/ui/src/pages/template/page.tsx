import { Link } from 'react-router-dom';
import IconImage from './assets/Search.svg';
import Listing from './components/listing';

export default function Template() {
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-full flex'>
        <div className='h-full flex w-full flex-wrap content-center item-center justify-end gap-4'>
          <div className='item-center'>
            {/* eslint-disable-next-line max-len */}
            <button type='button' className='bg-create-button text-white font-rubik flex border-2 border-border rounded h-10 px-4 items-center'>
              <Link to='/template/createNetwork/setting'>
                <span>Create Network</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Listing />
    </div>
  );
}
