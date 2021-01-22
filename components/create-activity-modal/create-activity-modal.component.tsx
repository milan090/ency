import CustomButton from "components/custom-button/custom-button.component";
import CustomInput from "components/custom-input/custom-input.component";
import ModalContainer from "components/modal-container/modal-container.component";
import { useProject } from "hooks/useProject";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityDoc } from "types/project,types";
import firebase from "firebase/app";
import "firebase/firestore";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";

type Props = {
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

type CreateTodoForm = {
  activityName: string;
};

const CreateActivityModal: React.FC<Props> = ({ isHidden, setIsHidden }) => {
  const { register, errors, handleSubmit } = useForm<CreateTodoForm>();
  const { projectRef } = useProject();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateActivity = (data: CreateTodoForm): void => {
    setIsCreating(true);
    const newActivity: ActivityDoc = {
      name: data.activityName,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      isCompleted: false,
    };
    console.log(newActivity);
    projectRef
      ?.collection("activities")
      .doc()
      .set(newActivity)
      .then(() => {
        setIsCreating(false);
        setIsHidden(true);
      })
      .catch((error) => {
        setIsCreating(false);
        console.log(error);
        alert("Oops something went wrong");
      });
  };

  return (
    <ModalContainer title="New Activity" isHidden={isHidden} setIsHidden={setIsHidden}>
      <form noValidate>
        <CustomInput
          label="Activy Name"
          name="activityName"
          placeHolder="Enter Activity name"
          type="text"
          error={errors.activityName?.message}
          fref={register({
            required: "This field is required",
          })}
        />
        <CustomButton onClick={handleSubmit(handleCreateActivity)} className="mt-5 w-28">
          {isCreating ? (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            "Create"
          )}
        </CustomButton>
      </form>
    </ModalContainer>
  );
};

export default CreateActivityModal;
