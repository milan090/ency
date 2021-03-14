import React from "react";
import { Search } from "react-feather";
import { ProjectPreview, ProjectTag } from "types/project.types";

import styles from "./dashboard-home.styles.module.css";

import Image from "next/image";

export const DashboardHome: React.FC = () => {
  return (
    <main className="bg-gray-100 w-full min-h-screen px-16 pt-12">
      <DashboardNavbar activeTab="all" />
      <ProjectsPreview />
    </main>
  );
};

type TabName = "recent" | "all" | "archived" | "bin";

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
    tabName: "all",
    value: "All Projects",
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

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ activeTab = "all" }) => {
  return (
    <nav className="rounded-full bg-white w-full pl-12 flex items-center overflow-hidden">
      {navLinks.map(({ tabName, value }, i) => (
        <Navlink isActive={tabName === activeTab} value={value} key={i} />
      ))}
      <span className="ml-auto">
        <SearchInput />
      </span>
    </nav>
  );
};

type NavlinkProps = {
  isActive: boolean;
  // tabName: TabName;
  value: string;
};

const Navlink: React.FC<NavlinkProps> = ({ isActive, value }) => {
  return (
    <button
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
const tmpProjects: ProjectCardProps[] = [
  {
    color: "FDF1C7",
    fileCount: 3,
    iconSrc: "/images/tmp/noto_rocket.png",
    tags: [
      {
        value: "school",
        color: "FFE3E3",
      },
      {
        value: "Physics",
        color: "FDF1C7",
      },
    ],
    title: "Rocket Science School Assignment",
  },
  {
    color: "FDF1C7",
    fileCount: 3,
    iconSrc: "/images/tmp/noto_rocket.png",
    tags: [
      {
        value: "school",
        color: "FFE3E3",
      },
      {
        value: "Physics",
        color: "FDF1C7",
      },
    ],
    title: "Rocket Science School Assignment",
  },
  {
    color: "FDF1C7",
    fileCount: 3,
    iconSrc: "/images/tmp/noto_rocket.png",
    tags: [
      {
        value: "school",
        color: "FFE3E3",
      },
      {
        value: "Physics",
        color: "FDF1C7",
      },
    ],
    title: "Rocket Science School Assignment",
  },
  {
    color: "FDF1C7",
    fileCount: 3,
    iconSrc: "/images/tmp/noto_rocket.png",
    tags: [
      {
        value: "school",
        color: "FFE3E3",
      },
      {
        value: "Physics",
        color: "FDF1C7",
      },
    ],
    title: "Rocket Science School Assignment",
  },
];

const ProjectsPreview: React.FC = () => {
  return (
    <div className="transition-all duration-700 grid lg:grid-cols-2 xl:grid-cols-3  grid-flow-row mt-10 gap-x-8 gap-y-5">
      {tmpProjects.map((props, i) => (
        <ProjectCard {...props} key={i} />
      ))}
    </div>
  );
};

type ProjectCardProps = ProjectPreview;

const ProjectCard: React.FC<ProjectCardProps> = ({ title, iconSrc, fileCount, tags, color }) => {
  return (
    <div className="bg-white rounded-base shadow-sm">
      {/* Top Bar */}
      <div
        style={{
          background: `linear-gradient(to bottom, #${color}73 50%, transparent 50%`,
        }}
        className="px-4 pt-4"
      >
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center border-4 border-white"
          style={{ background: "#" + color }}
        >
          <Image src={iconSrc} alt={title} width={45} height={45} />
        </div>
      </div>

      {/* Actual Body */}
      <div className="px-8 pt-4 pb-6">
        <h4 className="font-bold text-xl">{title}</h4>
        {/* Tags */}
        <div className="flex flex-grow mt-6">
          {tags.map((props, i) => (
            <ProjectPreviewTag {...props} key={i} />
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex justify-between items-center">
          <div></div>
          <p className="text-xs">{fileCount} files</p>
        </div>
      </div>
    </div>
  );
};

const ProjectPreviewTag: React.FC<ProjectTag> = ({ color, value }) => {
  return (
    <div className="px-4 py-1 mr-2 rounded-3xl text-sm" style={{ background: `#${color}` }}>
      {value}
    </div>
  );
};
