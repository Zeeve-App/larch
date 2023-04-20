import { useState } from 'react';
import { getCurrentEndpoint, getHostDomainWithProtocol, setEndpointInStore } from '../../utils/setting';
import { notify } from '../../utils/notifications';

export default function Setting() {
  const [endpoint, setEndpoint] = useState(getCurrentEndpoint());

  const onSave = () => {
    setEndpointInStore(endpoint);
    notify('success', 'Successfully saved 👍');
  };

  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className=' '>
        <form className='flex flex-row gap-x-4'>
          <label htmlFor='endpoint' className='pt-3 text-white'>Endpoint</label>
          <div className='flex flex-row items-start py-1.5 px-4'>
            <input
              id='endpoint'
              className='bg-black border-border border-2 rounded py-1 px-2 w-[250px] text-white'
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
            <button
              type='button'
              className='bg-yellow-700 hover:bg-yellow-900 text-white font-bold ml-4 py-1 px-4 rounded-full'
              onClick={() => { setEndpoint(getHostDomainWithProtocol()); }}
            >
              Set default
            </button>
          </div>
        </form>
        <div>
          <br />
          <button
            type='button'
            className='bg-green hover:bg-dark-green text-white font-bold py-1 px-4 rounded-full'
            onClick={onSave}
          >
            Save
          </button>
          &nbsp;
          <button
            type='button'
            className='bg-red hover:bg-violet-700 text-white font-bold py-1 px-4 rounded-full'
            // eslint-disable-next-line no-restricted-globals
            onClick={() => { location.reload(); }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
