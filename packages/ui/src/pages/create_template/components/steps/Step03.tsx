import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "src/components/Button";
import { useCreateTemplate } from "src/store/CreateTemplate";
import { ReactComponent as IconAdd } from "src/assets/Add.svg";
import { ReactComponent as IconTrash } from "src/assets/Trash.svg";


export interface Step03Props {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const Step03: FC<Step03Props> = ({ onNextStep, onPreviousStep }) => {
  const { state } = useLocation();
  const { paraChainList, setParaChainList } = useCreateTemplate();

  const updateParachains = (updateIndex: number, updateContent: any) => {
    setParaChainList(
      paraChainList.map((parachain, index) => {
        if (index !== updateIndex) return parachain;
        return {
          ...parachain,
          ...updateContent,
        };
      })
    );
  };

  const removeParachainsAtIndex = (delIndex: number) => {
    if (paraChainList.length > 0) {
      setParaChainList(
        paraChainList.filter((ele, index) => !(index === delIndex))
      );
    }
  };

  const argumentsHandler = (
    value: string,
    paraChainIdx: number,
    argsIdex: number
  ) => {
    if (paraChainList && paraChainList[paraChainIdx].collator?.args?.length) {
      const arr: string[] | undefined =
        paraChainList[paraChainIdx].collator?.args;
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
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6 overflow-auto">
        <div className="text-white flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="border-2 border-dark-700 p-6 rounded-xl">
              <div className="flex items-start justify-between gap-x-12">
                <span className="font-extrabold text-xl">Parachain</span>
                <Button
                  className="bg-larch-dark_3 hover:bg-larch-pink p-3"
                  iconLeft={<IconAdd className="m-0 p-0" />}
                  onClick={() => {
                    setParaChainList([
                      ...paraChainList,
                      {
                        id: "",
                        add_to_genesis: false,
                        collator: {
                          name: "",
                          image: "",
                          command: "",
                          args: [],
                        },
                      },
                    ]);
                  }}
                />
              </div>
              <div className="flex flex-col gap-6 mt-7">
                {paraChainList.map((parachain, index) => (
                  <div className="flex justify-between gap-6">
                    <div className="flex flex-col flex-grow border-2 border-dark-700 rounded-xl gap-6 p-6">
                      <div className="flex items-center justify-start gap-x-12 ">
                        <span className="font-extrabold min-w-[10rem]">
                          Parachain ID
                        </span>
                        <input
                          className="flex-grow max-w-[300px] active:ring-larch-pink focus:ring-larch-pink bg-larch-dark_2 focus:bg-larch-dark border-dark-700 border-2 rounded-md"
                          type="text"
                          value={parachain.id}
                          onChange={(element) =>
                            updateParachains(index, {
                              id: element.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-start gap-x-12">
                        <span className="font-extrabold min-w-[10rem]">
                          Add to genesis
                        </span>
                        <input
                          className="bg-larch-dark_2 border-dark-700 border-2 checked:border-dark-700 checked:bg-transparent focus:checked:bg-transparent hover:checked:bg-transparent rounded w-5 h-5"
                          type="checkbox"
                          defaultChecked={parachain.add_to_genesis}
                          onChange={() =>
                            updateParachains(index, {
                              add_to_genesis:
                                !paraChainList[index].add_to_genesis,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-6 border-2 border-dark-700 rounded-xl p-6">
                        <span className="font-extrabold w-full">Collector</span>
                        <div className="flex flex-col gap-6 p-6 border-2 border-dark-700 rounded-xl">
                          <div className="flex flex-wrap gap-6 gap-x-20">
                            <div className="flex items-center gap-6">
                              <span className="font-extrabold">Name</span>
                              <input
                                className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                type="text"
                                value={
                                  parachain && parachain?.collator.name
                                    ? parachain?.collator.name
                                    : ""
                                }
                                onChange={(element) =>
                                  updateParachains(index, {
                                    collator: {
                                      ...parachain?.collator,
                                      name: element.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="font-extrabold">Image</span>
                              <input
                                className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                type="text"
                                value={parachain.collator.image}
                                onChange={(element) =>
                                  updateParachains(index, {
                                    collator: {
                                      ...parachain.collator,
                                      image: element.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="font-extrabold">Command</span>
                              <input
                                className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                type="text"
                                value={parachain.collator.command}
                                onChange={(element) =>
                                  updateParachains(index, {
                                    collator: {
                                      ...parachain.collator,
                                      command: element.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="rounded-xl">
                            <div className="flex items-center justify-between gap-x-12">
                              <span className="font-extrabold">Arguments</span>
                              <Button
                                className="bg-larch-dark_3 hover:bg-larch-pink p-3"
                                iconLeft={<IconAdd className="m-0 p-0" />}
                                onClick={() => {
                                  updateParachains(index, {
                                    collator: {
                                      ...parachain.collator,
                                      args: [
                                        ...(Array.isArray(
                                          parachain.collator.args
                                        )
                                          ? parachain.collator.args
                                          : []),
                                        "",
                                      ],
                                    },
                                  });
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-6 mt-7">
                              {paraChainList &&
                                paraChainList[index].collator.args?.map(
                                  (argument, argIndex) => (
                                    <div className="flex justify-between gap-6">
                                      <input
                                        className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                        type="text"
                                        value={argument}
                                        onChange={(element) =>
                                          argumentsHandler(
                                            element.target.value,
                                            index,
                                            argIndex
                                          )
                                        }
                                      />
                                      <Button
                                        className="p-3 text-larch-error"
                                        variant={"outline"}
                                        iconLeft={
                                          <IconTrash className="m-0 p-0" />
                                        }
                                        onClick={() => {
                                          updateParachains(index, {
                                            collator: {
                                              ...parachain.collator,
                                              args: parachain.collator.args.filter(
                                                (_, currArgIndex) =>
                                                  currArgIndex !== argIndex
                                              ),
                                            },
                                          });
                                        }}
                                      />
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="p-3 text-larch-error"
                        variant={"outline"}
                        iconLeft={<IconTrash className="m-0 p-0" />}
                        onClick={() => removeParachainsAtIndex(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-dark-700 mt-5" />
      <div className="flex justify-end p-5 gap-4">
        <Button
          className="bg-larch-dark_2 hover:bg-larch-dark_3"
          onClick={onPreviousStep}
        >
          Back
        </Button>
        <Button className="bg-larch-pink" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step03;
