import ImageBlock from "components/image-block/image-block.component";
import { useAutoSave } from "hooks/useAutoSave";
import React, { useEffect, useRef, useState } from "react";
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
        console.log("YO");
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

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

import { nextTick } from "process";

interface TextareaListProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

const TextareaList: React.FC<TextareaListProps> = ({ defaultValue, onChange }) => {
  const [list, setList] = useState(defaultValue.split("\n"));
  const listRef = useRef(null);

  const handleChange = (value: string, index: number): void => {
    if (value === "\n") {
      const newList = [...list];
      newList[index] = "";
      setList(newList);
      return;
    }
    const newValue = value.replace(/(\r\n|\n|\r)/gm, "");
    const newList = [...list];

    newList[index] = newValue;
    setList(newList);

    onChange(newList.join("\n"));
  };

  const focusAbove = (index: number): void => {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const previousListItem = (listRef.current as any).children[index - 1];
      if (previousListItem) previousListItem.firstChild.focus();
    });
  };

  const focusBelow = (index: number): void => {
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nextListItem = (listRef.current as any).children[index + 1];
      if (nextListItem) nextListItem.firstChild.focus();
    });
  };

  return (
    <ul className="w-full list-outside list-disc ml-7 mt-2 mb-3 py-3" ref={listRef}>
      {list.map((value, i) => (
        <li key={i} className="my-1">
          <TextareaAutosize
            placeholder="Enter Some Text"
            className="outline-none w-11/12 block"
            value={value}
            onChange={(e) => handleChange(e.currentTarget.value, i)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                const newList = [...list, ""];
                setList(newList);
                onChange(newList.join("\n"));
                focusBelow(i);
              } else if (e.currentTarget.value.length < 1 && e.code === "Backspace" && i !== 0) {
                const newList = [...list];
                newList.splice(i, 1);
                setList(newList);
                onChange(newList.join("\n"));
                focusAbove(i);
              } else if (e.code === "ArrowUp") {
                focusAbove(i);
              } else if (e.code === "ArrowDown") {
                focusBelow(i);
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};
