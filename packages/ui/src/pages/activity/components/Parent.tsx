import React from 'react';
import IconImage from "../assets/Search.svg";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import UserData from './table';
import PaginatedItems from '../../../components/pagination';
import {getUserActivityList} from '../../../utils/apiCollection/fetchApi'

export function Parent() {

  const [activityList, setActivityList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageNum, setPageNum] = useState(1);

  const onPageChange = (pageNumOnChange: number) => {
    setPageNum(pageNumOnChange)
  }

  useEffect(() => {
    getUserActivityList({meta:{
      numOfRec:itemPerPage,
      pageNum
    }}).then((response)=>{
      setActivityList(response.result)
      setMeta(response.meta)
    })
  }, [pageNum])

  return (

    <div className=" ">
      <table className="text-white border-2 border-border font-rubik w-full rounded">
        <thead className='bg-create-button'>
          <tr className=' border-b-2 border-border'>
            <th className='px-6 py-3 w-56.25  text-left' scope="col">ID</th>
            <th className='px-6 py-3  text-left' scope="col">Operation Details</th>
            <th className='px-6 py-3 ' scope="col">Date</th>
            <th className='px-6 py-3  text-left' scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          <UserData users={activityList} />
        </tbody>
      </table>
      <div className='flex flex-row justify-end'>
        <PaginatedItems itemsPerPage={itemPerPage} totalRecords={meta.total} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
export default Parent;