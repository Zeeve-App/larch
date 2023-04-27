/* eslint-disable max-len */
import { useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from 'src/hooks';
import { Button } from 'src/components/zeeve-platform/Button';
import {
  Header,
  HeaderNavContainer,
  HeaderLogo,
  HeaderLogoContainer,
  HeaderMenuButton,
} from 'src/components/zeeve-platform/Header';
import { IconMenu, IconAdd } from 'zeeve-icons/Essential/Linear';
import LarchLogo from 'public/assets/svg/logo.svg';

import { useTemplateIdStore } from 'src/store/createNetworkStore';

function HeaderLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const setTemplateId = useTemplateIdStore((store) => store.setTemplateId);

  const goToCreateNet = () => {
    setTemplateId(null);
    navigate('/template/createNetwork/setting');
  };

  const checkPath = () => {
    if (
      location.pathname === '/template/createNetwork/setting'
      || location.pathname === '/template/createNetwork/relaychain'
      || location.pathname === '/template/parachain'
      || location.pathname === '/template/createNetwork/hrmp'
      || location.pathname === '/template/createNetwork/testconfig'
    ) {
      return false;
    }
    return true;
  };

  return (
    <Header className='justify-between md:justify-end border-b-2 border-dark-700'>
      <HeaderLogoContainer>
        <HeaderMenuButton
          className='bg-larch-dark border-0 hover:bg-larch-dark_2 focus:bg-larch-dark_2 active:bg-larch-dark_2'
          icon={<IconMenu className='text-white text-2xl' />}
        />
        <HeaderLogo logoImgSrc={LarchLogo} logoHref='/' />
      </HeaderLogoContainer>
      <HeaderNavContainer>
        <Button
          className='bg-larch-dark_2 text-white border-[3px] border-dark-700'
          variant='outline'
          iconRight={<IconAdd className='text-2xl' />}
          onClick={goToCreateNet}
        >
          Create Network Template
        </Button>
      </HeaderNavContainer>
    </Header>
  );
}

export { HeaderLayout };

//  <nav className='flex items-center h-20 w-360 flex-row  bg-black  box-border gap-176.5 border-b top-0 left-0 divide-solid border-border '>
//       <div className='flex items-left p-0 flex-col gap-2.5 w-64 h-20 border-r box-border border-solid border-r-border flex-none grow-0 order-0 justify-center '>
//         <span className='flex p-0 items-center flex-col gap-2 w-23.25 h-8.25 flex-none grow-0 order-0'>
//           <img src={Logo} alt='' />
//         </span>
//       </div>

//       {checkPath() && (
//       <div className='h-full flex w-full flex-row flex-wrap content-center  items-center pr-6 justify-end gap-4'>
//         <div className='item-center '>
//           <button
//             type='button'
//             onClick={goToCreateNet}
//             className='bg-create-button text-white font-rubik flex  border-2 border-border rounded h-10 px-4 items-center'
//           >
//             <span>Create network template</span>
//             <img className='w-6 h-6' src={IconPlus} alt='' />
//           </button>
//         </div>
//       </div>
//       )}
//     </nav>
