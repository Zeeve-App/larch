import { FC, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Button } from "src/components/Button";
import { useCreateTemplate, DEFAULT_ARGUMENTS, DEFAULT_IMAGES } from "src/store/CreateTemplate";
import { ReactComponent as IconAdd } from "src/assets/Add.svg";
import { ReactComponent as IconTrash } from "src/assets/Trash.svg";

export interface Step02Props {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const Step02: FC<Step02Props> = ({ onNextStep, onPreviousStep }) => {
  const { relayChain, setRelayChain, nodeList, setNodeList } =
    useCreateTemplate();

  const removeArgumentAtIndex = (delIndex: number) => {
    // if (relayChain.default_args.length > 1) {
    const arr: string[] = relayChain.default_args.filter(
      (ele, index) => !(index === delIndex)
    );
    setRelayChain({ ...relayChain, default_args: arr });
    // }
  };

  const removeNodeAtIndex = (delIndex: number) => {
    if (nodeList.length > 1) {
      setNodeList(nodeList.filter((ele, index) => !(index === delIndex)));
    }
  };

  const updateNodeList = (updateIndex: number, updateContent: any) => {
    setNodeList(
      nodeList.map((node, index) => {
        if (index !== updateIndex) return node;
        return {
          ...node,
          ...updateContent,
        };
      })
    );
  };

