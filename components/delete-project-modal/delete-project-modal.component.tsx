import CustomButton from "components/custom-button/custom-button.component";
import ModalContainer from "components/modal-container/modal-container.component";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import React from "react";

type Props = {
  id: string;
  name: string; // Projects name
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

const DeleteProjectModal: React.FC<Props> = ({ isHidden, setIsHidden, name, id: projectId }) => {
  const { user } = useAuth();
  const handleDeleteConfirm = (): void => {
    const userRef = db.collection("users").doc(user.uid);
    const projectRef = userRef.collection("projects").doc(projectId);

    projectRef
      .delete()
      .then(() => {
        setIsHidden(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ModalContainer
      isHidden={isHidden}
      setIsHidden={setIsHidden}
      title={`Confirm Delete Project "${name}"?`}
    >
      <div className="w-96">
        <div className="flex justify-center mt-10">
          {/* purge-css: text-white bg-red-500 border-red-500 hover:text-red-500 */}
          <CustomButton
            color="white"
            bgColor="blue-500"
            borderColor="blue-500"
            transitionColor="blue-500"
            className="float-right mr-5"
            onClick={() => setIsHidden(true)}
          >
            Cancel
          </CustomButton>
          {/* purge-css: text-white bg-red-500 border-red-500 hover:text-red-500 */}
          <CustomButton
            color="white"
            bgColor="red-500"
            borderColor="red-500"
            transitionColor="red-500"
            className="float-right"
            onClick={handleDeleteConfirm}
          >
            Delete
          </CustomButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteProjectModal;
