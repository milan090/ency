import firebase from "firebase";

export interface ProjectPreview {
  id: string;
  name: string;
  description?: string;
  lastUpdated: Date;
}

export interface Project extends ProjectPreview {
  createdAt: Date;
}

export interface ProjectDoc extends firebase.firestore.DocumentData {
  name: string;
  description: string;
  lastUpdated: firebase.firestore.Timestamp;
}
