/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useStore } from './store';


function Dashboard() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const count =  useStore((state:any) => state.count);
  console.log("=====",count)
  const linkClicked = useStore((state :any) => state.linkClicked);

  
return (
   <div>
     <p>Dashboard click count {count}</p>
   <button onClick={() => linkClicked()}>hello Dashboard</button>
  
   </div>
  
);
}
export default Dashboard;