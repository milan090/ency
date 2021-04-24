import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import { ProjectPreview } from "types/project.types";
import { useDashboardHomeTabs } from "hooks/dashboard-home.hook";
import OutsideClickHandler from "react-outside-click-handler";

import styles from "./dashboard-home.styles.module.scss";

import Image from "next/image";
import { TabName } from "types/dahboard-home.types";
import { axios } from "config/axios";
import { useQuery } from "react-query";
import { useAuth } from "hooks/auth.hook";
import { hexToSixDigit, stringToBrightHexColor } from "utils/string-to-hex-color";
import { Dropdown, DropdownItem } from "components/dropdown/dropdown.component";

export const DashboardHome: React.FC = () => {
  const { activeTab } = useDashboardHomeTabs();

  return (
    <main className="bg-gray-100 w-full min-h-screen px-16 pt-12">
      <DashboardNavbar activeTab={activeTab} />
      <ProjectsPreview />
    </main>
  );
};

type DashboardNavbarProps = {
  activeTab: TabName;
};

type INavlink = {
  tabName: TabName;
  value: string;
};

const navLinks: INavlink[] = [
  {
    value: "Recent",
    tabName: "recent",
  },
  {
    value: "All Projects",
    tabName: "all",
  },
  {
    value: "Archived",
    tabName: "archived",
  },
  {
    value: "Recycle Bin",
    tabName: "bin",
  },
];

const DashboardNavbar: React.FC<DashboardNavbarProps> = () => {
  return (
    <nav className="rounded-full bg-white w-full pl-12 flex items-center overflow-hidden">
      {navLinks.map(({ tabName, value }, i) => (
        <Navlink tabName={tabName} value={value} key={i} />
      ))}
      <span className="ml-auto">
        <SearchInput />
      </span>
    </nav>
  );
};

type NavlinkProps = {
  tabName: TabName;
  value: string;
};

const Navlink: React.FC<NavlinkProps> = ({ value, tabName }) => {
  const { activeTab, setTabName } = useDashboardHomeTabs();
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={() => setTabName(tabName)}
      className={`py-3.5 mr-10 text-gray-500 border-b-3 border-transparent ${
        isActive && "text-black border-black"
      }`}
    >
      {value}
    </button>
  );
};

const SearchInput: React.FC = () => {
  return (
    <div className={`px-6 py-3.5 flex group ${styles.searchInput}`}>
      <input type="text" className="mr-2" placeholder="Search" />
      <Search />
    </div>
  );
};

// Projects View
const ProjectsPreview: React.FC = () => {
  const { activeTab } = useDashboardHomeTabs();
  const getProjects = async () => {
    const res = await axios.get("/projects");
    return res.data;
  };
  const { user } = useAuth();

  const { data: projects, refetch } = useQuery<ProjectCardProps[]>(
    ["projects", activeTab],
    getProjects,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (user.uid) refetch();
  }, [user, refetch]);

  return (
    <div className="transition-all duration-700 grid lg:grid-cols-2 xl:grid-cols-3  grid-flow-row mt-10 gap-x-8 gap-y-5">
      {projects?.map((props, i) => (
        <ProjectCard {...props} key={i} />
      ))}
    </div>
  );
};

type ProjectCardProps = ProjectPreview;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  iconSrc = "/images/tmp/noto_rocket.png",
  pageCount,
  tags,
  color,
  id,
}) => {
  return (
    <div className="bg-white rounded-base shadow-sm flex flex-col">
      {/* Top Bar */}
      <div
        style={{
          background: `linear-gradient(to bottom, #${hexToSixDigit(
            color.slice(1)
          )}99 50%, transparent 50%`,
        }}
        className="px-4 pt-4 flex-initial flex justify-between items-start"
      >
        {/* Project Icon */}
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center border-4 border-white"
          style={{ background: color }}
        >
          <Image
            src={iconSrc || "/images/tmp/noto_rocket.png"}
            alt={title}
            width={45}
            height={45}
          />
        </div>
        <ProjecCardOptionsButton projectId={id} />
      </div>

      {/* Actual Body */}
      <div className="px-8 pt-4 pb-6 flex flex-col flex-auto">
        <h4 className="font-bold text-xl">{title}</h4>
        {/* Tags */}
        <div className="flex flex-grow mt-6 mb-6">
          {tags.map((tag, i) => (
            <ProjectPreviewTag value={tag} key={i} />
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-auto flex justify-between items-center">
          <div></div>
          <p className="text-xs">{pageCount} files</p>
        </div>
      </div>
    </div>
  );
};

const ProjecCardOptionsButton: React.FC<{ projectId: number }> = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const openDropdown = (): void => {
    setShowDropdown(true);
  };

  const closeDropdown = (): void => {
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button onClick={openDropdown}>
        <ChevronDown size="20" color="#333333" />
      </button>
      {/* Dropdown */}
      {showDropdown && (
        <OutsideClickHandler onOutsideClick={closeDropdown}>
          <Dropdown>
            <DropdownItem>Open Project</DropdownItem>
            <DropdownItem>Edit Details</DropdownItem>
            <DropdownItem>Archive</DropdownItem>
            <DropdownItem>
              <span className="text-red-600">Delete</span>
            </DropdownItem>
          </Dropdown>
        </OutsideClickHandler>
      )}
    </div>
  );
};

const ProjectPreviewTag: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div
      className="px-4 py-1 mr-2 h-7 rounded-3xl text-sm"
      style={{ background: `${stringToBrightHexColor(value)}` }}
    >
      {value}
    </div>
  );
};
