import Dropdown from "components/dropdown/dropdown.component";
import { db } from "config/firebase";
import { firestore } from "config/firebase";
import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "react-feather";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlock, ContentBlockDoc } from "types/project,types";
import ContentBlockInput from "components/content-block-input/content-block-input.component";

type Props = {
  contentBlock: ContentBlock;
  projectRef: FirebaseDocRef;
};

const ContentBlockEditor: React.FC<Props> = ({ contentBlock, projectRef }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true);
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
            setIsDeleting(false);
          })
          .catch((error) => {
            setIsDeleting(false);
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

  return (
    <div className="bg-white w-full rounded-sm border-l-4 border-black mb-5 flex group">
      <ContentBlockInput contentBlock={contentBlock} projectRef={projectRef} />

      <div className="px-5 pt-2 inline-block relative" ref={container}>
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
        <Dropdown show={isOpen} className="shadow-xl w-52 right-2">
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
              {isDeleting ? (
                <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24"></svg>
              ) : (
                "Delete"
              )}
            </button>
          </li>
        </Dropdown>
      </div>
    </div>
  );
};

export default ContentBlockEditor;
