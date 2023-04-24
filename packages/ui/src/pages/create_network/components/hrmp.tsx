/* eslint-disable operator-assignment */
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import IconUparrow from './assets/up.svg';
import IconDownarrow from './assets/down.svg';
import { useHRMPStore, HRMP } from '../../../store/createNetworkStore';

export function CreateHrmp() {
  const hrmpData = useHRMPStore((state) => state.hrmpData);
  const setHrmpData = useHRMPStore((state) => state.setHrmpData);

  console.log('hrmpData', hrmpData);
  const maxCapabilityHandler = (type: string, index: number) => {
    const arr: HRMP[] = [...hrmpData];
    if (type === 'increment') {
      arr[index].max_capacity = arr[index].max_capacity + 1;
    } else {
      arr[index].max_capacity = arr[index].max_capacity - 1;
    }
    setHrmpData(arr);
  };
  const maxMsgSizeHandler = (type: string, index: number) => {
    const arr: HRMP[] = [...hrmpData];
    if (type === 'increment') {
      arr[index].max_message_size = arr[index].max_message_size + 1;
    } else {
      arr[index].max_message_size = arr[index].max_message_size - 1;
    }
    setHrmpData(arr);
  };

  const hrmpHandler = (value: string, index: number, name: string) => {
    const arr = [...hrmpData];
    if (name === 'sender') {
      arr[index].sender = value;
    } else if (name === 'recipient') {
      arr[index].recipient = value;
    }
    setHrmpData(arr);
  };

  const addHrmp = () => {
    const arr = [...hrmpData];
    arr.push({
      sender: '',
      recipient: '',
      max_capacity: 0,
      max_message_size: 0,
    });
    setHrmpData(arr);
  };

  const removeHRMPAtIndex = (delIndex: number) => {
    if (hrmpData.length > 0) {
      const arr = hrmpData.filter((ele, index) => !(index === delIndex));
      setHrmpData(arr);
    }
  };

  return (
    <div className='flex-col flex'>
      <NavBar pageSlug='hrmp' />
      <div className='w-[650px] py-5 px-6'>
        <div className='flex flex-row-reverse mt-3'>
          <button
            type='button'
            className='order-last bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
            onClick={addHrmp}
          >
            Add HRMP
          </button>
        </div>
        {hrmpData && hrmpData.map((item, index) => (
          <>
            <div
              className='text-white pl-4 py-4 font-rubik flex flex-col gap-y-3'
              key={`hrmp-${index.toString()}`}
            >
              <div className='gap-x-4'>
                <span className=''>Sender</span>
                <div className='flex flex-row items-start py-1.5'>
                  <input
                    type='text'
                    className='bg-black border-border border-2 rounded py-1 px-2 w-[100%]'
                    value={item.sender}
                    onChange={(e) => hrmpHandler(e.target.value, index, 'sender')}
                  />
                </div>
                <span className='mt-5'>Recipient</span>
                <div className='flex flex-row items-start py-1.5'>
                  <input
                    type='text'
                    className='bg-black border-border border-2 rounded py-1 px-2 w-[100%]'
                    value={item.recipient}
                    onChange={(e) => hrmpHandler(e.target.value, index, 'recipient')}
                  />
                </div>
              </div>
              <div className='text-white py-4 font-rubik flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-4'>
                  <div className='flex gap-x-4'>
                    <span className='py-1.5'>Max Capabilities:</span>
                    <div className='bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12'>
                      <span className='py-1.5 px-2'>
                        {item.max_capacity}
                      </span>
                      <span className='text-white py-1.5 px-1.5'>
                        {' '}
                        <span
                          aria-hidden
                          onClick={() => maxCapabilityHandler('increment', index)}
                        >
                          <img
                            className='w-3 h-3 '
                            src={IconUparrow}
                            alt=''
                          />
                        </span>
                        <span>
                          <img
                            className='w-3 h-3 '
                            src={IconDownarrow}
                            alt=''
                            aria-hidden
                            onClick={() => maxCapabilityHandler('decrement', index)}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className='flex gap-x-4'>
                    <span className='py-1.5'>Max message size:</span>
                    <div className='bg-black border-border border-2 rounded text-white  flex flex-row gap-x-12'>
                      <span className='py-1.5 px-2'>{item.max_message_size}</span>
                      <span className='text-white py-1.5 px-1.5'>
                        {' '}
                        <img
                          className='w-3 h-3 '
                          src={IconUparrow}
                          alt=''
                          aria-hidden
                          onClick={() => maxMsgSizeHandler('increment', index)}
                        />
                        <img
                          className='w-3 h-3 '
                          src={IconDownarrow}
                          alt=''
                          aria-hidden
                          onClick={() => maxMsgSizeHandler('decrement', index)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row-reverse gap-x-4 mb-4'>
              <button
                type='button'
                className='bg-red hover:bg-violet-700 text-white font-bold ml-2 py-1 px-4 rounded-full'
                onClick={() => removeHRMPAtIndex(index)}
              >
                Delete HRMP
              </button>
            </div>
            <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
          </>
        ))}
      </div>
      <div className='h-18 gap-x-6 px-6  w-full border-b-2 flex flex-row border-border' />
      <div className='flex justify-end py-4 gap-x-4'>
        <Link to='/template/createNetwork/parachain'>
          <button
            type='button'
            className='text-white border-border border-2 rounded py-2 px-4 bg-gray'
          >
            Back
          </button>
        </Link>
        <Link to='/template/createNetwork/testconfig'>
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
export default CreateHrmp;
