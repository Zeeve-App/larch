import React, { SyntheticEvent } from 'react';
import IconImage from "../assets/Search.svg";
import IconGrid from "../assets/Grid.svg";
import IconEp from "../assets/Menu.svg";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Parent } from './Parent';


export function Network() {
  console.log("===========")

  const [networkList, setNetworkList] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ total: number }>({ total: 0 });

  const fetchData = async () => {
    const api_data = fetch("http://localhost:9000/api/larch/network/list", {
      method: 'post'
     
    })
    console.log("==============")
    const response = await api_data;
    const data = await response.json();
    const temp = data.result
    console.log({data },{temp})

    return setNetworkList(temp);
  }
  useEffect(()=>{

    fetchData()
  },[])

  return (
    <div className='p-6 gap-6 flex-col flex'>
      <div className='h-12 w-[1138px] flex'>
        <div className='w-[350px] h-12 bg-black border-2 border-border rounded flex '>
          {/* <h3 className='text-white font-rubik text-base m-2.5'>Search... search </h3>
         */}
          <form className="flex w-full justify-between px-4  ">
            <input className="form-control text-white focus:outline-none w-full bg-black me-2 font-rubik text-base " placeholder="Search..." />
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            <img className="w-6 h-6  m-2.5  " src={IconImage} alt="" />

          </form>
          {/* <img className="w-4 h-4 m-2.5 " src= {IconImage} alt=""/> */}

        </div>
        <div className="h-full flex w-full flex-wrap	content-center  item-center justify-end gap-4">
          <div className='item-center'>
            <button className="bg-create-button text-white font-rubik flex  border-2 border-border rounded h-10 px-4 items-center">
              <Link to="/template/createNetwork/setting">
                <span>Create Network</span>
              </Link>
            </button>
          </div>
          <div className='p-2.5 border-2 border-border rounded h-10 w-10 bg-create-button '>
            <img className=" " src={IconGrid} alt="" />
          </div>
          <div className='p-2.5 border-2 border-border rounded h-10 w-10 bg-create-button '>
            <img className=" " src={IconEp} alt="" />
          </div>
        </div>
      </div>
      <div className=" ">
       <Parent/>
      </div>
    </div>



  );
}
export default Network;