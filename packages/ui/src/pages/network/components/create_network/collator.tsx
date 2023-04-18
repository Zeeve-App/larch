/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import IconUp from './assets/upload.svg';

export function CreateCollator() {
  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='colltor_config' />
      <div className='w-[750px] h-[560px]'>

        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3'>Name</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]' />
            </div>
          </div>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-3'>
            <span>Image</span>
            <div className='w-max h-max border-border flex flex-col items-center py-12 px-44 rounded border-2 '>
              <div>
                <img className='w-6 h-6  m-2.5  ' src={IconUp} alt='' />
              </div>
              <div>
                <h3 className='font-rubik'>Select or upload</h3>
              </div>
            </div>
            <div className='flex flex-row gap-x-4'>
              <span className='pt-3'>Command</span>
              <div className='flex flex-row items-start py-1.5 px-4'>
                <input className='bg-black border-border border-2 rounded py-1 px-2 w-[250px]' />
              </div>
            </div>
          </div>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-1 pt-2'>
            <div className='flex flex-row gap-x-4'>
              <span className='pt-3 font-rubik'>Args</span>
              <div className='flex flex-col'>
                <div className='flex flex-row items-start py-1.5 px-4 gap-x-2'>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 '>
                    <option className='text-white '>-------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 '>
                    <option className='text-white '>------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
                    <option className='text-white '>-------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                </div>
                <div className='flex flex-row items-start py-1.5 px-4 gap-x-2'>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 '>
                    <option className='text-white '>-------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 '>
                    <option className='text-white '>-------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                  <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
                    <option className='text-white '>-------</option>
                    <option className='text-white '>option 2</option>
                    <option className='text-white '>option 3</option>
                    <option className='text-white '> option 4 </option>
                    <option className='text-white '> option 5 </option>
                  </select>
                </div>
              </div>
              <div className='flex flex-row items-start py-1.5 px-4' />
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/parachain'>
          <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Back</button>
        </Link>
        <Link to='/template/createNetwork/hrmp'>
          <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Next</button>
        </Link>
      </div>
    </div>
  );
}
export default CreateCollator;
