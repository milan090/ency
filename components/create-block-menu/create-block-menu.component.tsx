import React from "react";
import { List, Image } from "react-feather";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlockDoc, ContentBlockType } from "types/project,types";

type Props = {
  blocksLength: number;
  projectRef: FirebaseDocRef;
};

const CreateBlockMenu: React.FC<Props> = ({ blocksLength, projectRef }) => {
  const handleCreateContentBlock = (type: ContentBlockType, value?: string): void => {
    const newContentBlock: ContentBlockDoc = {
      index: blocksLength,
      type: type,
      value: value || "",
    };

    const contentBlocksRef = projectRef.collection("contentBlocks");
    contentBlocksRef
      .doc()
      .set(newContentBlock)
      .then(() => {
        console.log("New Block Created");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="my-10 flex items-center">
      <button
        className="bg-white px-2 py-0.5 border-r-2 border-gray-300 h-8 w-10 hover:bg-gray-50"
        onClick={() => handleCreateContentBlock("heading1")}
      >
        <span className="font-bold">H</span>
      </button>
      <button
        className="bg-white px-2 py-0.5 border-r-2 border-gray-300 h-8 w-10 hover:bg-gray-50"
        onClick={() => handleCreateContentBlock("paragraph")}
      >
        <span className="font-bold">Pa</span>
      </button>
      <button
        className="bg-white px-2 py-0.5 border-r-2 border-gray-300  h-8 w-10 hover:bg-gray-50"
        onClick={() => handleCreateContentBlock("list")}
      >
        <span className="font-bold">
          <List size="20px" />
        </span>
      </button>
      <button
        className="bg-white px-2 py-0.5 border-r-2 border-gray-300  h-8 w-10 hover:bg-gray-50"
        onClick={() => handleCreateContentBlock("image")}
      >
        <span className="font-bold">
          <Image size="20px" />
        </span>
      </button>
    </div>
  );
};

export default CreateBlockMenu;
