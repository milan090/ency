import ProjectCard from "components/project-card/project-card.component";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import React, { useEffect, useState } from "react";
import { ProjectPreviewDoc, ProjectPreview } from "types/project,types";

const ProjectsPreview: React.FC = () => {
  const [projects, setProjects] = useState<ProjectPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    if (!user.uid) return;
    const projectRef = db.collection("users").doc(user.uid).collection("projects");
    let unsubscribeProject: any;
    try {
      unsubscribeProject = projectRef.orderBy("lastUpdated", "desc").onSnapshot((querySnapshot) => {
        const projectPreviews: Array<ProjectPreview> = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as ProjectPreviewDoc;
          projectPreviews.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            lastUpdated: data.lastUpdated.toDate(),
          });
        });

        setProjects(projectPreviews);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      unsubscribeProject();
    };
  }, [user.uid]);

  if (isLoading) {
    return <h2>Loading Projects...</h2>;
  }
  return (
    <div className="h-full">
      <div>
        <h2 className="font-semibold text-3xl">Projects</h2>
        <hr className="w-10 border-none bg-primary h-1 mt-0.5" />
      </div>
      {projects.length === 0 ? (
        <div className="">
          {projects.length === 0 && (
            <div className="flex items-center justify-center mt-20">
              <img src="./dashboard/create-project.svg" alt="" width="180px" />
              <span className="text-3xl font-bold text-gray-500">
                Create Your <br /> First Project
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-5 lg:gap-x-5 sm:gap-x-1 mt-5">
          {projects?.map(({ ...projectProps }) => (
            <ProjectCard key={projectProps.id} {...projectProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPreview;
