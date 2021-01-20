import ContentBlockEditor from "components/content-block/content-block.component";
// import { useRouter } from "next/router";
import React from "react";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlock, ContentBlockDoc, ContentBlockType } from "types/project,types";

type Props = {
  blocks: ContentBlock[];
  projectRef: FirebaseDocRef;
};

const BlocksEditor: React.FC<Props> = ({ blocks, projectRef }) => {
  // const router = useRouter();
  // const { projectId } = router.query;

  const handleCreateContentBlock = (type: ContentBlockType): void => {
    const newContentBlock: ContentBlockDoc = {
      index: blocks.length,
      type: type,
      value: "",
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
    <div>
      <div className="my-10">
        <button
          className="bg-white px-2 py-0.5"
          onClick={() => handleCreateContentBlock("heading1")}
        >
          <span className="font-bold">H</span>
        </button>
      </div>
      <div>
        {blocks.map((contentBlock) => (
          <ContentBlockEditor
            key={contentBlock.id}
            contentBlock={contentBlock}
            projectRef={projectRef}
          />
        ))}
      </div>
    </div>
  );
};

export default BlocksEditor;
