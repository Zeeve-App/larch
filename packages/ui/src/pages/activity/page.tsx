// import iconSearch from '../../components/assets/Search.svg';
import Listing from './components/listing';
import Filter from './components/filter';

export function Activity() {
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-[1138px] flex'>
        {/* <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
          <form className='flex w-full justify-between px-4  '>
            <input
              className='form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base'
              placeholder='Search...'
            />
            <img className='w-6 h-6  m-2.5' src={iconSearch} alt='' />
          </form>
        </div> */}
        <div className='h-full flex w-full flex-wrap content-center  item-center justify-end gap-4'>
          <Filter />
        </div>
      </div>
      <Listing />
    </div>
  );
}
export default Activity;
