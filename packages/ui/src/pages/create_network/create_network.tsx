import { Link } from 'react-router-dom';
import NavBar from './components/navbar';
import { useSettingsStore } from '../../store/createNetworkStore';

export default function CreateNetwork() {
  const settingsData = useSettingsStore((state) => state.settingsData);
  const setSettings = useSettingsStore((state) => state.setSettings);

  const providers = [
    { label: 'Podman', value: 'podman' },
    { label: 'Kubernates', value: 'kubernates' },
    { label: 'Native', value: 'native' },
  ];

  const handler = (name: string, value: boolean) => {
    if (name === 'bootNode') {
      setSettings({ ...settingsData, isBootNode: value });
    } else {
      setSettings({ ...settingsData, polkadotIntrospector: value });
    }
  };

  console.log('settingsData', settingsData);

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='settings' />
      <div className='mx-5'>
        <div className='py-4 px-4 flex flex-row gap-x-8'>
          <span className='text-white flex flex-row pt-2 font-rubik'>
            Add a bootnode
          </span>
          <div className='w-max border-border border-2 gap-x-2 rounded py-0.5 px-0.5'>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${
                settingsData.isBootNode ? 'bg-grad' : ''
              }`}
              onClick={() => handler('bootNode', true)}
            >
              Yes
            </button>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${
                settingsData.isBootNode ? '' : 'bg-grad'
              }`}
              onClick={() => handler('bootNode', false)}
            >
              No
            </button>
          </div>

          <span className='text-white flex flex-row pt-2 font-rubik'>
            Polkadot Introspector
          </span>
          <div className='w-max border-border border-2 gap-x-2 rounded py-0.5 px-0.5'>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${
                settingsData.polkadotIntrospector ? 'bg-grad' : ''
              }`}
              onClick={() => handler('polkadotIntrospector', true)}
            >
              Yes
            </button>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${
                settingsData.polkadotIntrospector ? '' : 'bg-grad'
              }`}
              onClick={() => handler('polkadotIntrospector', false)}
            >
              No
            </button>
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik flex flex-row'>
          <span className='pt-3'>Provider</span>
          <div className='flex flex-row items-start py-1.5 px-4'>
            <select
              className='bg-black text-white border-2 rounded border-border py-1.5 px-2 flex flex-row'
              onChange={(e) => setSettings({ ...settingsData, provider: e.target.value })}
              value={settingsData.provider}
            >
              <option className='text-white' value=''>
                --Select--
              </option>
              {providers.map((item, index) => (
                <option
                  key={`provider-${index.toString()}`}
                  className='text-white'
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/network'>
          {' '}
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Cancel
          </button>
        </Link>
        <Link to='/template/createNetwork/relaychain'>
          {' '}
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
