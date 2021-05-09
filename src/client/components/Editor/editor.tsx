import { API, OutputData, ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Editor from "react-editor-js";

import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inl;ine-code";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";

type Props = {
  data: OutputData;
  onChange: (newData: OutputData) => void;
};

const EDITOR_TOOLS: {
  [toolName: string]: ToolConstructable | ToolSettings<any>;
} = {
  embed: Embed,
  paragraph: Paragraph,
  list: List,
  code: Code,
  linkTool: LinkTool,
  header: Header,
  quote: Quote,
  inlineCode: InlineCode,
};

export const EditorComponent: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (_: API, newData: OutputData): void => {
    onChange(newData);
  };

  return <Editor data={data} onChange={handleChange as any} tools={EDITOR_TOOLS} />;
};
