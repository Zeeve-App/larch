/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.svg';
import IconPlus from './assets/plus.svg';
// import IconNotify from './assets/notification.svg';
// import IconImage from './assets/image.svg';
import { useTemplateIdStore } from '../store/createNetworkStore';

export default function Header() {
  const navigate = useNavigate();
  const setTemplateId = useTemplateIdStore((store) => store.setTemplateId);

  const goToCreateNet = () => {
    setTemplateId(null);
    navigate('/template/createNetwork/setting');
  };

  const checkPath = () => {
    const path: string = window.location.pathname;
    if (
      path === '/template/createNetwork/setting'
      || path === '/template/createNetwork/relaychain'
      || path === '/template/parachain'
      || path === '/template/createNetwork/hrmp'
      || path === '/template/createNetwork/testconfig'
    ) {
      return false;
    }
    return true;
  };

  return (
    <nav className='flex items-center h-20 w-360 flex-row  bg-black  box-border gap-176.5 border-b top-0 left-0 divide-solid border-border '>
      <div className='flex items-left p-0 flex-col gap-2.5 w-64 h-20 border-r box-border border-solid border-r-border flex-none grow-0 order-0 justify-center '>
        <span className='flex p-0 items-center flex-col gap-2 w-23.25 h-8.25 flex-none grow-0 order-0'>
          <img src={Logo} alt='' />
        </span>
      </div>

      {checkPath() && (
      <div className='h-full flex w-full flex-row flex-wrap content-center  items-center pr-6 justify-end gap-4'>
        <div className='item-center '>
          <button
            type='button'
            onClick={goToCreateNet}
            className='bg-create-button text-white font-rubik flex  border-2 border-border rounded h-10 px-4 items-center'
          >
            <span>Create network template</span>
            <img className='w-6 h-6' src={IconPlus} alt='' />
          </button>
        </div>
      </div>
      )}
    </nav>
  );
}
