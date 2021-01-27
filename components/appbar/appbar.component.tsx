import React, { useState } from "react";
import Link from "next/link";
import { Home, LogOut, Search, Settings } from "react-feather";
import { useAuth } from "hooks/useAuth.provider";
import { useProject } from "hooks/useProject";
import ProjectSettingsModal from "components/project-settings-modal/project-settings-modal.component";

const AppBar: React.FC = () => {
  const { signOut } = useAuth();
  const { projectRef } = useProject();
  const [projectSettingsIsHidden, setIsProjectSettingsHIdden] = useState(true);
  return (
    <div className="w-24">
      <div className="left-0 h-screen px-2 py-2 bg-white shadow-lg block">
        <Link href="/">
          <img src="/brand-logo.svg" width="70" alt="" className="cursor-pointer" />
        </Link>
        <div className="flex flex-col h-full pb-20 pt-10 justify-between">
          <div className="flex flex-col space-y-10">
            <Link href="/dashboard">
              <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full flex justify-center items-center hover:shadow-xl w-12 h-12 mx-auto">
                <Home size="30" />
              </div>
            </Link>
            <Link href="/dashboard/summarize">
              <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full  flex justify-center items-center hover:shadow-xl w-12 h-12 mx-auto">
                <Search size="30" className="mx-auto" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col space-y-10">
            {projectRef && (
              <button
                className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto outline-none focus:outline-none"
                onClick={() => setIsProjectSettingsHIdden(false)}
              >
                <Settings size="30" className="mx-auto" />
              </button>
            )}
            <button
              className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto outline-none focus:outline-none"
              onClick={signOut}
            >
              <LogOut size="30" className="mx-auto" />
            </button>
          </div>
        </div>
        <ProjectSettingsModal
          isHidden={projectSettingsIsHidden}
          setIsHidden={setIsProjectSettingsHIdden}
        />
      </div>
    </div>
  );
};

export default AppBar;
