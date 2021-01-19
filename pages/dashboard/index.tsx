import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import RightBar from "../../components/right-bar/right-bar.component";
import getDate from "../../utils/getDate";
import AddButton from "../../components/add-button/add-button.component";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth.provider";
import CreateProjectModal from "components/create-project-modal/create-project-modal.component";
import ProjectsPreview from "components/projects-preview/projects-preview.component";

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const [createProjectIsHidden, setCreateProjectIsHidden] = useState(true);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user.uid && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLoading, router, user]);

  return (
    <div className="bg-gray-200 flex justify-between min-h-screen overflow-y-hidden">
      <SideBar />
      <div className="block w-24"></div>
      <div className="p-8 px-12 w-full">
        <div className="text-md text-gray-500 mb-3">{getDate()}</div>
        <div className="mb-8 flex justify-between">
          <h2 className="text-3xl font-bold">Good Morning, {user.name}!</h2>
          <div>
            <AddButton onClick={() => setCreateProjectIsHidden(false)} />
            <CreateProjectModal
              isHidden={createProjectIsHidden}
              setIsHidden={setCreateProjectIsHidden}
            />
          </div>
        </div>
        <div className="p-10 h-full max-h-4/5 overflow-auto bg-white rounded-xl w-full break-all pb-20">
          <ProjectsPreview />
        </div>
      </div>
      <div className="block w-96 ml-10"></div>
      <RightBar />
    </div>
  );
}
