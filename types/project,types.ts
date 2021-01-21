import firebase from "firebase";

export interface ProjectPreview {
  id: string;
  name: string;
  description?: string;
  lastUpdated: Date;
}

export interface ProjectPreviewDoc extends firebase.firestore.DocumentData {
  name: string;
  description: string;
  lastUpdated: firebase.firestore.Timestamp;
}

export type ContentBlockType =
  | "heading1"
  | "heading2"
  | "paragraph"
  | "image"
  | "video"
  | "link"
  | "list";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  value: string;
  index: number;
}

export interface ContentBlockDoc extends firebase.firestore.DocumentData {
  type: ContentBlockType;
  value: string;
  index: number;
}
