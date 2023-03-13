/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {BrowserRouter, Route, Routes , Link} from 'react-router-dom';
import Dashboard from '../pages/dashboard/components/page';
import Network from '../pages/Network';
import IconDashboard from "./assets/Dashboard.svg";
import IconNetwork from "./assets/My-Network.svg";
import IconTemp from "./assets/template.svg";
import IconAct from "./assets/Activity.svg";
import IconSet from "./assets/Setting.svg";
import IconDoc from "./assets/Documentation.svg";
import IconEmail from "./assets/Email.svg";
import IconHelp from "./assets/Help.svg";


export function Menu() {

return (
    <div className="box-border flex flex-col items-start py-6.25 px-0 gap-6.25 min-w-64 h-screen overflow-hidden	border-r-2 border-border divide-solid " > 
    <BrowserRouter>
  
    <nav>
          <div className='gap-6 py-6 px-0 flex flex-col	justify-start	'>
            <div>
              <div className="h-5 font-Rubik font-normal font-normal uppercase text-sm text-light4 pl-4 px-4">main menu</div>
              
             
              
              <div className="w-64 h-14 flex justify-start bg-menu flex-row	flex-nowrap	content-center items-center py-2 px-4  ">
                <div className='font-Rubik text-white text-base	font-normal	flex items-center gap-2.5	'>
                    <img  className="w-6 h-6" src= {IconDashboard} alt=""/>
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              </div>

              <div className="w-64 h-14 flex justify-start bg-menu flex-row	flex-nowrap	content-center items-center py-2 px-4 ">
                <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
                <img src={IconNetwork} alt=""/>
                <Link to="/network">My Network</Link>
               </div>
             </div>

            <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 "> 
              <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconTemp} alt=""/>
              <Link to="/activity">Template</Link>
              </div>
            </div>
        
            <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 "> 
              <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconAct} alt=""/>
              <Link to="/activity">Activity</Link>
              </div>
            </div>
            </div>
               <hr className='bg-order h-0.5 '/>
           <div>
           <div className="h-5 font-Rubik font-normal font-normal uppercase text-sm text-light4 pl-4 px-4">Others</div>
           
           <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 ">
            <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconSet} alt=""/>
              <Link to="#">Setting</Link>
            </div>
          </div>

          <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 "> 
            <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconDoc} alt=""/>
              <Link to="/docs">Documentation</Link>
            </div>
          </div>   
          </div>        
               <hr className='bg-order h-0.5 '/>

          <div>
          <div className="h-5 font-Rubik font-normal font-normal uppercase text-sm text-light4 pl-4 px-4">contact</div>

          <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 ">
            <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconEmail} alt=""/>
              <Link to="#">Email</Link>

              </div>
          </div>

            <div className="w-64 h-14 flex justify-start bg-menu flex-row flex-nowrap content-center items-center py-2 px-4 ">
              <div className='font-Rubik text-white text-base font-normal flex items-center gap-2.5	'>
              <img src={IconHelp} alt=""/>
              <Link to="#">Help and Support</Link>
              </div>
           </div>
           </div>
          </div>

     
   
    </nav>
  
    
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/network' element={<Network/>} />
            <Route path='/network/list' element={<Network/>} />
            <Route path='/network/create' element={<Network/>} />
            <Route path='/template' element={<Network/>} />
            <Route path='/template/list' element={<Network/>} />
            <Route path='/template/create' element={<Network/>} />
            <Route path='/activity' element={<Network/>} />
            <Route path='/docs' element={<Network/>} />
            <Route path='/contact' element={<Network/>} />
        


        </Routes>
        
    </BrowserRouter>
    
    </div>
  
        
    );
    }
    export default Menu;