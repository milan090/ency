import ContentBlockEditor from "components/content-block/content-block.component";
import CreateBlockMenu from "components/create-block-menu/create-block-menu.component";
// import { useRouter } from "next/router";
import React from "react";
import { FirebaseDocRef } from "types/common.types";
import { ContentBlock } from "types/project,types";

type Props = {
  blocks: ContentBlock[];
  projectRef: FirebaseDocRef;
};

const BlocksEditor: React.FC<Props> = ({ blocks, projectRef }) => {
  return (
    <div>
      <CreateBlockMenu blocksLength={blocks.length} projectRef={projectRef} />
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
