import { GetServerSideProps } from "next";

import React from "react";
import { graphqlClient, ssrCache } from "src/client/graphql/client";
import {
  GetProjectDocument,
  GetProjectQuery,
  GetProjectQueryVariables,
  useGetProjectQuery,
} from "src/client/graphql/getProject.generated";

export default function ProjectPage({ projectId }: { projectId: string }): React.ReactNode {
  console.log("ProjectPage");
  const [result] = useGetProjectQuery({ variables: { id: projectId } });
  const { data, fetching, error } = result;

  if (fetching) return "Loading";
  if (error) return "Error, oops";

  return (
    <div>
      <h1>{data?.project?.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const projectId = ctx.params?.id as string;
  const project = await graphqlClient
    .query<GetProjectQuery, GetProjectQueryVariables>(
      GetProjectDocument,
      {
        id: projectId,
      },
      {
        fetchOptions: {
          headers: {
            cookie: ctx.req.headers.cookie,
          } as any,
        },
      }
    )
    .toPromise();

  if (!project.data?.project) {
    ctx.res.statusCode = 404;
    return {
      notFound: true,
    };
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
      projectId,
    },
  };
};
