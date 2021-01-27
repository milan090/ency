import ImageBlock from "components/image-block/image-block.component";
import TextareaList from "components/textarea-list/textarea-list.components";
import { useAutoSave } from "hooks/useAutoSave";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlock } from "types/project,types";

type Props = {
  contentBlock: ContentBlock;
  projectRef: FirebaseDocRef;
};

const ContentBlockInput: React.FC<Props> = ({ contentBlock, projectRef }) => {
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();

  const { addItemToSave, removeItemToSave } = useAutoSave();

  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  });

  const handleChange = (newValue: string, wait?: boolean): void => {
    addItemToSave(contentBlock.id);
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    setAutoSaveTimeout(
      setTimeout(
        () => {
          projectRef
            .collection("contentBlocks")
            .doc(contentBlock.id)
            .update({
              value: newValue,
            })
            .then(() => {
              removeItemToSave(contentBlock.id);
            });
        },
        wait === false ? 0 : 3000
      )
    );
  };

  switch (contentBlock.type) {
    case "heading1":
      return (
        <TextareaAutosize
          defaultValue={contentBlock.value}
          placeholder="Enter Some Text"
          className="outline-none w-full px-5 py-5 font-semibold text-3xl"
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
      );
    case "heading2":
      return (
        <TextareaAutosize
          defaultValue={contentBlock.value}
          placeholder="Enter Some Text"
          className="outline-none w-full px-5 py-5 font-semibold text-xl"
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
      );

    case "paragraph":
      return (
        <TextareaAutosize
          defaultValue={contentBlock.value}
          placeholder="Enter Some Text"
          className="outline-none w-full px-5 py-5"
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
      );

    case "list":
      return <TextareaList onChange={handleChange} defaultValue={contentBlock.value} />;
    case "image":
      return <ImageBlock contentBlock={contentBlock} handleChange={handleChange} />;
    default:
      return (
        <TextareaAutosize
          defaultValue={contentBlock.value}
          placeholder="Enter Some Text"
          className="outline-none w-full px-5 py-5"
          onChange={(e) => handleChange(e.currentTarget.value)}
        />
      );
  }
};

export default ContentBlockInput;
