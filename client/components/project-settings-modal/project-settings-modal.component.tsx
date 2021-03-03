import CustomButton from "components/custom-button/custom-button.component";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";
import ModalContainer from "components/modal-container/modal-container.component";
import { useProject } from "hooks/useProject";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectPreview } from "types/project,types";

type Props = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
};

type Form = {
  description: string;
};

const ProjectSettingsModal: React.FC<Props> = ({ isHidden, setIsHidden }) => {
  const { register, handleSubmit, errors } = useForm<Form>();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [project, setProject] = useState<ProjectPreview>();
  const { projectRef } = useProject();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: Form): void => {
    setIsLoading(true);
    projectRef
      ?.update({
        description: formData.description,
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    projectRef?.get().then((res) => {
      const data = res.data() as any;
      const projectData: ProjectPreview = {
        id: projectRef.id,
        lastUpdated: data.lastUpdated,
        name: data.name,
        description: data.description,
      };
      setProject(projectData);
      if (projectData.description) setDescriptionLength(projectData.description?.length);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <ModalContainer title="Project Settings" isHidden={isHidden} setIsHidden={setIsHidden}>
      <div className="mb-6 mr-10">
        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-gray-400 px-2 py-1 mt-3 outline-none resize-none"
            placeholder="Enter a value"
            cols={30}
            rows={4}
            ref={register({
              required: "This field is required",
              maxLength: {
                value: 50,
                message: "Description cannot be longer than 50 characters",
              },
            })}
            defaultValue={project?.description}
            onChange={(e) => setDescriptionLength(e.currentTarget.value.length)}
          ></textarea>
          <div>
            <p
              className={`text-sm ${
                errors.description?.type === "maxLength" ? "text-red-500" : "text-gray-500"
              } float-right`}
            >
              {descriptionLength}/50
            </p>
            <p className="text-red-500 text-xs h-5">{errors.description?.message}</p>
          </div>
        </div>
        <CustomButton onClick={handleSubmit(onSubmit)}>
          {isLoading ? (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            "Save"
          )}
        </CustomButton>
      </div>
    </ModalContainer>
  );
};

export default ProjectSettingsModal;
