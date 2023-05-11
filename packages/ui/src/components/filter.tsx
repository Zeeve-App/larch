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

/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { MinusCircleIcon, SparklesIcon, XCircleIcon } from '@heroicons/react/20/solid';
import iconSearch from 'src/assets/Search.svg';
import { NetworkFilterInput, ActivityFilterInput, TemplateFilterInput } from '../types/filter.types';
type FilterProps = {
  filterData: NetworkFilterInput[] | ActivityFilterInput[] | TemplateFilterInput[];
  isFilterSubmit: boolean;
  setFilterData: (value: NetworkFilterInput[] | ActivityFilterInput[] | TemplateFilterInput[]) => void;
  setIsFilterSubmit: (value: boolean) => void;
};

export default function Filter({
  filterData, isFilterSubmit, setFilterData, setIsFilterSubmit,
}: FilterProps) {
  const optionClick = (value: NetworkFilterInput, index: number) => {
    const modifyObj: NetworkFilterInput = { ...value };
    if (value.isSearchOpen) {
      modifyObj.isSearchOpen = false;
    } else {
      modifyObj.isSearchOpen = true;
    }
    const arr: NetworkFilterInput[] = [...filterData];
    arr.forEach((item: NetworkFilterInput) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    arr[index] = modifyObj;
    setFilterData(arr);
  };

  const closeSearch = () => {
    const arr: NetworkFilterInput[] = [...filterData];
    arr.forEach((item: NetworkFilterInput) => {
      // eslint-disable-next-line no-param-reassign
      item.isSearchOpen = false;
    });
    setFilterData(arr);
  };

  const searchHandler = (e: any, index: number) => {
    const arr: NetworkFilterInput[] = [...filterData];
    arr[index].inputValue = e.target.value;
    setFilterData(arr);
  };

  const submitSearchData = (clear?: boolean) => {
    setFilterData(filterData.map((d) => ({ ...d, inputValue: clear ? undefined : d.inputValue, isSearchOpen: false })));
    setIsFilterSubmit(!isFilterSubmit);
  };

  return (
    <div className='flex justify-between px-2 gap-3'>
      {filterData.map((item, index: number) => (
        <div>
          <button
            type='button'
            key={`filter-${index.toString()}`}
            className='h-8 bg-brand-gradient from-th-start to-th-end text-white-800 text-md font-medium flex flex-row rounded dark:text-white-400 border border-black-400 w-36 px-2 pt-1'
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
                  type={item.key === 'createdAt' ? 'date' : 'text'}
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
        className='w-[50px] h-8 border-2 bg-larch-success border-white-400 rounded-xl'
        aria-hidden
        onClick={() => submitSearchData()}
      >
        <img className='w-7 h-3 m-2' src={iconSearch} alt='' />
      </button>
      <button
        type='button'
        className='px-3 pt-0 h-8 bg-larch-error border-2 border-white-400 rounded-xl font-rubik font-medium flex flex-row align-middle'
        aria-hidden
        onClick={() => submitSearchData(true)}
      >
        <div className='pr-2 text-ellipsis overflow-hidden truncate mt-0.5 flex-1'>Clear filters</div>
        <XCircleIcon className='h-5 mt-1 text-amber-950' />
      </button>
    </div>
  );
}
