import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "components/sidebar/sidebar.component";
import { useAuth } from "hooks/useAuth.provider";
import {
  ContentBlock,
  ContentBlockDoc,
  ProjectPreviewDoc,
  ProjectPreview,
} from "types/project,types";
import { db } from "config/firebase";
import BlocksEditor from "components/blocks-editor/blocks-editor.component";
import { FirebaseDocRef } from "types/common.types";
import { useAutoSave } from "hooks/useAutoSave";
import ProjectSidebar from "components/project-sidebar/project-sidebar.component";
import { Check, UploadCloud } from "react-feather";

export default function ProjectPage(): JSX.Element {
  const router = useRouter();
  const { projectId } = router.query;
  const { user, isLoading } = useAuth();
  const [project, setProject] = useState<ProjectPreview>();
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [projectRef, setProjectRef] = useState<FirebaseDocRef>();
  const { notSaved } = useAutoSave();

  const handleProjectNameChange = (newValue: string): void => {
    projectRef
      ?.update({
        name: newValue,
      })
      .then(() => {
        console.log("Name updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          console.log(contentBlocks);

          setContentBlocks(contentBlocks);
        });
      return () => {
        console.log("Unsubscrib");
        unsubscribeProjectPreview();
        unsubscribeContentBlocks();
      };
    }
  }, [user]);

  return (
    <div className="bg-gray-200 flex mix-h-screen overflow-hidden">
      <SideBar />
      <div className="px-10 w-full pt-8 pb-20 overflow-y-scroll max-h-screen">
        <div>
          <div>
            {project?.id && (
              <input
                type="text"
                className="font-semibold text-3xl bg-transparent outline-none"
                value={project.name}
                onChange={(e) => handleProjectNameChange(e.target.value)}
              />
            )}
            <div className="float-right">
              <span>
                {notSaved.length === 0 ? (
                  <span className="flex items-center justify-center">
                    <Check className="mr-1 bg-transparent rounded-full stroke-primary" />{" "}
                    <span>Saved!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center animate-pulse">
                    <UploadCloud className="mr-2 bg-transparent rounded-full stroke-primary" />{" "}
                    <span>Autosaving...</span>
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div>{projectRef && <BlocksEditor blocks={contentBlocks} projectRef={projectRef} />}</div>
      </div>
      <ProjectSidebar />
    </div>
  );
}
