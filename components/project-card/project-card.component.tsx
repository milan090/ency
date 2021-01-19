import React from "react";
import { MoreVertical } from "react-feather";
import CustomButton from "../custom-button/custom-button.component";

interface Props {
  name: string;
  description?: string;
  lastUpdated: Date;
}

const ProjectCard: React.FC<Props> = ({ name, description, lastUpdated, ...props }) => {
  return (
    <div
      className="border-primary rounded-lg border-l-8 p-3 px-4 bg-gray-200 h-52 group hover:shadow-xl transition-shadow duration-150"
      {...props}
    >
      <div className="block">
        <div className="font-bold text-xl">{name}</div>
        <div className="text-md text-gray-500">{description}</div>
        <p className="text-gray-500">Last Updated: {lastUpdated.toLocaleDateString()}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out mt-24">
        <div className="flex items-center justify-between">
          <CustomButton className="float-right text-sm">Continue</CustomButton>
          <MoreVertical className="float-right cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
