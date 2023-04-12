import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../header';
import Menu from '../main_menu';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className='flex flex-row gap-0 bg-black'>
        <Menu />
        <Outlet />
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
      </div>
    </>
  );
}
