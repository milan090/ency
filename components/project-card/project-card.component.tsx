import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import CustomButton from "../custom-button/custom-button.component";
import { Transition } from "@tailwindui/react";
import DeleteProjectModal from "components/delete-project-modal/delete-project-modal.component";
import Dropdown from "components/dropdown/dropdown.component";

interface Props {
  id: string;
  name: string;
  description?: string;
  lastUpdated: Date;
}

const ProjectCard: React.FC<Props> = ({ name, description, lastUpdated, id, ...props }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown
  const [deleteProjectModalIsHidden, setDeleteProjectModalIsHidden] = useState(true);
  const container = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!isOpen) return;
      if (!(container.current as any).contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, container]);

  return (
    <div
      className={`border-primary rounded-lg border-l-8 p-3 px-4 bg-gray-200 h-52 w-52 group hover:shadow-xl transition-shadow duration-150 flex flex-col justify-between  ${
        isOpen && "shadow-xl"
      }`}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div>
          <h4 className="font-bold text-xl break-normal">{name}</h4>
          <p className="text-sm text-gray-700 break-normal">{description}</p>
        </div>
        <p className="text-gray-500 text-xs">
          Last Updated: {lastUpdated.toLocaleDateString().replace(/\//g, "-")}
        </p>
      </div>
      <div
        className={`${
          !isOpen && "hidden"
        } group-hover:block group-focus:block transition-opacity duration-200 ease-out`}
      >
        <div className="flex items-center justify-between">
          <Link href={`dashboard/project/${id}`}>
            <span>
              <CustomButton className="float-right text-sm">Coninue</CustomButton>
            </span>
          </Link>

          <div className={`inline-block relative`} ref={container}>
            <button className={`focus:outline-none outline-none`} onClick={() => setIsOpen(true)}>
              <MoreVertical className="float-right cursor-pointer mt-1" />
            </button>
            {/* Dropdown */}
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Dropdown show={true} className="w-40">
                <li className="cursor-pointer">
                  <span className="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                    Share
                  </span>
                </li>
                <li className="border-b border-gray-200 cursor-pointer">
                  <span className="text-black hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                    Edit
                  </span>
                </li>
                <li className="cursor-pointer">
                  <button
                    className="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap w-full text-left outline-none focus:outline-none focus:bg-gray-300"
                    onClick={() => setDeleteProjectModalIsHidden(false)}
                  >
                    Delete
                  </button>
                </li>
              </Dropdown>
            </Transition>
            <div>
              <DeleteProjectModal
                isHidden={deleteProjectModalIsHidden}
                setIsHidden={setDeleteProjectModalIsHidden}
                name={name}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
