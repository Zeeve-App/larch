/* eslint-disable max-len */
import { useLocation, useNavigate } from 'react-router-dom';
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
        {
          checkPath() && (
          <Button
            className='bg-larch-dark_3 text-white border-[3px] border-dark-700'
            variant='outline'
            iconRight={<IconAdd className='text-2xl' />}
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
