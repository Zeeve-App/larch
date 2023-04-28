/* eslint-disable max-len */
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button';
import {
  Header,
  HeaderNavContainer,
  HeaderLogo,
  HeaderLogoContainer,
  HeaderMenuButton,
} from 'src/components/Header';
import { ReactComponent as IconAdd } from 'src/assets/Add.svg'
import { ReactComponent as IconMenu } from 'src/assets/Menu.svg'
import LarchLogo from 'src/assets/Logo.svg';

import { useTemplateIdStore } from 'src/store/createNetworkStore';
import { useSidebarStore } from 'src/store/SidebarStore'


function HeaderLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const setTemplateId = useTemplateIdStore((store) => store.setTemplateId);

  const { setSidebar } = useSidebarStore()

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
          onClick={() => setSidebar(true)}
        />
        <HeaderLogo logoImgSrc={LarchLogo} logoHref='/' />
      </HeaderLogoContainer>
      <HeaderNavContainer>
        {
          checkPath() && (
            <Button
              className='text-xs md:text-base bg-larch-dark_3 text-white border-[3px] border-dark-700'
              variant='outline'
              iconRight={<IconAdd className='w-[1rem] h-[1rem] md:w-6 md:h-6' />}
              onClick={goToCreateNet}
            >
              Create Network Template
            </Button>
          )
        }

      </HeaderNavContainer>
    </Header>
  );
}

export default HeaderLayout;
