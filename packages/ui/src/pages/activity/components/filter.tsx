/* eslint-disable max-len */
import React from 'react';
import './filter.css';
import iconSearch from '../../../components/assets/Search.svg';
import { useActivityFilterStore, useFilterSubmit } from '../../../store/activityStore';
import { SelectOptions } from '../declaration';

export default function Filter() {
  const activityFilterData = useActivityFilterStore(
    (state) => state.activityFilterData,
  );
  const setActivityFilterData = useActivityFilterStore(
    (state) => state.setActivityFilterData,
  );

  const setIsFilterSubmit = useFilterSubmit(
    (state) => state.setIsFilterSubmit,
  );

  const optionClick = (value: SelectOptions, index: number) => {
    const modifyObj: SelectOptions = { ...value };
    if (value.isSearchOpen) {
      modifyObj.isSearchOpen = false;
    } else {
      modifyObj.isSearchOpen = true;
    }
    const arr: SelectOptions[] = [...activityFilterData];
    arr.forEach((item: SelectOptions) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    arr[index] = modifyObj;
    setActivityFilterData(arr);
  };

  const closeSearch = () => {
    const arr: SelectOptions[] = [...activityFilterData];
    arr.forEach((item: SelectOptions) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    setActivityFilterData(arr);
  };

  const searchHandler = (e: any, index: number) => {
    const arr: SelectOptions[] = [...activityFilterData];
    arr[index].inputValue = e.target.value;
    setActivityFilterData(arr);
  };

  const submitSearchData = () => {
    setActivityFilterData(activityFilterData);
    setIsFilterSubmit(true);
    closeSearch();
  };

  return (
    <div className='flex justify-between px-4 gap-3'>
      {activityFilterData.map((item, index: number) => (
        <div key={`filter-${index.toString()}`}>
          <span
            aria-hidden
            onClick={() => optionClick(item, index)}
            onBlur={closeSearch}
            className='badge h-10 text-white-800 text-md font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:text-white-400 border border-black-400'
          >
            {item.label}
            {' '}
            &nbsp;
            <div>&darr;</div>
          </span>
          {item.isSearchOpen && (
            <div className='w-[100px] h-12 bg-white border-2 border-border rounded flex'>
              <input
                className='form-control rounded text-black focus:outline-none bg-white me-2 font-rubik text-base'
                placeholder='Search...'
                value={item.inputValue}
                onChange={(e) => searchHandler(e, index)}
              />
            </div>
          )}
        </div>
      ))}
      <div
        className='w-[50px] h-10 bg-black border-2 border-white-400 rounded'
        aria-hidden
        onClick={submitSearchData}
      >
        <img className='w-6 h-4  m-2.5' src={iconSearch} alt='' />
      </div>
    </div>
  );
}
