import CustomButton from "components/custom-button/custom-button.component";
import ModalContainer from "components/modal-container/modal-container.component";
import axios from "axios";
import React, { useState } from "react";
import { auth } from "config/firebase";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";

type Props = {
  id: string;
  name: string; // Projects name
  isHidden: boolean;
  setIsHidden: (newState: boolean) => void;
};

const DeleteProjectModal: React.FC<Props> = ({ isHidden, setIsHidden, name, id: projectId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async (): Promise<void> => {
    setIsDeleting(true);

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
        setIsHidden(true);
      } else {
        alert("Oops something went wrong");
      }
    } catch (error) {
      setIsDeleting(false);
      console.error(error.response.data);
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
            className="float-right mr-5 w-24"
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
            className="float-right w-24"
            onClick={handleDeleteConfirm}
          >
            {isDeleting ? (
              <div className="w-full flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              "Delete"
            )}
          </CustomButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteProjectModal;
