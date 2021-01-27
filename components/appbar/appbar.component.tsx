import React, { useState } from "react";
import Link from "next/link";
import { Download, Home, LogOut, Search, Settings } from "react-feather";
import { useAuth } from "hooks/useAuth.provider";
import { useProject } from "hooks/useProject";
import ProjectSettingsModal from "components/project-settings-modal/project-settings-modal.component";
import axios from "axios";
import FileDownload from "js-file-download";
import { ProjectPreviewDoc } from "types/project,types";
import { auth } from "config/firebase";

const AppBar: React.FC = () => {
  const { signOut } = useAuth();
  const { projectRef } = useProject();
  const [projectSettingsIsHidden, setIsProjectSettingsHIdden] = useState(true);

  const handleDownloadClick = async (): Promise<void> => {
    const userIdToken = await auth.currentUser?.getIdToken();

    const file = await axios.post(
      "/api/project/export/text",
      {
        projectId: projectRef?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${userIdToken}`,
        },
        responseType: "blob",
      }
    );
    const projectData: ProjectPreviewDoc = ((await projectRef?.get()) as any).data();
    FileDownload(file.data as Blob, `${projectData?.name}.txt`);
  };

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
                <Home size="30" className="tooltip  w-full h-full px-2" />
                <span className="tooltiptext">Dashboard</span>
              </div>
            </Link>
            <Link href="/dashboard/summarize">
              <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full  flex justify-center items-center hover:shadow-xl w-12 h-12 mx-auto">
                <Search size="30" className="tooltip w-full h-full px-2" />
                <span className="tooltiptext">Summarise Text/Articles</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col space-y-10">
            {projectRef && (
              <div>
                <button
                  className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto outline-none focus:outline-none tooltip"
                  onClick={handleDownloadClick}
                >
                  <Download size="30" className="mx-auto" />
                </button>
                <span className="tooltiptext">Export</span>
              </div>
            )}
            {projectRef && (
              <div>
                <button
                  className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto outline-none focus:outline-none tooltip"
                  onClick={() => setIsProjectSettingsHIdden(false)}
                >
                  <Settings size="30" className="mx-auto" />
                </button>
                <span className="tooltiptext">Project Settings</span>
              </div>
            )}
            <div>
              <button
                className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto outline-none focus:outline-none tooltip"
                onClick={signOut}
              >
                <LogOut size="30" className="mx-auto" />
              </button>
              <span className="tooltiptext">Logout</span>
            </div>
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
