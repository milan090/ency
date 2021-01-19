import React from "react";
import CustomInput from "components/custom-input/custom-input.component";
import ModalContainer from "components/modal-container/modal-container.component";
import CustomButton from "components/custom-button/custom-button.component";
import { useForm } from "react-hook-form";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import firebase from "firebase";

type Props = {
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

type CreateProjectFormInputs = {
  name: string;
};

const CreateProjectModal: React.FC<Props> = ({ isHidden, setIsHidden }) => {
  const { register, handleSubmit, errors } = useForm<CreateProjectFormInputs>();
  const { user } = useAuth();

  const onSubmit = (data: CreateProjectFormInputs): void => {
    if (!user.uid) return alert("Oops somethign went wrong! Try again in few minutes");
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .collection("projects")
      .doc()
      .set({
        name: data.name,
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        setIsHidden(true);
      })
      .catch((error) => {
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
          />
          <CustomButton className="float-right mt-3" onClick={handleSubmit(onSubmit)}>
            Create
          </CustomButton>
        </form>
      </ModalContainer>
    </div>
  );
};

export default CreateProjectModal;
