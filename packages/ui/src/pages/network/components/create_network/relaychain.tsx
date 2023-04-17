/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';

type NodeInfo = {
  name: string,
  validator: boolean,
  image?: string,
  args?: string[],
};

export default function CreateRelayChain() {
  const [argumentsList, setArgumentsList] = useState(['-lparachain=debug']);
  const [defaultImage, setDefaultImage] = useState('docker.io/parity/polkadot:latest');
  const [nodesList, setNodesList] = useState<NodeInfo[]>([]);

  const removeArgumentAtIndex = (delIndex: number) => {
    if (argumentsList.length > 1) {
      setArgumentsList(argumentsList.filter((ele, index) => !(index === delIndex)));
    }
  };

  const removeNodeAtIndex = (delIndex: number) => {
    if (nodesList.length > 1) {
      setNodesList(nodesList.filter((ele, index) => !(index === delIndex)));
    }
  };

  const updateNodeList = (updateIndex: number, updateContent: any) => {
    setNodesList(nodesList.map((node, index) => {
      if (index !== updateIndex) return node;
      return {
        ...node,
        ...updateContent,
      };
    }));
  };

  useEffect(() => {
    console.log('create relay network page load');
  }, []);

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='relaychain_config' />
      <div className=''>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-5'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Image</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded w-[250px]' type='text' name='image' id='image' value={defaultImage} onChange={(element) => setDefaultImage(element.target.value)} />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Chain</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded w-[250px]' type='text' name='chain' id='chain' value='rococo-local' />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Command</span>
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded w-[250px]' type='text' name='chain' id='chain' value='polkadot' />
            </div>
          </div>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Default Arguments</span>
            <button type='button' className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full' onClick={() => { setArgumentsList([...argumentsList, '']); }}>Add Default Argument</button>
          </div>
          {argumentsList.map((argument, index) => (
            <div className='flex flex-row items-start py-1.5 px-4'>
              <input className='bg-black border-border border-2 rounded w-[250px]' type='arguments' name='arguments' value={argument} />
              <button type='button' className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full' onClick={() => removeArgumentAtIndex(index)}>Delete Argument</button>
              <br />
            </div>
          ))}
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Nodes</span>
            <button
              type='button'
              className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
              onClick={() => {
                setNodesList([...nodesList, {
                  name: '',
                  validator: false,
                  args: [],
                  image: defaultImage,
                }]);
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
                  <input className='bg-black border-border border-2 rounded w-[250px]' type='text' name='name' value={node.name} onChange={(element) => updateNodeList(index, { name: element.target.value })} />
                </div>
                <br />
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Image</span>
                  <input className='bg-black border-border border-2 rounded w-[250px]' type='text' name='name' value={node.image} onChange={(element) => updateNodeList(index, { image: element.target.value })} />
                </div>
                <br />
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Validator</span>
                  <input className='bg-black border-border border-2 rounded w-[1em]' type='checkbox' name='arguments' defaultChecked={node.validator} onChange={() => updateNodeList(index, { validator: !nodesList[index].validator })} />
                </div>
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Arguments</span>
                  <button type='button' className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full' onClick={() => { updateNodeList(index, { args: [...nodesList[index].args!, ''] }); }}>Add Argument</button>
                </div>
                {node.args && node.args.map((argument, argIndex) => (
                  <div className='flex flex-row items-start py-1.5 px-4'>
                    <input className='bg-black border-border border-2 rounded w-[250px]' type='arguments' name='arguments' value={argument} />
                    <button type='button' className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full' onClick={() => { updateNodeList(index, { args: nodesList[index].args!.filter((_, currArgIndex) => currArgIndex !== argIndex) }); }}>Delete Argument</button>
                    <br />
                  </div>
                ))}
              </div>
              <button type='button' className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full' onClick={() => removeNodeAtIndex(index)}>Delete Node</button>
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border'></div>
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/setting'><button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Back</button></Link>
        <Link to='/template/createNetwork/parachain'> <button className='text-white border-border border-2 rounded py-2 px-4 bg-gray'>Next</button></Link>
      </div>
    </div>
  );
}
