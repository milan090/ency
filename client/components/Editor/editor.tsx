import EditorJs from "react-editor-js";

type Props = {
  data: any;
  tools: any;
};

export const Editor: React.FC<Props> = ({ data, tools }) => {
  return <EditorJs data={data} tools={tools} />;
};