  const defaultArgsHandler = (value: string, index: number) => {
    const arr: string[] = [...relayChain.default_args];
    arr[index] = value;
    setRelayChain({ ...relayChain, default_args: arr });
  };

  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message: string =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const nodeArgsHandler = (
    value: string,
    nodeIdx: number,
    argsIdex: number
  ) => {
    if (nodeList && nodeList[nodeIdx]?.args?.length) {
      const arr: string[] | undefined = nodeList[nodeIdx]?.args;
      if (arr) {
        arr[argsIdex] = value;
        let argsData = nodeList[nodeIdx]?.args;
        argsData = arr;
        const data = [...nodeList];
        data[nodeIdx].args = argsData;
        setNodeList(data);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6 overflow-auto">
        <div className="text-white flex flex-col">
          <div className="flex flex-col gap-6">
            <div className="flex gap-24 flex-wrap">
              <div className="flex items-center justify-start gap-6">
                <span className="font-extrabold">Default Image</span>
                <Combobox
                  value={relayChain.default_image}
                  as={"div"}
                  className="relative flex-grow max-w-[300px]"
                  onChange={(element) =>
                    setRelayChain({
                      ...relayChain,
                      default_image: element,
                    })
                  }
                >
                  <Combobox.Input
                    as={"input"}
                    className=" bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md w-full"
                    onChange={(element) =>
                      setRelayChain({
                        ...relayChain,
                        default_image: element.target.value,
                      })
                    }
                    defaultValue={relayChain.default_image}
                  />
                  <Combobox.Options className="absolute bg-larch-dark_2 border-2 border-dark-700 rounded-md flex flex-col gap-3 w-full mt-2 p-3 z-10">
                    {DEFAULT_IMAGES.map((image) => (
                      <Combobox.Option
                        className="hover:bg-larch-dark_3 p-2 rounded-md cursor-pointer"
                        key={image}
                        value={image}
                      >
                        {image}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
              </div>
              <div className="flex items-center justify-start gap-6">
                <span className="font-extrabold">Chain</span>
                <input
                  className="flex-grow bg-larch-dark_2 max-w-[300px] focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                  type="text"
                  name="chain"
                  id="chain"
                  defaultValue={relayChain.chain}
                  onChange={(e) =>
                    setRelayChain({
                      ...relayChain,
                      chain: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-start gap-6">
                <span className="font-extrabold ">Default Command</span>
                <input
                  className="flex-grow max-w-[300px] bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                  type="text"
                  defaultValue={relayChain.default_command}
                  onChange={(e) =>
                    setRelayChain({
                      ...relayChain,
                      default_command: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex-grow border-2 border-dark-700 p-6 rounded-xl">
                <div className="flex items-start justify-between gap-x-12">
                  <span className="font-extrabold min-w-[10rem]">
                    Default Arguments
                  </span>
                  <Button
                    className="bg-larch-dark_3 hover:bg-larch-pink p-3"
                    iconLeft={<IconAdd className="m-0 p-0" />}
                    onClick={() => {
                      setRelayChain({
                        ...relayChain,
                        default_args: [...relayChain.default_args, ""],
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-6 mt-7">
                  {relayChain.default_args.map((argument, index) => (
                    <div className="flex justify-between gap-5" key={index}>
                      <Combobox
                        value={argument}
                        as={"div"}
                        className="relative flex-grow"
                        onChange={(e) =>
                          defaultArgsHandler(e, index)
                        }
                      >
                        <Combobox.Input
                          as={"input"}
                          className=" bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md w-full h-full"
                          defaultValue={argument}
                          onChange={(e) =>
                            defaultArgsHandler(e.target.value, index)
                          }
                        />
                        <Combobox.Options className="absolute bg-larch-dark_2 border-2 border-dark-700 rounded-md flex flex-col gap-3 w-full mt-2 p-3 z-10">
                          {DEFAULT_ARGUMENTS.map((arg) => (
                            <Combobox.Option
                              className="hover:bg-larch-dark_3 p-2 rounded-md cursor-pointer"
                              key={arg}
                              value={arg}
                            >
                              {arg}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Combobox>
                      <Button
                        className="p-3 text-larch-error focus:ring-white"
                        variant={"outline"}
                        onClick={() => removeArgumentAtIndex(index)}
                        iconLeft={<IconTrash className="m-0 p-0" />}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-grow border-2 border-dark-700 p-6 rounded-xl">
                <div className="flex items-start justify-between gap-x-12">
                  <span className="font-extrabold">Nodes</span>
                  <Button
                    className="bg-larch-dark_3 hover:bg-larch-pink p-3"
                    iconLeft={<IconAdd className="m-0 p-0" />}
                    onClick={() => {
                      setNodeList([
                        ...nodeList,
                        {
                          name: "",
                          validator: false,
                          args: undefined,
                          image: relayChain.default_image,
                        },
                      ]);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-6 mt-7">
                  {nodeList.map((node, index) => (
                    <div className="flex justify-between gap-5" key={index}>
                      <div className="flex flex-col flex-grow border-2 border-dark-700 rounded-xl p-6 gap-6">
                        <div className="flex items-center justify-between gap-x-12 ">
                          <span className="font-extrabold min-w-[10rem]">
                            Name
                          </span>
                          <input
                            className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                            type="text"
                            value={node.name}
                            onChange={(element) =>
                              updateNodeList(index, {
                                name: element.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between gap-x-12 ">
                          <span className="font-extrabold min-w-[10rem]">
                            Image
                          </span>
                          <Combobox
                            value={node.image}
                            as={"div"}
                            className="relative flex-grow "
                            onChange={(element) =>
                              updateNodeList(index, {
                                image: element
                                  ? element
                                  : undefined,
                              })
                            }
                          >
                            <Combobox.Input
                              as={"input"}
                              className=" bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md w-full"
                              onChange={(element) =>
                                updateNodeList(index, {
                                  image: element.target.value
                                    ? element.target.value
                                    : undefined,
                                })
                              }
                              defaultValue={node.image}
                            />
                            <Combobox.Options className="absolute bg-larch-dark_2 border-2 border-dark-700 rounded-md flex flex-col gap-3 w-full mt-2 p-3 z-10">
                              {DEFAULT_IMAGES.map((image) => (
                                <Combobox.Option
                                  className="hover:bg-larch-dark_3 p-2 rounded-md cursor-pointer"
                                  key={image}
                                  value={image}
                                >
                                  {image}
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          </Combobox>
                        </div>
                        <div className="flex items-center justify-start gap-x-12">
                          <span className="font-extrabold min-w-[10rem]">
                            Validator
                          </span>
                          <input
                            className="bg-larch-dark_2 border-dark-700 border-2 checked:border-dark-700 checked:bg-transparent focus:checked:bg-transparent hover:checked:bg-transparent rounded w-5 h-5"
                            type="checkbox"
                            name="validator"
                            defaultChecked={node.validator}
                            onChange={() =>
                              updateNodeList(index, {
                                validator: !nodeList[index].validator,
                              })
                            }
                          />
                        </div>
                        <div className="rounded-xl">
                          <div className="flex items-center justify-between gap-x-12">
                            <span className="font-extrabold">Arguments</span>
                            <Button
                              className="bg-larch-dark_3 hover:bg-larch-pink p-3"
                              iconLeft={<IconAdd className="m-0 p-0" />}
                              onClick={() => {
                                updateNodeList(index, {
                                  args: [
                                    ...(Array.isArray(nodeList[index].args)
                                      ? nodeList[index].args!
                                      : []),
                                    "",
                                  ],
                                });
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-6 mt-7">
                            {node.args &&
                              node.args.map((argument, argIndex) => (
                                <div className="flex justify-between gap-5" key={index}>
                                  <Combobox
                                    value={argument}
                                    as={"div"}
                                    className="relative flex-grow"
                                    onChange={(element) =>
                                      nodeArgsHandler(
                                        element,
                                        index,
                                        argIndex
                                      )
                                    }
                                  >
                                    <Combobox.Input
                                      as={"input"}
                                      className=" bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md w-full h-full"
                                      defaultValue={argument}
                                      onChange={(element) =>
                                        nodeArgsHandler(
                                          element.target.value,
                                          index,
                                          argIndex
                                        )
                                      }
                                    />
                                    <Combobox.Options className="absolute bg-larch-dark_2 border-2 border-dark-700 rounded-md flex flex-col gap-3 w-full mt-2 p-3 z-10">
                                      {DEFAULT_ARGUMENTS.map((arg) => (
                                        <Combobox.Option
                                          className="hover:bg-larch-dark_3 p-2 rounded-md cursor-pointer"
                                          key={arg}
                                          value={arg}
                                        >
                                          {arg}
                                        </Combobox.Option>
                                      ))}
                                    </Combobox.Options>
                                  </Combobox>
                                  <Button
                                    className="p-3 text-larch-error"
                                    variant={"outline"}
                                    onClick={() => {
                                      updateNodeList(index, {
                                        args: nodeList[index].args!.filter(
                                          (_, currArgIndex) =>
                                            currArgIndex !== argIndex
                                        ),
                                      });
                                    }}
                                    iconLeft={<IconTrash className="m-0 p-0" />}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          className="p-3 text-larch-error"
                          variant={"outline"}
                          onClick={() => removeNodeAtIndex(index)}
                          iconLeft={<IconTrash className="m-0 p-0" />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-dark-700 mt-5" />
      <div className="flex justify-end p-5 gap-6">
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

export default Step02;
