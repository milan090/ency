import React, { useEffect, useState } from "react";
import CustomInput from "components/custom-input/custom-input.component";
import ModalContainer from "components/modal-container/modal-container.component";
import CustomButton from "components/custom-button/custom-button.component";
import { useForm } from "react-hook-form";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";

type Props = {
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

type CreateProjectFormInputs = {
  name: string;
};

const CreateProjectModal: React.FC<Props> = ({ isHidden, setIsHidden }) => {
  const { register, handleSubmit, errors } = useForm<CreateProjectFormInputs>();
  const [isCreating, setIsCreating] = useState(false);
  const [AITipsEnabled, setAITipsEnabled] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(AITipsEnabled);
  }, [AITipsEnabled]);

  const onSubmit = (data: CreateProjectFormInputs): void => {
    if (!user.uid) return alert("Oops somethign went wrong! Try again in few minutes");
    if (isCreating) return;
    setIsCreating(true);
    const userRef = db.collection("users").doc(user.uid);
    const projectRef = userRef.collection("projects").doc();
    projectRef
      .set({
        name: data.name,
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        router.push(`/dashboard/project/${projectRef.id}`);
      })
      .catch((error) => {
        setIsCreating(true);
        console.log(error);
      });
  };
  return (
    <div>
      <ModalContainer isHidden={isHidden} setIsHidden={setIsHidden} title="Create New Project">
        <form noValidate>
          <CustomInput
            fref={register({
              required: "This field is required",
            })}
            error={errors.name?.message}
            label="Project Name"
            name="name"
            placeHolder="Enter Project Name"
            type="text"
            textSize="base"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <div>
            <input
              type="checkbox"
              id="aiTips"
              className="mr-2 cursor-pointer"
              defaultChecked
              onChange={(e) => setAITipsEnabled(e.target.checked)}
            />
            <label htmlFor="aiTips">Suggest </label>
          </div>
          <CustomButton className="float-right mt-3" onClick={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default CreateProjectModal;
