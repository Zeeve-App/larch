/* eslint-disable max-len */
import IconImage from './assets/Search.svg';
import IconGrid from './assets/Grid.svg';
import IconEp from './assets/Menu.svg';
import Listing from './components/listing';

export default function Network() {
  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-full flex'>
        <div className='h-12 bg-black border-2 border-border rounded flex '>
          <form className='flex w-full justify-between px-4  '>
            <input className='form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base' placeholder='Search...' />
            <img className='w-6 h-6  m-2.5  ' src={IconImage} alt='' />
          </form>
        </div>
        <div className='h-full flex w-full flex-wrap content-center  item-center justify-end gap-4'>
          <div className='p-2.5 border-2 border-border rounded h-10 w-10 bg-create-button '>
            <img className=' ' src={IconGrid} alt='' />
          </div>
          <div className='p-2.5 border-2 border-border rounded h-10 w-10 bg-create-button '>
            <img className=' ' src={IconEp} alt='' />
          </div>
        </div>
      </div>
      <Listing />
    </div>
  );
}
