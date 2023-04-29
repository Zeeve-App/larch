/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as IconActivity } from "src/assets/Activity.svg";
import { ReactComponent as IconDashboard } from "src/assets/Dashboard.svg";
import { ReactComponent as IconDocumentation } from "src/assets/Documentation.svg";
import { ReactComponent as IconEmail } from "src/assets/Email.svg";
import { ReactComponent as IconMyNetwork } from "src/assets/MyNetwork.svg";
import { ReactComponent as IconSetting } from "src/assets/Setting.svg";
import { ReactComponent as IconTemplate } from "src/assets/Template.svg";
import { ReactComponent as IconUserEditor } from "src/assets/UserEditor.svg";
import LarchLogo from "src/assets/Logo.svg";
import { SidebarSection } from "src/components/Sidebar/SidebarSection";
import { SidebarItem } from "src/components/Sidebar/SidebarItem";
import { SidebarItemList } from "src/components/Sidebar/SidebarItemList";
import { SidebarSectionTitle } from "src/components/Sidebar/SidebarSectionTitle";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { SidebarDivider } from "src/components/Sidebar/SidebarDivider";
import { SidebarLogo } from "src/components/Sidebar/SidebarLogo";

import { getLarchVersionInfo } from "src/utils/api";
import { useSidebarStore } from "src/store/SidebarStore";

interface Item {
  icon: React.ReactElement;
  title: string;
  path: string;
  badge?: React.ReactElement;
  children?: Item[];
}

const mainMenuitems: Item[] = [
  {
    title: "Dashboard",
    icon: (
      <IconDashboard
        className="text-2xl"
        aria-label="Dashboard navigation link logo"
      />
    ),
    path: "/dashboard",
  },
  {
    title: "My Network",
    icon: (
      <IconMyNetwork
        className="text-2xl"
        aria-label="My network navigation link logo"
      />
    ),
    path: "/network",
  },
  {
    title: "Template",
    icon: (
      <IconTemplate
        className="text-2xl"
        aria-label="Template navigation link logo"
      />
    ),
    path: "/template",
  },
  {
    title: "Run List",
    icon: (
      <IconUserEditor
        className="text-2xl"
        aria-label="Run list navigation link logo"
      />
    ),
    path: "/run-list",
  },
  {
    title: "Activity",
    icon: (
      <IconActivity
        className="text-2xl"
        aria-label="Activity navigation link logo"
      />
    ),
    path: "/activity",
  },
];

const Othersitems: Item[] = [
  {
    title: "Setting",
    icon: (
      <IconSetting
        className="text-2xl"
        aria-label="Setting navigation link logo"
      />
    ),
    path: "/setting",
  },
  {
    title: "Documentation",
    icon: (
      <IconDocumentation
        className="text-2xl"
        aria-label="Documentation navigation link logo"
      />
    ),
    path: "/documentation",
  },
];

const Contact: Item = {
  title: "Email Us",
  // Todo: replace call icon with mail icon
  icon: <IconEmail className="text-2xl" aria-label="Contact Email link logo" />,
  path: "/contact",
};

function SidebarLayout() {
  const location = useLocation();
  const parentPathname = `/${location.pathname.split("/").at(1)}`;

  const { isOpen, setSidebar } = useSidebarStore();

  const [larchVersion, setLarchVersion] = useState("NA");

  useEffect(() => {
    getLarchVersionInfo()
      .then(({ result }) => {
        setLarchVersion(result.larchVersion);
      })
      .catch(() => {
        setLarchVersion("NA");
      });
  }, []);

  return (
    <section
      className={` ${isOpen ? "w-screen md:w-fit" : "w-fit"
        } z-sidebar backdrop-blur-sm`}
      onClick={() => setSidebar(false)}
    >
      <Sidebar
        expanded={isOpen}
        toggleExpanded={setSidebar}
        className="bg-larch-dark fixed md:relative border-r overflow-x-hidden border-dark-700 z-sidebar"
      >
        <div className="flex-grow">
          <SidebarLogo href="/" src={LarchLogo} />
          <SidebarSection>
            <SidebarSectionTitle title="Main Menu" />
            <SidebarItemList>
              {mainMenuitems.length &&
                mainMenuitems.map((item) => (
                  <SidebarItem
                    as={NavLink}
                    key={item.title}
                    iconLeft={item.icon}
                    title={item.title}
                    to={item.path}
                    badge={item.badge}
                    active={
                      parentPathname === item.path || parentPathname === "/"
                    }
                  />
                ))}
            </SidebarItemList>
          </SidebarSection>
          <SidebarDivider />
          <SidebarSection>
            <SidebarSectionTitle title="Buy Services" />
            <SidebarItemList>
              {Othersitems.length &&
                Othersitems.map((item) => (
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
            <SidebarSectionTitle title="Contact" />
            <SidebarItemList>
              <SidebarItem
                as="a"
                iconLeft={Contact.icon}
                title={Contact.title}
                href="mailto:support@zeeve.io"
                badge={Contact.badge}
                active={location.pathname === Contact.path}
              />
            </SidebarItemList>
          </SidebarSection>
        </div>
        <div className="flex-grow-0 m-4">
          <div className="flex justify-between my-1">
            <h5 className="font-bold">Version :</h5>
            <h5 className="font-semibold">{larchVersion}</h5>
          </div>
        </div>
      </Sidebar>
    </section>
  );
}

export default SidebarLayout;
