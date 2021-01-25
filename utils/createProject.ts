import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "config/firebase";
import { FirebaseDocRef } from "types/common.types";
import { ActivityDoc, ContentBlockDoc } from "types/project,types";
import axios from "axios";

const dateToTimestamp = (date: Date): firebase.firestore.Timestamp => {
  return firebase.firestore.Timestamp.fromDate(date);
};

const DEFAULT_ACTIVITES: ActivityDoc[] = [
  {
    name: "Add Description To Project",
    createdAt: dateToTimestamp(new Date()),
    isCompleted: false,
  },
  {
    name: "Add an image",
    createdAt: dateToTimestamp(new Date()),
    isCompleted: false,
  },
  {
    name: "Check the suggested articles",
    createdAt: dateToTimestamp(new Date()),
    isCompleted: false,
  },
  {
    name: "Write Table Of Contents (list)",
    createdAt: dateToTimestamp(new Date()),
    isCompleted: false,
  },
];
export const createDefaultActivites = async (projectRef: FirebaseDocRef): Promise<void> => {
  const batch = db.batch();

  DEFAULT_ACTIVITES.forEach((activity) => {
    const docRef = projectRef.collection("activities").doc();
    batch.set(docRef, activity);
  });
  batch.commit();
};

function capitalizeFirstLetter(sentence: string): string {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export const getAITips = async (projectRef: FirebaseDocRef, name: string): Promise<void> => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL}/ai-tips`, { word: name });
  const data = res.data[name];
  const summary: string = data.output;
  const definition: string = data.definition;
  const keywords: [number, string][] = data.keywords;
  console.log(data);

  const AI_TIP_BLOCKS: ContentBlockDoc[] = [
    {
      index: 0,
      type: "paragraph",
      value: `Defition: ${capitalizeFirstLetter(definition)}`,
    },
    {
      index: 1,
      type: "heading1",
      value: "Summary",
    },
    {
      index: 2,
      type: "paragraph",
      value: summary,
    },
    {
      index: 3,
      type: "list",
      value: keywords.map((e) => e[1]).join("\n"),
    },
  ];

  const batch = db.batch();

  AI_TIP_BLOCKS.forEach((contentBlock) => {
    const docRef = projectRef.collection("contentBlocks").doc();
    batch.set(docRef, contentBlock);
  });

  batch.commit();
};
