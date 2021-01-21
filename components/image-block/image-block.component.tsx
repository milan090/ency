import CustomButton from "components/custom-button/custom-button.component";
import React, { useState } from "react";
import { Edit } from "react-feather";
import { ContentBlock } from "types/project,types";

type Props = {
  contentBlock: ContentBlock;
  handleChange: (newValue: string, wait?: boolean) => void;
};

const ImageBlock: React.FC<Props> = ({ contentBlock, handleChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [input, setInput] = useState(contentBlock.value);

  if (isEditMode || !contentBlock.value) {
    return (
      <div className="w-full py-8">
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            defaultValue={contentBlock.value}
            className="outline-none border-2 border-gray-400 mb-5 px-2 py-1 rounded"
            onChange={(e) => setInput(e.target.value)}
          />
          <CustomButton
            onClick={() => {
              handleChange(input, false);
              setIsEditMode(false);
            }}
          >
            Save
          </CustomButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-baseline">
        <div className="w-full flex flex-col items-center justify-center">
          <img src={contentBlock.value} alt="Nothing ig" className="w-7/12 max-w-lg pb-5 pt-5" />
        </div>
        <button onClick={() => setIsEditMode(!isEditMode)} className="float-right mb-5">
          <Edit />
        </button>
      </div>
    );
  }
};

export default ImageBlock;
