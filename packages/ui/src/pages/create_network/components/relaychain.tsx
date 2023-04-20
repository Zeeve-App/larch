/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import {
  useRelayChainStore,
  useNodeListStore,
} from '../../../store/createNetworkStore';

export default function CreateRelayChain() {
  const relayChainData = useRelayChainStore((state) => state.relayChainData);
  const setRelayChainData = useRelayChainStore(
    (state) => state.setRelayChainData,
  );
  const nodesList = useNodeListStore((state) => state.nodesList);
  const setNodesList = useNodeListStore((state) => state.setNodesList);

  const removeArgumentAtIndex = (delIndex: number) => {
    if (relayChainData.default_args.length > 1) {
      const arr: string[] = relayChainData.default_args.filter(
        (ele, index) => !(index === delIndex),
      );
      setRelayChainData({ ...relayChainData, default_args: arr });
    }
  };

  const removeNodeAtIndex = (delIndex: number) => {
    if (nodesList.length > 1) {
      setNodesList(nodesList.filter((ele, index) => !(index === delIndex)));
    }
  };

  const updateNodeList = (updateIndex: number, updateContent: any) => {
    setNodesList(
      nodesList.map((node, index) => {
        if (index !== updateIndex) return node;
        return {
          ...node,
          ...updateContent,
        };
      }),
    );
  };

  const defaultArgsHandler = (value: string, index: number) => {
    const arr: string[] = [...relayChainData.default_args];
    arr[index] = value;
    setRelayChainData({ ...relayChainData, default_args: arr });
  };

  const nodeArgsHandler = (value: string, nodeIdx: number, argsIdex: number) => {
    if (nodesList && nodesList[nodeIdx]?.args?.length) {
      const arr: string[] | undefined = nodesList[nodeIdx]?.args;
      if (arr) {
        arr[argsIdex] = value;
        let argsData = nodesList[nodeIdx]?.args;
        argsData = arr;
        const data = [...nodesList];
        data[nodeIdx].args = argsData;
        setNodesList(data);
      }
    }
  };

  console.log('relayChainData', relayChainData);
  console.log('nodesList', nodesList);

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='relaychain_config' />
      <div className=''>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-5'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Image</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                className='bg-black border-border border-2 rounded w-[250px]'
                type='text'
                name='image'
                id='image'
                defaultValue={relayChainData.default_image}
                onChange={(element) => setRelayChainData({
                  ...relayChainData,
                  default_image: element.target.value,
                })}
              />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Chain</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                className='bg-black border-border border-2 rounded w-[250px]'
                type='text'
                name='chain'
                id='chain'
                defaultValue={relayChainData.chain}
                onChange={(e) => setRelayChainData({
                  ...relayChainData,
                  chain: e.target.value,
                })}
              />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Command</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                className='bg-black border-border border-2 rounded w-[250px]'
                type='text'
                name='chain'
                id='chain'
                defaultValue={relayChainData.default_command}
                onChange={(e) => setRelayChainData({
                  ...relayChainData,
                  default_command: e.target.value,
                })}
              />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Arguments</span>
            <button
              type='button'
              className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
              onClick={() => {
                setRelayChainData({
                  ...relayChainData,
                  default_args: [...relayChainData.default_args, ''],
                });
              }}
            >
              Add Default Argument
            </button>
          </div>
          {relayChainData.default_args.map((argument, index) => (
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input
                className='bg-black border-border border-2 rounded w-[250px]'
                type='arguments'
                name='arguments'
                defaultValue={argument}
                onChange={(e) => defaultArgsHandler(e.target.value, index)}
              />
              <button
                type='button'
                className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                onClick={() => removeArgumentAtIndex(index)}
              >
                Delete Argument
              </button>
              <br />
            </div>
          ))}
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Nodes</span>
            <button
              type='button'
              className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
              onClick={() => {
                setNodesList([
                  ...nodesList,
                  {
                    name: '',
                    validator: false,
                    args: [],
                    image: relayChainData.default_image,
                  },
                ]);
              }}
            >
              Add Node
            </button>
          </div>
          {nodesList.map((node, index) => (
            <div className='flex flex-row items-start py-1.5 px-4'>
              <div className='flex flex-col pl-4 border-stone-200 border-solid items-start py-1.5 px-4'>
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Name</span>
                  <input
                    className='bg-black border-border border-2 rounded w-[250px]'
                    type='text'
                    name='name'
                    value={node.name}
                    onChange={(element) => updateNodeList(index, { name: element.target.value })}
                  />
                </div>
                <br />
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Image</span>
                  <input
                    className='bg-black border-border border-2 rounded w-[250px]'
                    type='text'
                    name='name'
                    value={node.image}
                    onChange={(element) => updateNodeList(index, { image: element.target.value })}
                  />
                </div>
                <br />
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Validator</span>
                  <input
                    className='bg-black border-border border-2 rounded w-[1em]'
                    type='checkbox'
                    name='arguments'
                    defaultChecked={node.validator}
                    onChange={() => updateNodeList(index, {
                      validator: !nodesList[index].validator,
                    })}
                  />
                </div>
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Arguments</span>
                  <button
                    type='button'
                    className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                    onClick={() => {
                      updateNodeList(index, {
                        args: [...nodesList[index].args!, ''],
                      });
                    }}
                  >
                    Add Argument
                  </button>
                </div>
                {node.args
                  && node.args.map((argument, argIndex) => (
                    <div className='flex flex-row items-start py-1.5 px-4'>
                      <input
                        className='bg-black border-border border-2 rounded w-[250px]'
                        type='arguments'
                        name='arguments'
                        value={argument}
                        onChange={(element) => nodeArgsHandler(element.target.value, index, argIndex)}
                      />
                      <button
                        type='button'
                        className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                        onClick={() => {
                          updateNodeList(index, {
                            args: nodesList[index].args!.filter(
                              (_, currArgIndex) => currArgIndex !== argIndex,
                            ),
                          });
                        }}
                      >
                        Delete Argument
                      </button>
                      <br />
                    </div>
                  ))}
              </div>
              <button
                type='button'
                className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                onClick={() => removeNodeAtIndex(index)}
              >
                Delete Node
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/setting'>
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Back
          </button>
        </Link>
        <Link to='/template/createNetwork/parachain'>
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
