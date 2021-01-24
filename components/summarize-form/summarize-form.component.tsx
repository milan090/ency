import CustomButton from "components/custom-button/custom-button.component";
import CustomInput from "components/custom-input/custom-input.component";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SummarizeMode } from "types/summarise.types";

type Props = {
  handleFormSubmission: (mode: SummarizeMode, value?: string) => void;
};

type URLForm = {
  url: string;
};

const SummarizeForm: React.FC<Props> = ({ handleFormSubmission }) => {
  const [mode, setMode] = useState<SummarizeMode>();
  const [value, setValue] = useState("");
  const { register, errors, handleSubmit } = useForm<URLForm>();

  if (!mode) {
    return (
      <div className="pt-3 pb-5">
        <CustomButton
          onClick={() => {
            setMode("url");
          }}
          className="mr-5 w-36"
        >
          URL/Article
        </CustomButton>
        <CustomButton
          onClick={() => {
            setMode("text");
          }}
          className="w-36"
        >
          Text
        </CustomButton>
      </div>
    );
  } else if (mode === "text") {
    return (
      <div className="flex flex-col justify-center items-center px-5 pb-4">
        <div className="mb-5">
          <textarea
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste or write your text here"
            className="outline-none border-gray-300 focus:border-gray-400 border rounded-sm px-2 py-2 resize-none"
            rows={10}
            cols={35}
          />
        </div>
        <CustomButton onClick={() => handleFormSubmission("text", value)} className="w-48">
          Summarise Text
        </CustomButton>
      </div>
    );
  } else if (mode === "url") {
    return (
      <div>
        <CustomInput
          label="URL"
          placeHolder="Enter URL"
          name="url"
          type="text"
          error={errors.url?.message}
          fref={register({
            required: "This field is required",
          })}
        />
        <CustomButton
          onClick={handleSubmit((data) => {
            handleFormSubmission(mode, data.url);
          })}
        >
          Summarise Webpage
        </CustomButton>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

export default SummarizeForm;
