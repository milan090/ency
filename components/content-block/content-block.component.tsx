import Dropdown from "components/dropdown/dropdown.component";
import { db } from "config/firebase";
import { firestore } from "config/firebase";
import { useAutoSave } from "hooks/useAutoSave";
import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "react-feather";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlock, ContentBlockDoc } from "types/project,types";

type Props = {
  contentBlock: ContentBlock;
  projectRef: FirebaseDocRef;
};

const ContentBlockEditor: React.FC<Props> = ({ contentBlock, projectRef }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Dropdown
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();

  const { addItemToSave, removeItemToSave } = useAutoSave();

  const container = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!isOpen) return;
      if (!(container.current as any).contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, container]);

  const handleChange = (newValue: string): void => {
    setValue(newValue);
    addItemToSave(contentBlock.id);
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    setAutoSaveTimeout(
      setTimeout(() => {
        console.log("Saving");
        projectRef
          .collection("contentBlocks")
          .doc(contentBlock.id)
          .update({
            value: value,
          })
          .then(() => {
            removeItemToSave(contentBlock.id);
          });
      }, 3000)
    );
  };

  const handleDelete = async (): Promise<void> => {
    const contentBlocksRef = projectRef.collection("contentBlocks");
    const itemToDeleteRef = contentBlocksRef.doc(contentBlock.id);
    contentBlocksRef
      .where(firestore.FieldPath.documentId(), "!=", contentBlock.id)
      .get()
      .then((res) => {
        const docs = res.docs.sort((a, b) => a.data().index - b.data().index);
        const batch = db.batch();
        batch.delete(itemToDeleteRef);

        docs.forEach((doc, i) => {
          batch.update(doc.ref, { index: i });
        });

        batch
          .commit()
          .then(() => {
            setIsOpen(false);
          })
          .catch((error) => {
            console.log(error);
            alert("Oops something went wrong");
          });
      });
  };

  const handleCreateElementBelow = async (): Promise<void> => {
    const newContentBlock: ContentBlockDoc = {
      index: contentBlock.index + 1,
      type: "paragraph",
      value: "",
    };
    const batch = db.batch();

    batch.set(projectRef.collection("contentBlocks").doc(), newContentBlock);

    // Get next elements if any and updates its index
    try {
      const nextContentBlock = await projectRef
        .collection("contentBlocks")
        .where("index", ">", contentBlock.index)
        .get();
      const docs = nextContentBlock.docs.sort((a, b) => a.data().index - b.data().index);
      docs.forEach((doc) => {
        batch.update(doc.ref, { index: doc.data().index + 1 });
      });
      await batch.commit();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      alert("Oops something went wrong");
    }
  };

  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      // if (process.env.NODE_ENV === "production") {
      //   console.log("Saving");
      //   projectRef.collection("contentBlocks").doc(contentBlock.id).update({
      //     value: value,
      //   });
      // }
    };
  }, []);

  return (
    <div
      className="bg-white w-full rounded-sm border-l-4 border-black mb-5 flex group"
      ref={container}
    >
      <input
        type="text"
        defaultValue={contentBlock.value}
        placeholder="Enter Some Text"
        className="outline-none w-full px-5 py-5"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="px-2 pt-2">
        <button
          className={`outline-none cursor-pointer focus:outline-none ${
            !isOpen && "hidden"
          } group-hover:inline-block`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <MoreVertical size="18px" className="outline-none" />
        </button>
        <Dropdown show={isOpen} className="right-12 shadow-xl w-50">
          <li className="cursor-pointer">
            <button
              className="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap w-full text-left outline-none focus:outline-none focus:bg-gray-300 border-b border-gray-300"
              onClick={() => handleCreateElementBelow()}
            >
              Create Element Below
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              className="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap w-full text-left outline-none focus:outline-none focus:bg-gray-300"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </li>
        </Dropdown>
      </div>
    </div>
  );
};

export default ContentBlockEditor;
