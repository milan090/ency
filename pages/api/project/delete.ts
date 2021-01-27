import { db } from "config/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserUid } from "utils/getUser";

export default async function deleteProject(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({
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

    const contentBlocksCollectionRef = projectRef.collection("contentBlocks");
    const contentBlocks = await contentBlocksCollectionRef.get();
    const batchSize = contentBlocks.size;

    if (batchSize !== 0) {
      const batch = db.batch();
      contentBlocks.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }

    await projectRef.delete();

    return res.json({ success: "DELETED" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}
