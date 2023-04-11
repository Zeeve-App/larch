import { useEffect, useState } from 'react';
import UserData from './table';
import PaginatedItems from '../../../components/pagination';
import { getNetworkList } from '../../../utils/apiCollection/fetchApi'


export function Parent() {

    const [networkList, setNetworkList] = useState<any[]>([]);
    const [meta, setMeta] = useState<{ total: number }>({ total: 0 });
    const [itemPerPage, setItemPerPage] = useState(5);
    const [pageNum, setPageNum] = useState(1);


      const onPageChange = (pageNumOnChange: number) => {
        setPageNum(pageNumOnChange)
      }
      useEffect(() => {
        getNetworkList({meta:{
          numOfRec:itemPerPage,
          pageNum
        }}).then((response)=>{
            setNetworkList(response.result)
          setMeta(response.meta)
        })
      }, [pageNum])

    return (

        <div className=" ">
        <table className="text-white border-2 border-border font-rubik w-full rounded">
            <thead className='bg-create-button'>
                <tr className=' border-b-2 border-border rounded '>
                    <th className='px-6 py-3 w-56.25 text-left' scope="col">Network Name</th>
                    <th className='px-6 py-3 text-left' scope="col">Provider</th>
                    <th className='px-6 py-3 text-left' scope="col">Network Directory</th>
                    <th className='px-6 py-3' scope="col">Created On </th>
                    <th className='px-6 py-3' scope="col">Status </th>
                    <th className='px-6 py-3' scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <UserData users={networkList} />
            </tbody>
        </table>
         <div className='flex flex-row justify-end'>
         <PaginatedItems itemsPerPage={itemPerPage} totalRecords={meta.total} onPageChange={onPageChange} />
       </div>
       </div>

    )
}