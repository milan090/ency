import firebase from "firebase/app";
import "firebase/firestore";
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
export const createDefaultActivites = async (
  projectRef: FirebaseDocRef,
  batch: firebase.firestore.WriteBatch
): Promise<void> => {
  DEFAULT_ACTIVITES.forEach((activity) => {
    const docRef = projectRef.collection("activities").doc();
    batch.set(docRef, activity);
  });
};

function capitalizeFirstLetter(sentence: string): string {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

type AITips = {
  contentBlocks: ContentBlockDoc[];
  recommendedArticles: string[];
};

export const getAITips = async (name: string): Promise<AITips> => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL}/ai-tips`, { word: name });
  const data = res.data[name];
  const summary: string | string[] = data.output;
  const definition: string = res.data.definition;
  const keywords: [number, string][] = data.keywords;
  const recommendedArticles: string[] = data.recommended_articles;
  console.log(res.data);

  const contentBlocksAll: ContentBlockDoc[] = [
    {
      index: 0,
      type: "paragraph",
      value: definition ? `Definition: ${capitalizeFirstLetter(definition)}` : "",
    },
    {
      index: 0,
      type: "heading1",
      value: summary == "Ency did not find any interesting information about this topic !" ? "No AI-tips found" : "Summary",
    },
    {
      index: 0,
      type: "paragraph",
      value: typeof summary === "string" ? summary : summary[0],
    },
    {
      index: 0,
      type: "list",
      value: keywords.map((e) => e[1]).join("\n"),
    },
  ];

  // const batch = db.batch();

  // AI_TIP_BLOCKS.forEach((contentBlock) => {
  //   const docRef = projectRef.collection("contentBlocks").doc();
  //   batch.set(docRef, contentBlock);
  // });

  // batch.commit();
  const contentBlocks = contentBlocksAll
    .filter((e) => !!e.value) // Truthy value
    .map((e, i) => {
      e.index = i;
      return e;
    });
  return {
    contentBlocks: contentBlocks,
    recommendedArticles: recommendedArticles,
  };
};
