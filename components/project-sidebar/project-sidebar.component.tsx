import ActivitiesSection from "components/activities-section/activities-section.component";
import React from "react";

const ProjectSidebar: React.FC = () => {
  return (
    <div className="bg-white w-4/12 pt-5 px-6">
      <div>
        <ActivitiesSection />
      </div>
    </div>
  );
};

export default ProjectSidebar;
