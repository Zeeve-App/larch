/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import NavBar from './navbar';

export default function CreateNetwork() {
  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='settings' />
      <div className='w-[750px] h-[560px]'>
        <div className='py-4 px-4 flex flex-row gap-x-8 '>
          <span className='text-white flex flex-row pt-2 font-rubik'>Add a bootnode</span>
          <div className='w-max border-border border-2 gap-x-2 rounded py-0.5 px-0.5 '>
            <button className=' text-white px-3 py-1.5 rounded bg-grad'>yes</button>
            <button className='text-white px-2 rounded hover:bg-grey'>no</button>
          </div>

          <span className='text-white flex flex-row pt-2 font-rubik'>Polkadot Introspector</span>
          <div className='w-max border-border border-2 gap-x-2 rounded py-0.5 px-0.5 '>
            <button className='bg-grad text-white px-3 py-1.5 rounded'>yes</button>
            <button className='text-white px-2 rounded'>no</button>
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik flex flex-row'>
          <span className='pt-3'>Provider</span>
          <div className='flex flex-row items-start py-1.5 px-4'>
            <select className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'>
              <option className='text-white '>Podman</option>
              <option className='text-white '>Kubernates</option>
              <option className='text-white '>Native</option>
            </select>
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik flex flex-row gap-3'>
          {/* // eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className=''>Enable Tracing</label>
          <input type='checkbox' className='bg-black ' />
          <label className=''>Jaeger Agent</label>
          <input type='checkbox' className='bg-black ' />
        </div>
        <div className='text-white pl-4 py-4 font-rubik gap-3'>
          <span>Tracing Config</span>
          <div className='w-max h-max border-border flex flex-col gap-y-3 rounded border-2 py-4 px-4'>
            <div className='flex gap-x-5 flex-row'>
              <div>
                <h5 className='font-rubik'>Collator URL</h5>
                <input className='bg-create-button border-border border-2 rounded w-[250px]' />
              </div>

              <div>
                <h3 className='font-rubik'>Service Name</h3>
                <input className='bg-create-button border-border border-2 rounded w-[250px]' />
              </div>

            </div>
            <div className='flex gap-x-5 flex-row'>
              <div>
                <h3 className='font-rubik'>Service Port</h3>
                <input className='bg-create-button border-border border-2 rounded w-[250px]' />
              </div>
              <div>
                <h3 className='font-rubik'>Service Namespace</h3>
                <input className='bg-create-button border-border border-2 rounded w-[250px]' />
              </div>
            </div>
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-4'>
          <div className='flex flex-row gap-x-4'>
            <div className='flex gap-x-4'>
              <span>Global Timeout</span>
              <input className='bg-create-button border-border border-2 rounded' />
            </div>
            <div className='flex gap-x-4'>
              <span>Node Spawn Timeout</span>
              <input className='bg-create-button border-border border-2 rounded' />
            </div>

          </div>
          <div className='flex flex-row gap-x-2 font-rubik'>
            <span>Node Spawn Timeout</span>
            <div className='w-max py-1.5 px-4 border-border border-2 rounded'>---</div>
            <div className='w-max py-1.5 px-4 border-border border-2 rounded'>---</div>
            <div className='w-max py-1.5 px-4 border-border border-2 rounded'>---</div>
            <div className='w-max py-1.5 px-4 border-border border-2 rounded'>---</div>

          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/network'>
          {' '}
          <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Cancel</button>
        </Link>
        <Link to='/template/createNetwork/relaychain'>
          {' '}
          <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Next</button>
        </Link>

      </div>
    </div>
  );
}
