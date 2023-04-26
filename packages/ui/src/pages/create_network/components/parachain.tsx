import { Link } from 'react-router-dom';
import NavBar from './navbar';
import { useParaChainListStore } from '../../../store/createNetworkStore';

export function CreateParachain() {
  const paraChainList = useParaChainListStore((state) => state.paraChainList);
  const setParaChainList = useParaChainListStore(
    (state) => state.setParaChainList,
  );

  const updateParachains = (updateIndex: number, updateContent: any) => {
    setParaChainList(
      paraChainList.map((parachain, index) => {
        if (index !== updateIndex) return parachain;
        return {
          ...parachain,
          ...updateContent,
        };
      }),
    );
  };

  const removeParachainsAtIndex = (delIndex: number) => {
    if (paraChainList.length > 0) {
      setParaChainList(
        paraChainList.filter((ele, index) => !(index === delIndex)),
      );
    }
  };

  const argumentsHandler = (
    value: string,
    paraChainIdx: number,
    argsIdex: number,
  ) => {
    if (paraChainList && paraChainList[paraChainIdx].collator?.args?.length) {
      const arr: string[] | undefined = paraChainList[paraChainIdx].collator?.args;
      if (arr) {
        arr[argsIdex] = value;
        let argsData = paraChainList[paraChainIdx].collator?.args;
        argsData = arr;
        const data = [...paraChainList];
        data[paraChainIdx].collator.args = argsData;
        setParaChainList(data);
      }
    }
  };

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='parachain_config' />
      <div className=''>
        <div className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-4'>
            <span className='pt-3 font-extrabold'>Parachain</span>
            <button
              type='button'
              className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
              onClick={() => {
                setParaChainList([
                  ...paraChainList,
                  {
                    id: '',
                    add_to_genesis: false,
                    collator: {
                      name: '',
                      image: '',
                      command: '',
                      args: [],
                    },
                  },
                ]);
              }}
            >
              Add Node
            </button>
          </div>
          {paraChainList.map((parachain, index) => (
            <div className='flex flex-row items-start py-1.5 px-4'>
              <div className='flex flex-col pl-4 border-stone-200 border-solid items-start py-1.5 px-4'>
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>ID</span>
                  <input
                    className='bg-black border-border border-2 rounded w-[250px]'
                    type='text'
                    name='id'
                    value={parachain.id}
                    onChange={(element) => updateParachains(index, { id: element.target.value })}
                  />
                </div>
                <br />
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Add to genesis</span>
                  <input
                    className='bg-black border-border border-2 rounded w-[1em]'
                    type='checkbox'
                    name='add_to_genesis'
                    defaultChecked={parachain.add_to_genesis}
                    onChange={() => updateParachains(index, {
                      add_to_genesis: !paraChainList[index].add_to_genesis,
                    })}
                  />
                </div>
                <div className='flex flex-row gap-x-4'>
                  <span className='pt-3 font-extrabold'>Collator</span>
                </div>
                <div className='flex flex-col pl-4 border-stone-200 border-solid items-start py-1.5 px-4'>
                  <div className='flex flex-row gap-x-4 pt-2'>
                    <span className='pt-3 font-extrabold'>Name</span>
                    <input
                      className='bg-black border-border border-2 rounded w-[250px]'
                      type='text'
                      name='id'
                      value={
                        parachain && parachain?.collator.name
                          ? parachain?.collator.name
                          : ''
                      }
                      onChange={(element) => updateParachains(index, {
                        collator: {
                          ...parachain?.collator,
                          name: element.target.value,
                        },
                      })}
                    />
                  </div>
                  <br />
                  <div className='flex flex-row gap-x-4 pt-2'>
                    <span className='pt-3 font-extrabold'>Image</span>
                    <input
                      className='bg-black border-border border-2 rounded w-[250px]'
                      type='text'
                      name='image'
                      value={parachain.collator.image}
                      onChange={(element) => updateParachains(index, {
                        collator: {
                          ...parachain.collator,
                          image: element.target.value,
                        },
                      })}
                    />
                  </div>
                  <br />
                  <div className='flex flex-row gap-x-4 pt-2'>
                    <span className='pt-3 font-extrabold'>Command</span>
                    <input
                      className='bg-black border-border border-2 rounded w-[250px]'
                      type='text'
                      name='command'
                      value={parachain.collator.command}
                      onChange={(element) => updateParachains(index, {
                        collator: {
                          ...parachain.collator,
                          command: element.target.value,
                        },
                      })}
                    />
                  </div>
                  <br />
                  <div className='flex flex-row gap-x-4 pt-2'>
                    <span className='pt-3 font-extrabold'>Arguments</span>
                    <button
                      type='button'
                      className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                      onClick={() => {
                        updateParachains(index, {
                          collator: {
                            ...parachain.collator,
                            args: [...parachain.collator.args, ''],
                          },
                        });
                      }}
                    >
                      Add Argument
                    </button>
                  </div>
                  {paraChainList
                    && paraChainList[index].collator?.args
                    && paraChainList[index].collator?.args.map(
                      (argument, argIndex) => (
                        <div className='flex flex-row items-start py-1.5 px-4'>
                          <input
                            className='bg-black border-border border-2 rounded w-[250px]'
                            type='arguments'
                            name='arguments'
                            value={argument}
                            onChange={(element) => argumentsHandler(
                              element.target.value,
                              index,
                              argIndex,
                            )}
                          />
                          <button
                            type='button'
                            className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                            onClick={() => {
                              updateParachains(index, {
                                collator: {
                                  ...parachain.collator,
                                  args: parachain.collator.args.filter(
                                    (_, currArgIndex) => currArgIndex !== argIndex,
                                  ),
                                },
                              });
                            }}
                          >
                            Delete Argument
                          </button>
                          <br />
                        </div>
                      ),
                    )}
                </div>
              </div>
              <button
                type='button'
                className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                onClick={() => removeParachainsAtIndex(index)}
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
        <Link to='/template/createNetwork/relaychain'>
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Back
          </button>
        </Link>
        <Link to='/template/createNetwork/hrmp'>
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
export default CreateParachain;
