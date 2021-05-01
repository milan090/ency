import { axios } from "config/axios";
import { GetServerSideProps } from "next";
import React from "react";
import { ProjectData } from "types/project.types";

type Data = {
  project: ProjectData;
};

type Params = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Data, Params> = async (context) => {
  const projectId = context.params?.id;

  const project = await (await axios.get<ProjectData>(`/project/${projectId}`)).data;

  return {
    props: { project },
  };
};

type Props = {
  data: Data;
};

export default function ProjectPage({ data }: Props): React.ReactNode {
  return (
    <div>
      <h1>{data.project.title}</h1>
      {data.project.description}
    </div>
  );
}
