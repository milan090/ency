import ActivitiesSection from "components/activities-section/activities-section.component";
import Chat from "components/chat/chat.component";
import React from "react";

const ProjectSidebar: React.FC = () => {
  return (
    <div className="bg-white w-4/12">
      <div className="flex flex-col justify-between h-screen">
        <ActivitiesSection />

        <Chat />
      </div>
    </div>
  );
};

export default ProjectSidebar;
