/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import { FC } from "react";
import { Button } from "src/components/Button";
import { useCreateTemplate, HRMP } from "src/store/CreateTemplate";
import { ReactComponent as IconAdd } from "src/assets/Add.svg";
import { ReactComponent as IconTrash } from "src/assets/Trash.svg";

export interface Step04Props {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const Step04: FC<Step04Props> = ({ onNextStep, onPreviousStep }) => {
  const { HRMPList, setHRMPList } = useCreateTemplate();

  const maxCapabilityHandler = (type: string, index: number) => {
    const arr: HRMP[] = [...HRMPList];
    if (type === "increment") {
      arr[index].max_capacity = arr[index].max_capacity + 1;
    } else {
      arr[index].max_capacity = arr[index].max_capacity - 1;
    }
    setHRMPList(arr);
  };

  const handleMaxCapability = (value: number, index: number) => {
    const arr: HRMP[] = [...HRMPList];
    arr[index].max_capacity = value;
    setHRMPList(arr);
  };

  const handleMsgSize = (value: number, index: number) => {
    const arr: HRMP[] = [...HRMPList];
    arr[index].max_message_size = value;
    setHRMPList(arr);
  };

  const maxMsgSizeHandler = (type: string, index: number) => {
    const arr: HRMP[] = [...HRMPList];
    if (type === "increment") {
      arr[index].max_message_size = arr[index].max_message_size + 1;
    } else {
      arr[index].max_message_size = arr[index].max_message_size - 1;
    }
    setHRMPList(arr);
  };

  const hrmpHandler = (value: string, index: number, name: string) => {
    const arr = [...HRMPList];
    if (name === "sender") {
      arr[index].sender = value;
    } else if (name === "recipient") {
      arr[index].recipient = value;
    }
    setHRMPList(arr);
  };

  const addHrmp = () => {
    const arr = [...HRMPList];
    arr.push({
      sender: "",
      recipient: "",
      max_capacity: 0,
      max_message_size: 0,
    });
    setHRMPList(arr);
  };

  const removeHRMPAtIndex = (delIndex: number) => {
    if (HRMPList.length > 0) {
      const arr = HRMPList.filter((ele, index) => !(index === delIndex));
      setHRMPList(arr);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-6 overflow-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-end gap-x-12">
            <Button
              className="bg-larch-dark_3 hover:bg-larch-pink p-3"
              iconLeft={<IconAdd className="m-0 p-0" />}
              onClick={addHrmp}
            >
              Add HRMP
            </Button>
          </div>
          {HRMPList.length > 0 &&
            HRMPList.map((item, index) => {
              return (
                <div
                  className="text-white flex flex-col border-2 border-dark-700 p-6 gap-6 rounded-xl"
                  key={index}
                >
                  <div className="flex gap-6 items-start">
                    <h2 className="flex-grow">HRMP {index + 1}</h2>
                    <Button
                      className="p-3 text-larch-error"
                      variant={"outline"}
                      onClick={() => removeHRMPAtIndex(index)}
                      iconLeft={<IconTrash className="m-0 p-0" />}
                    />
                  </div>
                  <div className="flex-grow flex flex-col border-2 border-dark-700 rounded-xl gap-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
                      <div className="flex flex-col md:flex-row  items-start md:items-center gap-3 md:gap-6">
                        <span className="font-extrabold ">Sender</span>
                        <input
                          className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                          type="text"
                          value={item.sender}
                          onChange={(e) =>
                            hrmpHandler(e.target.value, index, "sender")
                          }
                        />
                      </div>
                      <div className="flex flex-col md:flex-row  items-start md:items-center gap-3 md:gap-6">
                        <span className="font-extrabold ">Recipient</span>
                        <input
                          className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                          type="text"
                          value={item.recipient}
                          onChange={(e) =>
                            hrmpHandler(e.target.value, index, "recipient")
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
                      <div className="flex flex-col md:flex-row  items-start md:items-center gap-3 md:gap-6">
                        <span className="font-extrabold">
                          Max Capabilities
                        </span>
                        <input
                          className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                          type="number"
                          min={0}
                          value={item.max_capacity}
                          onChange={(e) => {
                            handleMaxCapability(Number(e.target.value), index);
                          }}
                        />
                      </div>
                      <div className="flex flex-col md:flex-row  items-start md:items-center gap-3 md:gap-6">
                        <span className="font-extrabold">
                          Max message size
                        </span>
                        <input
                          className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                          type="number"
                          min={0}
                          value={item.max_message_size}
                          onChange={(e) => {
                            handleMsgSize(Number(e.target.value), index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div className="flex flex-row-reverse mt-3">
                    <button
                        type="button"
                        className="order-last bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full"
                        onClick={addHrmp}
                    >
                        Add HRMP
                    </button>
                </div>
                {HRMPList.length > 0 &&
                    HRMPList.map((item, index) => (
                        <>
                            <div
                                className="text-white pl-4 py-4 font-rubik flex flex-col gap-y-3"
                                key={`hrmp-${index.toString()}`}
                            >
                                <div className="gap-x-4">
                                    <span className="">Sender</span>
                                    <div className="flex flex-row items-start py-1.5">
                                        <input
                                            type="text"
                                            className="bg-black border-border border-2 rounded py-1 px-2 w-[100%]"
                                            value={item.sender}
                                            onChange={(e) =>
                                                hrmpHandler(e.target.value, index, "sender")
                                            }
                                        />
                                    </div>
                                    <span className="mt-5">Recipient</span>
                                    <div className="flex flex-row items-start py-1.5">
                                        <input
                                            type="text"
                                            className="bg-black border-border border-2 rounded py-1 px-2 w-[100%]"
                                            value={item.recipient}
                                            onChange={(e) =>
                                                hrmpHandler(e.target.value, index, "recipient")
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="text-white py-4 font-rubik flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-4">
                                        <div className="flex gap-x-4">
                                            <span className="py-1.5">Max Capabilities:</span>
                                            <div className="bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12">
                                                <span className="py-1.5 px-2">{item.max_capacity}</span>
                                                <span className="text-white py-1.5 px-1.5">
                                                    <IconArrowUp
                                                        className="w-3 h-3"
                                                        onClick={() =>
                                                            maxCapabilityHandler("increment", index)
                                                        }
                                                    />

                                                    <IconArrowDown
                                                        className="w-3 h-3"
                                                        onClick={() =>
                                                            maxCapabilityHandler("decrement", index)
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-4">
                                            <span className="py-1.5">Max message size:</span>
                                            <div className="bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12">
                                                <span className="py-1.5 px-2">
                                                    {item.max_message_size}
                                                </span>
                                                <span className="text-white py-1.5 px-1.5">
                                                    <IconArrowUp
                                                        className="w-3 h-3"
                                                        onClick={() =>
                                                            maxMsgSizeHandler("increment", index)
                                                        }
                                                    />
                                                    <IconArrowDown
                                                        className="w-3 h-3"
                                                        onClick={() =>
                                                            maxMsgSizeHandler("decrement", index)
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse gap-x-4 mb-4">
                                <button
                                    type="button"
                                    className="bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full"
                                    onClick={() => removeHRMPAtIndex(index)}
                                >
                                    Delete HRMP
                                </button>
                            </div>
                            <div className="h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-dark-700" />
                        </>
                    ))} */}
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

export default Step04;
