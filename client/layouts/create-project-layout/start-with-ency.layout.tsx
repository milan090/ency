import React, { useState } from "react";
import { useForm } from "react-hook-form";

type StartWithEncyStep = "ONE" | "TWO";

interface Form {
  url?: string;
  title?: string;
}

export const StartWithEncy: React.FC = () => {
  const [step, setStep] = useState<StartWithEncyStep>("ONE");
  const { register, handleSubmit } = useForm<Form>();

  const handleURLSubmit = handleSubmit((data: Form): void => {
    const { url } = data;
    console.log(url);
    setStep("TWO");
  });

  switch (step) {
    case "ONE":
      return (
        <div className="max-w-sm flex flex-col">
          <img
            src="/images/create-project/start-with-ency-modal.svg"
            alt="Start with ency illustration"
            className="mb-4"
          />
          <p className="font-light text-sm">
            Have an article you found out for your project, but lazy to summarize it? Well Ency is
            here to help you
          </p>
          <div className="my-3 w-full flex">
            <input
              type="text"
              placeholder="Enter URL of article"
              name="url"
              ref={register()}
              className="text-sm pl-4 py-2 border rounded-l-full border-gray-400 flex-auto transition-colors duration-300 hover:border-gray-500"
            />
            <button
              className="bg-blue-400 text-white px-5 rounded-r-full hover:bg-blue-500 transition-colors duration-300 border border-blue-400 text-sm"
              onClick={handleURLSubmit}
            >
              Next
            </button>
          </div>
          <div className="flex items-center">
            <div className="border border-gray-300 flex-auto" />
            <p className="bg-white px-4">OR</p>
            <div className="border border-gray-300 flex-auto" />
          </div>
          <div className="my-3 w-full flex">
            <input
              type="text"
              placeholder="Enter Project Title and let Ency help you"
              name="title"
              ref={register()}
              className="text-sm pl-4 py-2 border rounded-l-full border-gray-400 flex-auto transition-colors duration-300 hover:border-gray-500"
            />
            <button
              className="bg-blue-400 text-white px-5 rounded-r-full hover:bg-blue-500 transition-colors duration-300 border border-blue-400 text-sm"
              onClick={handleURLSubmit}
            >
              Next
            </button>
          </div>
        </div>
      );

    case "TWO":
      return (
        <div className="max-w-sm">
          <p>What’s the prefered word limit of your summarised project:</p>
          <input type="range" />
          <button>Next</button>
        </div>
      );
  }
};
