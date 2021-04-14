import { ModalContainer } from "components/modal-container/modal-container.components";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation } from "react-query";
import { axios } from "config/axios";
import { randomColor } from "utils/string-to-hex-color";

type Props = {
  onClose: () => void;
};

export const CreateProject: React.FC<Props> = ({ onClose }) => {
  const [showStartWithEncyModal, setShowStartWithEncyModal] = useState(false);

  const startFromScratch = useMutation(() =>
    axios.post("/projects", { title: "Untitled", color: randomColor() })
  );

  const onStartWithEncyModalClose = useCallback(() => {
    setShowStartWithEncyModal(true);
  }, []);

  useEffect(() => {
    if (startFromScratch.isSuccess) {
      onClose();
    }
  }, [startFromScratch.isSuccess, onClose]);

  return (
    <>
      <div className="max-w-xl w-max">
        <div className="grid grid-cols-2 gap-x-6 mb-6">
          {/* Start from Scratch Card */}
          <button
            className={`p-4 pb-6 shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-150 ${
              startFromScratch.isLoading && "animate-pulse"
            }`}
            onClick={() => startFromScratch.mutate()}
          >
            <img src="/images/create-project/start-from-scratch.svg" alt="scratch illustration" />
            <h4 className="font-raleway font-semibold mt-4 mb-2">Start from Scratch</h4>
            <p className="font-light text-sm">
              Start with a clean workspace and work your way towards finishing your project.
            </p>
          </button>
          {/* Start with Ency Card */}
          <div className="p-4 pb-6 shadow-md hover:shadow-lg transition-shadow duration-150 cursor-pointer">
            <img src="/images/create-project/start-wtih-ency.svg" alt="" />
            <div className="flex items-center mt-4 mb-2">
              <h4 className="pr-1.5 font-raleway font-semibold">Start with</h4>
              <Image
                src="/images/logo.svg"
                alt="start with ency illustration"
                width="65"
                height="20"
                className="px-1 block"
              />
            </div>
            <p className="font-light text-sm">
              Feeling lazy? Ency will help you give a headstart by using her powerful Summariser
              Tool.
            </p>
          </div>
        </div>
        <div className="w-full flex">
          <button className="font-raleway mx-auto border-gray-400 border rounded-base w-full py-2 hover:border-gray-700 transition-colors duration-150 text-center ">
            Or, start by duplicating another project from the{" "}
            <span className="font-semibold">Community</span>
          </button>
        </div>
      </div>
      <ModalContainer
        show={showStartWithEncyModal}
        onClose={onStartWithEncyModalClose}
        title="Start with Ency"
      >
        <StartWithEncy />
      </ModalContainer>
    </>
  );
};

const StartWithEncy: React.FC = () => {
  return (
    <div>
      <p>
        Have an article you found out for your project, but lazy to summarize it? Well Ency is here
        to help you
      </p>
    </div>
  );
};
