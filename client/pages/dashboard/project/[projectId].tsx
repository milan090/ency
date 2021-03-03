import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppBar from "components/appbar/appbar.component";
import { useAuth } from "hooks/useAuth.provider";
import {
  ContentBlock,
  ContentBlockDoc,
  ProjectPreviewDoc,
  ProjectPreview,
} from "types/project,types";
import { db } from "config/firebase";
import BlocksEditor from "components/blocks-editor/blocks-editor.component";
import ProjectSidebar from "components/project-sidebar/project-sidebar.component";
import AutoSaveIndicator from "components/autosave-indicator/autosave-indicator.component";
import { useProject } from "hooks/useProject";
import { ArrowLeft } from "react-feather";

export default function ProjectPage(): JSX.Element {
  const router = useRouter();
  const { projectId } = router.query;
  const { user, isLoading } = useAuth();
  const [project, setProject] = useState<ProjectPreview>();
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const { projectRef, setProjectRef } = useProject();

  const handleProjectNameChange = (newValue: string): void => {
    projectRef
      ?.update({
        name: newValue,
      })

      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    return () => {
      setProjectRef(undefined);
    };
  }, [setProjectRef]);
  useEffect(() => {
    if (isLoading) {
      // Pass
    } else if (!user.uid) {
      // If completed loading and still no user
      router.push("/sign-in");
    } else {
      const userRef = db.collection("users").doc(user.uid);
      const projectRef = userRef.collection("projects").doc(projectId as string);
      setProjectRef(projectRef);

      // Fetching the Project Data [name, description, last updated]
      const unsubscribeProjectPreview = projectRef.onSnapshot((res) => {
        const data = res.data() as ProjectPreviewDoc;
        const projectPreview: ProjectPreview = {
          id: projectRef.id,
          name: data.name,
          description: data.description,
          lastUpdated: data.lastUpdated.toDate(),
        };
        setProject(projectPreview);
      });

      // Fetching Content Blocks
      const unsubscribeContentBlocks = projectRef
        .collection("contentBlocks")
        .orderBy("index", "asc")
        .onSnapshot((querySnapshot) => {
          const contentBlocks: ContentBlock[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as ContentBlockDoc;
            contentBlocks.push({
              id: doc.id,
              type: data.type,
              value: data.value,
              index: data.index,
            });
          });
          setContentBlocks(contentBlocks);
        });
      return () => {
        unsubscribeProjectPreview();
        unsubscribeContentBlocks();
      };
    }
  }, [user]);

  return (
    <div className="bg-gray-200 flex mix-h-screen overflow-hidden">
      <AppBar />
      <div className="w-full max-h-screen">
        <div className="bg-gray-50 w-full py-1 px-12 border-b border-gray-300">
          <AutoSaveIndicator />
        </div>
        <div className="px-10 w-full pt-8 pb-20 overflow-y-scroll max-h-screen">
          <div className="flex justify-between items-center">
            <div>
              {project?.id && (
                <input
                  type="text"
                  className="font-semibold text-3xl bg-transparent outline-none"
                  value={project.name}
                  onChange={(e) => handleProjectNameChange(e.target.value)}
                />
              )}
            </div>

            <Link href="/dashboard">
              <ArrowLeft className="stroke-white bg-primary p-1 w-7 h-7 border-2 border-primary rounded-full cursor-pointer hover:stroke-primary hover:bg-transparent transition-colors duration-150 ease-out" />
            </Link>
          </div>
          <div>{projectRef && <BlocksEditor blocks={contentBlocks} projectRef={projectRef} />}</div>
        </div>
      </div>
      <ProjectSidebar />
    </div>
  );
}
