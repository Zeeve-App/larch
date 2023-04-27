/* eslint-disable max-len */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ZeeveIcon from 'public/assets/svg/zeeve_icon.svg';
import { IconElement3 } from 'zeeve-icons/Grid/Linear';
import {
  IconActivity,
  IconMyNetwork,
  IconTemplate,
  IconUserEdit,
} from 'zeeve-icons/Larch/Linear';
import { IconSetting2 } from 'zeeve-icons/Settings/Linear';
import { IconBook2 } from 'zeeve-icons/School/Linear';
import { IconCall } from 'zeeve-icons/Call/Linear';
import LarchLogo from 'public/assets/svg/logo.svg';
import { SidebarSection } from 'src/components/zeeve-platform/Sidebar/SidebarSection';
import { SidebarItem } from 'src/components/zeeve-platform/Sidebar/SidebarItem';
import { SidebarItemList } from 'src/components/zeeve-platform/Sidebar/SidebarItemList';
import { SidebarSectionTitle } from 'src/components/zeeve-platform/Sidebar/SidebarSectionTitle';
import { Sidebar } from 'src/components/zeeve-platform/Sidebar/Sidebar';
import { SidebarDivider } from 'src/components/zeeve-platform/Sidebar/SidebarDivider';
import { SidebarLogo } from 'src/components/zeeve-platform/Sidebar/SidebarLogo';

interface Item {
  icon: React.ReactElement;
  title: string;
  path: string;
  badge?: React.ReactElement;
  children?: Item[];
}

const mainMenuitems: Item[] = [
  {
    title: 'Dashboard',
    icon: (
      <IconElement3
        className='text-2xl'
        aria-label='Dashboard navigation link logo'
      />
    ),
    path: '/dashboard',
  },
  {
    title: 'My Network',
    icon: (
      <IconMyNetwork
        className='text-2xl'
        aria-label='My network navigation link logo'
      />
    ),
    path: '/network',
  },
  {
    title: 'Template',
    icon: (
      <IconTemplate
        className='text-2xl'
        aria-label='Template navigation link logo'
      />
    ),
    path: '/template',
  },
  {
    title: 'Run List',
    icon: (
      <IconUserEdit
        className='text-2xl'
        aria-label='Run list navigation link logo'
      />
    ),
    path: '/run-list',
  },
  {
    title: 'Activity',
    icon: (
      <IconActivity
        className='text-2xl'
        aria-label='Activity navigation link logo'
      />
    ),
    path: '/activity',
  },
];

const Othersitems: Item[] = [
  {
    title: 'Setting',
    icon: (
      <IconSetting2
        className='text-2xl'
        aria-label='Setting navigation link logo'
      />
    ),
    path: '/setting',
  },
  {
    title: 'Documentation',
    icon: (
      <IconBook2
        className='text-2xl'
        aria-label='Documentation navigation link logo'
      />
    ),
    path: '/documentation',
  },
];

const Contact: Item = {
  title: 'Email Us',
  // Todo: replace call icon with mail icon
  icon: (
    <IconCall className='text-2xl' aria-label='Contact Email link logo' />
  ),
  path: '/contact',
};

function SidebarLayout() {
  const location = useLocation();
  const parentPathname = `/${location.pathname.split('/').at(1)}`;

  return (
    <Sidebar className='bg-larch-dark'>
      <div className='flex-grow'>
        <SidebarLogo href='/' src={LarchLogo} />
        <SidebarSection>
          <SidebarSectionTitle title='Main Menu' />
          <SidebarItemList>
            {mainMenuitems.length
              && mainMenuitems.map((item) => (
                <SidebarItem
                  as={NavLink}
                  key={item.title}
                  iconLeft={item.icon}
                  title={item.title}
                  to={item.path}
                  badge={item.badge}
                  active={
                    parentPathname === item.path
                    || (item.path === '/dashboard' && parentPathname === '/')
                  }
                />
              ))}
          </SidebarItemList>
        </SidebarSection>
        <SidebarDivider />
        <SidebarSection>
          <SidebarSectionTitle title='Buy Services' />
          <SidebarItemList>
            {Othersitems.length
              && Othersitems.map((item) => (
                <SidebarItem
                  as={NavLink}
                  key={item.title}
                  iconLeft={item.icon}
                  title={item.title}
                  to={item.path}
                  badge={item.badge}
                  active={parentPathname === item.path}
                />
              ))}
          </SidebarItemList>
        </SidebarSection>
        <SidebarDivider />
        <SidebarSection>
          <SidebarSectionTitle title='Contact' />
          <SidebarItemList>
            <SidebarItem
              as='a'
              iconLeft={Contact.icon}
              title={Contact.title}
              href='mailto:support@zeeve.io'
              badge={Contact.badge}
              active={location.pathname === Contact.path}
            />
          </SidebarItemList>
        </SidebarSection>
      </div>
      <div className='flex-grow-0 m-4'>
        <h5 className='my-1'>
          <a
            href='https://www.zeeve.io/'
            className='flex flex-grow-0'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={ZeeveIcon}
              width={16}
              height={16}
              className='me-2'
              alt='Zeeve Inc. Icon'
            />
            Zeeve Inc.
          </a>
        </h5>
        <div className='flex justify-between my-1'>
          <h5 className='font-bold'>Version :</h5>
          <h5 className='font-semibold'>1.0.0</h5>
          {/* Todo: Version will be fetched from the global state */}
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarLayout;
