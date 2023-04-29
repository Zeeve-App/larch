import { FC, useEffect } from "react";
import { Button } from "src/components/Button";
import { useCreateTemplate, HRMP } from "src/store/CreateTemplate";
import { ReactComponent as IconArrowUp } from "src/assets/ArrowUp.svg";
import { ReactComponent as IconArrowDown } from "src/assets/ArrowDown.svg";
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
        <div>
            <div className="px-5 md:w-1/2">
                <div className="flex flex-col p-4">
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
                                    className="text-white flex border-2 border-dark-700 p-4 my-4 gap-4 rounded-xl"
                                    key={index}
                                >
                                    <div className="flex-grow flex flex-col gap-4">
                                        <div className="flex items-center justify-between gap-x-12">
                                            <span className="font-extrabold min-w-[5rem]">
                                                Sender
                                            </span>
                                            <input
                                                className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                                type="text"
                                                value={item.sender}
                                                onChange={(e) =>
                                                    hrmpHandler(e.target.value, index, "sender")
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-x-12">
                                            <span className="font-extrabold min-w-[5rem]">
                                                Recipient
                                            </span>
                                            <input
                                                className="flex-grow bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                                type="text"
                                                value={item.recipient}
                                                onChange={(e) =>
                                                    hrmpHandler(e.target.value, index, "recipient")
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-start gap-x-12">
                                            <span className="font-extrabold min-w-[10rem]">
                                                Max Capabilities
                                            </span>
                                            <input
                                                className="bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                                type="number"
                                                min={0}
                                                value={item.max_capacity}
                                                onChange={(e) => {
                                                    handleMaxCapability(Number(e.target.value), index);
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-start gap-x-12">
                                            <span className="font-extrabold min-w-[10rem]">
                                                Max message size
                                            </span>
                                            <input
                                                className="bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md"
                                                type="number"
                                                min={0}
                                                value={item.max_message_size}
                                                onChange={(e) => {
                                                    handleMsgSize(Number(e.target.value), index);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-grow-0 border-s-2 border-dark-700 ps-4">
                                        <Button
                                            className="bg-red-500 p-3"
                                            onClick={() => removeHRMPAtIndex(index)}
                                            iconLeft={<IconTrash className="m-0 p-0" />}
                                        />
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
