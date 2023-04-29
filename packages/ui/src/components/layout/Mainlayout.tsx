import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SidebarLayout from './SidebarLayout';
import HeaderLayout from './HeaderLayout';

export default function MainLayout() {
  return (
    <>
      <main className='flex relative h-screen w-screen overflow-hidden'>
        <SidebarLayout />
        <section className='flex-grow absolute md:relative inset-0 h-screen'>
          <HeaderLayout />
          <div className='overflow-y-auto overflow-x-auto' style={{
            height: 'calc(99vh - 5rem)'
          }}>
            <Outlet />
          </div>
        </section>
      </main>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        toastClassName='border-solid border-toast border-2'
      />
    </>
  );
}
