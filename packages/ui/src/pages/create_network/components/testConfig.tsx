import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import NavBar from './navbar';
import myTheme from './theme';
import {
  useTestConfigStore,
  useSettingsStore,
  useRelayChainStore,
  useNodeListStore,
  useParaChainListStore,
  useHRMPStore,
  useTemplateIdStore,
} from '../../../store/createNetworkStore';
import PopUpBox from './modal';
import { notify } from '../../../utils/notifications';
import { createTemplateNetwork, updateTemplateNetwork } from '../../../utils/api';
import { encodeBase64 } from '../../../utils/encoding';

export function TestConfig() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const testConfigData = useTestConfigStore((state) => state.testConfigData);
  const setTestConfigData = useTestConfigStore(
    (state) => state.setTestConfigData,
  );
  const settingsData = useSettingsStore((state) => state.settingsData);
  const relayChainData = useRelayChainStore((state) => state.relayChainData);
  const nodesList = useNodeListStore((state) => state.nodesList);
  const paraChainList = useParaChainListStore((state) => state.paraChainList);
  const hrmpData = useHRMPStore((state) => state.hrmpData);
  const templateId = useTemplateIdStore(
    (store) => store.templateId,
  );
  const onChange = React.useCallback((value: any) => {
    setTestConfigData({ ...testConfigData, editorValue: value });
  }, []);

  const configContentPrepare = (): string => {
    const data = {
      relaychain: {
        default_image: relayChainData.default_image,
        default_command: relayChainData.default_command,
        default_args: relayChainData.default_args,
        chain: relayChainData.chain,
        nodes: nodesList,
      },
      parachains: paraChainList,
      hrmp_channels: hrmpData,
    };
    return encodeBase64(JSON.stringify(data));
  };

  const onNetworkCreate = () => {
    setIsOpen(false);
    const payload = {
      name: settingsData.networkName,
      configFilename: `${settingsData.networkName}-config.json`,
      configContent: configContentPrepare(),
      networkDirectory: settingsData.networkDirectory,
      networkProvider: settingsData.provider,
      testFilename: `${settingsData.networkName}-test-config.zndsl`,
      testContent: encodeBase64(testConfigData.editorValue),
    };
    if (templateId) {
      updateTemplateNetwork(templateId, payload)
        .then((response) => {
          console.log('response', response);
        })
        .then(() => {
          setIsOpen(false);
          notify('success', 'Template updated successfully');
          navigate('/template');
        })
        .catch(() => {
          notify('error', 'Failed to update template');
        });
      return;
    }
    createTemplateNetwork(payload)
      .then((response) => {
        console.log('response', response);
      })
      .then(() => {
        setIsOpen(false);
        notify('success', 'Template created successfully');
        navigate('/template');
      })
      .catch(() => {
        notify('error', 'Failed to create template');
      });
  };

  return (
    <div className=' flex-col flex'>
      <NavBar pageSlug='hrmp' />
      <div className='w-[750px]'>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='text-white  py-4 font-rubik flex flex-col gap-y-4'>
            <div className='border-border border-2 rounded'>
              <CodeMirror
                value={testConfigData.editorValue}
                height='200px'
                theme={myTheme}
                placeholder='Enter here you text...'
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
              />
              <div className='h-[50px] border-t-2 border-border'>
                {' '}
                <div className='flex justify-end py-1.5 px-1.5 gap-x-3'>
                  <button
                    type='button'
                    className='text-white border-border border-2 rounded py-1 px-4 bg-gray hover:bg-grad'
                    onClick={() => {
                      setTestConfigData({ ...testConfigData, editorValue: '' });
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/hrmp'>
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Back
          </button>
        </Link>
        <button
          type='button'
          className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          onClick={() => setIsOpen(true)}
        >
          Save
        </button>
      </div>
      <PopUpBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onNetworkCreate}
      />
    </div>
  );
}
export default TestConfig;
