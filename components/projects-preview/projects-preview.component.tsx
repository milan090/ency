import ProjectCard from "components/project-card/project-card.component";
import { db } from "config/firebase";
import { useAuth } from "hooks/useAuth.provider";
import React, { useEffect, useState } from "react";
import { ProjectDoc, ProjectPreview } from "types/project,types";

const ProjectsPreview: React.FC = () => {
  const [projects, setProjects] = useState<ProjectPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user.uid) return;
    setIsLoading(true);
    const projectRef = db.collection("users").doc(user.uid).collection("projects");
    projectRef
      .orderBy("lastUpdated", "desc")
      .get()
      .then((querySnapshot) => {
        const projectPreviews: Array<ProjectPreview> = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as ProjectDoc;
          projectPreviews.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            lastUpdated: data.lastUpdated.toDate(),
          });
        });

        setProjects(projectPreviews);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error getting projects", error);
      });

    projectRef.orderBy("lastUpdated", "desc").onSnapshot((querySnapshot) => {
      console.log("Projects fetched =", querySnapshot.docs.length);
      const projectPreviews: Array<ProjectPreview> = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as ProjectDoc;
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
  }, [user.uid]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="h-full">
      <div>
        <h2 className="font-bold text-3xl">Projects</h2>
        <hr className="w-10 border-none bg-primary h-1 mt-0.5" />
      </div>
      {projects.length === 0 ? (
        <div className="mx-auto pt-20">
          {projects.length === 0 && (
            <div className="flex items-center">
              <img src="./dashboard/create-project.svg" alt="" width="180px" />
              <span className="text-3xl font-bold text-gray-500">
                Create Your <br /> First Project
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-5 lg:gap-x-5 sm:gap-x-1 mt-5">
          {projects?.map(({ id, ...projectProps }) => (
            <ProjectCard key={id} {...projectProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPreview;
