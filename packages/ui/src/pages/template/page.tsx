import { Link } from 'react-router-dom';
import IconImage from './assets/Search.svg';
import Listing from './components/listing';

export default function Template() {
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-full flex'>
        <div className='h-12 bg-black border-2 border-border rounded flex'>
          <form className='flex w-full justify-between px-4'>
            <input
              className='form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base'
              placeholder='Search...'
            />
            <img className='w-6 h-6 m-2.5' src={IconImage} alt='' />
          </form>
        </div>
        <div className='h-full flex w-full flex-wrap content-center item-center justify-end gap-4'>
          <div className='item-center'>
            {/* eslint-disable-next-line max-len */}
            <button type='button' className='bg-create-button text-white font-rubik flex border-2 border-border rounded h-10 px-4 items-center'>
              <Link to='/template/createNetwork/setting'>
                <span>Create Network</span>
              </Link>
            </button>
          </div>
          {/* eslint-disable-next-line max-len */}
          <div className='bg-create-button gap-2 text-white font-rubik flex flex-row border-2 border-border rounded h-10  items-center'>
            <div className='border-r-2 flex flex-row items-start py-1.5 px-4 border-border h-full'>
              <select className='bg-create-button'>
                <option className='text-black bg-white'>Filter By</option>
                <option className='text-black bg-white'>option 2</option>
                <option className='text-black bg-white'>option 3</option>
                <option className='text-black bg-white'> option 4 </option>
                <option className='text-black bg-white'> option 5 </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Listing />
    </div>
  );
}
