/* eslint-disable max-len */
import { MinusCircleIcon, SparklesIcon, XCircleIcon } from '@heroicons/react/20/solid';
import iconSearch from '../../../components/assets/Search.svg';
import { ActivityFilterInput, useActivityFilterStore, useFilterSubmit } from '../../../store/activityStore';

export default function Filter() {
  const activityFilterData = useActivityFilterStore(
    (state) => state.activityFilterData,
  );
  const setActivityFilterData = useActivityFilterStore(
    (state) => state.setActivityFilterData,
  );

  const isFilterSubmit = useFilterSubmit(
    (state) => state.isFilterSubmit,
  );
  const setIsFilterSubmit = useFilterSubmit(
    (state) => state.setIsFilterSubmit,
  );

  const optionClick = (value: ActivityFilterInput, index: number) => {
    const modifyObj: ActivityFilterInput = { ...value };
    if (value.isSearchOpen) {
      modifyObj.isSearchOpen = false;
    } else {
      modifyObj.isSearchOpen = true;
    }
    const arr: ActivityFilterInput[] = [...activityFilterData];
    arr.forEach((item: ActivityFilterInput) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    arr[index] = modifyObj;
    setActivityFilterData(arr);
  };

  const closeSearch = () => {
    const arr: ActivityFilterInput[] = [...activityFilterData];
    arr.forEach((item: ActivityFilterInput) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    setActivityFilterData(arr);
  };

  const searchHandler = (e: any, index: number) => {
    const arr: ActivityFilterInput[] = [...activityFilterData];
    arr[index].inputValue = e.target.value;
    setActivityFilterData(arr);
  };

  const submitSearchData = (clear?: boolean) => {
    setActivityFilterData(activityFilterData.map((d) => ({ ...d, inputValue: clear ? undefined : d.inputValue, isSearchOpen: false })));
    setIsFilterSubmit(!isFilterSubmit);
  };

  return (
    <div className='flex justify-between px-2 gap-3'>
      {activityFilterData.map((item, index: number) => (
        <div>
          <button
            type='button'
            key={`filter-${index.toString()}`}
            className='h-8 bg-gradient-to-r from-th-start to-th-end text-white-800 text-md font-medium flex flex-row rounded dark:text-white-400 border border-black-400 w-36 px-2 pt-1'
            onClick={() => optionClick(item, index)}
          >
            <div className='text-ellipsis overflow-hidden truncate flex-1 text-left'>{item.label}</div>
            &nbsp;
            <div className='w-1/12'>{item.inputValue ? (<SparklesIcon className='mt-1 h-4 text-grey' />) : (<MinusCircleIcon className='mt-1 h-4 text-white' />)}</div>
          </button>
          {
            item.isSearchOpen && (
              <div className='mt-1 h-8 bg-white border-2 border-border rounded flex' style={{ position: 'absolute' }}>
                <input
                  type={item.key === 'date' ? 'date' : 'text'}
                  className='form-control mx-2 rounded text-black focus:outline-none bg-white me-2 font-rubik text-base'
                  placeholder='Search...'
                  value={item.inputValue}
                  onChange={(e) => searchHandler(e, index)}
                  onBlur={closeSearch}
                />
              </div>
            )
          }
        </div>
      ))}
      <button
        type='button'
        className='w-[50px] h-8 bg-green border-2 border-white-400 rounded-xl'
        aria-hidden
        onClick={() => submitSearchData()}
      >
        <img className='w-7 h-3 m-2' src={iconSearch} alt='' />
      </button>
      <button
        type='button'
        className='px-3 pt-0 h-8 bg-red-500 border-2 border-white-400 rounded-xl font-rubik font-medium flex flex-row align-middle'
        aria-hidden
        onClick={() => submitSearchData(true)}
      >
        <div className='pr-2 text-ellipsis overflow-hidden truncate mt-0.5 flex-1'>Clear filters</div>
        <XCircleIcon className='h-5 mt-1 text-amber-950' />
      </button>
    </div>
  );
}
