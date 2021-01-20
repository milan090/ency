import CustomButton from "components/custom-button/custom-button.component";
import ModalContainer from "components/modal-container/modal-container.component";
import axios from "axios";
import React from "react";
import { auth } from "config/firebase";

type Props = {
  id: string;
  name: string; // Projects name
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

const DeleteProjectModal: React.FC<Props> = ({ isHidden, setIsHidden, name, id: projectId }) => {
  const handleDeleteConfirm = async (): Promise<void> => {
    const userIdToken = await auth.currentUser?.getIdToken();
    try {
      const res = await axios.post(
        "/api/project/delete",
        {
          projectId: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${userIdToken}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data);
        setIsHidden(true);
      } else {
        alert("Oops something went wrong");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ModalContainer
      isHidden={isHidden}
      setIsHidden={setIsHidden}
      title={`Confirm Delete Project "${name}"?`}
    >
      <div className="w-96">
        <div className="flex justify-center mt-10">
          {/* purge-css: text-white bg-blue-500 border-blue-500 hover:text-blue-500 */}
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
