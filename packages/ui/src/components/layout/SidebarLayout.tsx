/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as IconActivity } from "src/assets/Activity.svg";
import { ReactComponent as IconDashboard } from "src/assets/Dashboard.svg";
import { ReactComponent as IconDocumentation } from "src/assets/Documentation.svg";
import { ReactComponent as IconEmail } from "src/assets/Email.svg";
import { ReactComponent as IconMyNetwork } from "src/assets/MyNetwork.svg";
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
import { ReactComponent as IconGitHub } from "src/assets/Github.svg";
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
        className="w-7 h-7"
        aria-label="Dashboard navigation link logo"
      />
    ),
    path: "/dashboard",
  },
  {
    title: "My Network",
    icon: (
      <IconMyNetwork
        className="w-7 h-7"
        aria-label="My network navigation link logo"
      />
    ),
    path: "/network",
  },
  {
    title: "Templates",
    icon: (
      <IconTemplate
        className="w-7 h-7"
        aria-label="Templates navigation link logo"
      />
    ),
    path: "/templates",
  },
  {
    title: "Executions",
    icon: (
      <IconUserEditor
        className="w-7 h-7"
        aria-label="Executions navigation link logo"
      />
    ),
    path: "/executions",
  },
  {
    title: "Activity",
    icon: (
      <IconActivity
        className="w-7 h-7"
        aria-label="Activity navigation link logo"
      />
    ),
    path: "/activity",
  },
];

const Othersitems: Item[] = [
  {
    title: "Documentation",
    icon: (
      <IconDocumentation
        className="w-7 h-7"
        aria-label="Documentation navigation link logo"
      />
    ),
    path: "/documentation",
  },
];

const Contactitems: Item[] = [
  {
    title: "Email Us",
    // Todo: replace call icon with mail icon
    icon: (
      <IconEmail className="w-7 h-7" aria-label="Contact Email link logo" />
    ),
    path: "mailto:support@zeeve.io",
  },
  {
    title: "Github",
    // Todo: replace call icon with mail icon
    icon: <IconGitHub className="w-7 h-7" aria-label="Github logo" />,
    path: "https://github.com/Zeeve-App/larch",
  },
];

function SidebarLayout() {
  const location = useLocation();
  const parentPathname = `/${location.pathname.split("/").at(1)}`;

  const { isOpen, setSidebar } = useSidebarStore();

  const [versions, setVersions] = useState<{
    larch: string;
    zombienet: string;
  }>({
    larch: "NA",
    zombienet: "NA",
  });

  useEffect(() => {
    getLarchVersionInfo()
      .then(({ result }) => {
        setVersions({
          larch: result.larchVersion,
          zombienet: result.zombienetVersion,
        });
      })
      .catch(() => {
        setVersions({ larch: "NA", zombienet: "NA" });
      });
  }, [location]); // remove location from dependency list to avoid calling api every time.

  return (
    <section
      className={` ${
        isOpen ? "w-screen md:w-fit" : "w-fit"
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
                    className="py-8"
                    active={
                      parentPathname === item.path || parentPathname === "/"
                    }
                  />
                ))}
            </SidebarItemList>
          </SidebarSection>
          <SidebarDivider />
          <SidebarSection>
            <SidebarSectionTitle title="General" />
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
            <SidebarSectionTitle title="Social" />
            <SidebarItemList>
              {Contactitems.length &&
                Contactitems.map((item) => (
                  <SidebarItem
                    as={"a"}
                    key={item.title}
                    iconLeft={item.icon}
                    title={item.title}
                    target="_blank"
                    href={item.path}
                    badge={item.badge}
                    active={parentPathname === item.path}
                  />
                ))}
            </SidebarItemList>
          </SidebarSection>
        </div>
        <div className="flex justify-center items-start flex-col flex-grow-0 p-5 border-t-2 border-dark-700">
          <div className="flex gap-2">
            <h5 className="font-bold">Larch : </h5>
            <h5 className="font-semibold">{versions.larch}</h5>
          </div>
          <div className="flex gap-2">
            <h5 className="font-bold">Zombienet : </h5>
            <h5 className="font-semibold">{versions.zombienet}</h5>
          </div>
        </div>
      </Sidebar>
    </section>
  );
}

export default SidebarLayout;
