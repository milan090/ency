import { db } from "config/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { Stream } from "stream";
import { ContentBlock, ProjectPreviewDoc } from "types/project,types";
import { contentBlocksToPDF } from "utils/contentBlocksToPDF";
import { getUserUid } from "utils/getUser";

export default async function exportProjectAsPDF(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Invalid method on route. Use POST instead",
      });
    }
    const { projectId } = req.body;
    const userUid: string | null = await getUserUid(req);

    if (!userUid) {
      return res.status(400).json({
        error: "Not authenticated",
      });
    } else if (!projectId) {
      return res.status(400).json({
        error: `Expected projectId to be a string, but got projectId: ${projectId}`,
      });
    }

    const userRef = db.collection("users").doc(userUid);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(503).json({
        error: "User does not exist",
      });
    }

    const projectRef = userRef.collection("projects").doc(projectId);
    const project = await projectRef.get();
    if (!project.exists) {
      return res.status(404).json({
        error: `Could not find a project with the given id ${projectId} for this user`,
      });
    }
    const projectData: ProjectPreviewDoc = project.data() as any;

    const contentBlocksRef = projectRef.collection("contentBlocks").orderBy("index", "asc");
    const contentBlocks: ContentBlock[] = await (await contentBlocksRef.get()).docs.map((doc) => ({
      ...(doc.data() as any),
      id: doc.id,
    }));

    const dataStream: Stream = await contentBlocksToPDF(contentBlocks, projectData.name);
    res.setHeader("Content-Type", "	application/pdf");
    res.setHeader("content-disposition", "attachment; filename=" + projectData.name + ".pdf");

    dataStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}
