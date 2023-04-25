import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './components/navbar';
import {
  useTestConfigStore,
  useSettingsStore,
  useRelayChainStore,
  useNodeListStore,
  useParaChainListStore,
  useHRMPStore,
  useTemplateIdStore,
} from '../../store/createNetworkStore';
import { notify } from '../../utils/notifications';
import { getTemplateData } from '../../utils/api';
import { decodeBase64 } from '../../utils/encoding';

export default function CreateNetwork() {
  const { state } = useLocation();

  const providers = [
    { label: 'Podman', value: 'podman' },
    { label: 'Kubernetes', value: 'kubernetes' },
    { label: 'Native', value: 'native' },
  ];
  const settingsData = useSettingsStore((store) => store.settingsData);
  const setSettings = useSettingsStore((store) => store.setSettings);
  const setRelayChainData = useRelayChainStore(
    (store) => store.setRelayChainData,
  );
  const setNodesList = useNodeListStore((store) => store.setNodesList);
  const setParaChainList = useParaChainListStore(
    (store) => store.setParaChainList,
  );
  const setHrmpData = useHRMPStore((store) => store.setHrmpData);
  const setTestConfigData = useTestConfigStore(
    (store) => store.setTestConfigData,
  );

  const setTemplateId = useTemplateIdStore((store) => store.setTemplateId);
  const templateId = useTemplateIdStore((store) => store.templateId);

  const handler = (name: string, value: boolean) => {
    if (name === 'bootNode') {
      setSettings({ ...settingsData, isBootNode: value });
    } else {
      setSettings({ ...settingsData, polkadotIntrospector: value });
    }
  };

  const updateStore = (comp: string, data: any, additionalInfo?: any) => {
    switch (comp) {
      case 'settings': {
        const obj = {
          isBootNode: false,
          polkadotIntrospector: false,
          provider: data.networkProvider,
          networkDirectory: data.networkDirectory,
          networkName: data.name,
        };
        setSettings(obj);
        break;
      }
      case 'relayChain': {
        const obj = {
          default_image: data.default_image,
          chain: data.chain,
          default_command: data.default_command,
          default_args: data.default_args,
        };
        setRelayChainData(obj);
        setNodesList(data.nodes);
        break;
      }
      case 'parachains': {
        setParaChainList(data);
        break;
      }
      case 'hrmp': {
        setHrmpData(data);
        break;
      }
      case 'testConfig': {
        const obj = {
          editorValue: data,
          networkName: additionalInfo,
        };
        setTestConfigData(obj);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (state && state.templateId) {
      setTemplateId(state.templateId);
      getTemplateData(state.templateId)
        .then((response) => {
          if (response && response.result) {
            const configContent = decodeBase64(response.result.configContent);
            const testContent = decodeBase64(response.result.testContent);
            console.log(configContent);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { parachains, relaychain, hrmp_channels } = JSON.parse(configContent);
            updateStore('settings', response.result);
            updateStore('relayChain', relaychain);
            updateStore('parachains', parachains);
            if (hrmp_channels) updateStore('hrmp', hrmp_channels);
            updateStore('testConfig', testContent, response.result.name);
          }
        })
        .catch((err) => {
          console.log(err);
          notify('error', 'Failed to get network data.');
        });
    } else if (templateId === null) {
      setTemplateId('');
      setSettings({
        isBootNode: false,
        polkadotIntrospector: false,
        provider: '',
        networkDirectory: '',
        networkName: '',
      });
      setRelayChainData({
        default_image: '',
        chain: '',
        default_command: '',
        default_args: [],
      });
      setNodesList([]);
      setParaChainList([
        {
          id: '',
          addToGenesis: false,
          collator: {
            name: '',
            image: '',
            command: '',
            args: [],
          },
        },
      ]);
      setHrmpData([]);
      setTestConfigData({
        editorValue: '',
      });
    }
  }, [state]);

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='settings' />
      <div className='mx-5'>
        <div className='py-4 px-4 flex flex-row gap-x-8'>
          <span className='text-white flex flex-row pt-2 font-rubik'>
            Add a boot node
          </span>
          <div className='w-max border-border border-2 gap-x-2 rounded py-0.5 px-0.5'>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${settingsData.isBootNode ? 'bg-grad' : ''
              }`}
              onClick={() => handler('bootNode', true)}
            >
              Yes
            </button>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${settingsData.isBootNode ? '' : 'bg-grad'
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
              className={`text-white px-3 py-1.5 rounded ${settingsData.polkadotIntrospector ? 'bg-grad' : ''
              }`}
              onClick={() => handler('polkadotIntrospector', true)}
            >
              Yes
            </button>
            <button
              type='button'
              className={`text-white px-3 py-1.5 rounded ${settingsData.polkadotIntrospector ? '' : 'bg-grad'
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
        <div className='text-white pl-4 py-4 font-rubik flex flex-row'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-1 font-extrabold'>Network Directory:</span>
            <input
              className='bg-black border-border border-2 rounded w-[250px]'
              type='text'
              name='network_directory'
              value={settingsData.networkDirectory}
              onChange={(e) => setSettings({
                ...settingsData,
                networkDirectory: e.target.value,
              })}
            />
          </div>
        </div>
        <div className='text-white pl-4 py-4 font-rubik flex flex-row'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-1 font-extrabold'>Template name:</span>
            <input
              className='bg-black border-border border-2 rounded w-[250px]'
              type='text'
              name='template_name'
              onChange={(e) => setSettings({
                ...settingsData,
                networkName: e.target.value,
              })}
              value={settingsData.networkName}
            />
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
