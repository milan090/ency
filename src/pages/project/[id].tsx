import { GetServerSideProps } from "next";
import Head from "next/head";

import React from "react";
import { graphqlClient, ssrCache } from "src/client/graphql/client";
import {
  GetProjectDocument,
  GetProjectQuery,
  GetProjectQueryVariables,
  useGetProjectQuery,
} from "src/client/graphql/getProject.generated";
import { getURL } from "src/server/getURL";

export default function ProjectPage({ projectId }: { projectId: string }): React.ReactNode {
  console.log("ProjectPage");
  const [result] = useGetProjectQuery({ variables: { id: projectId } });
  const { data, fetching, error } = result;

  if (!data?.project) {
    if (fetching) return "Loading";
    return "Error, oops";
  }

  const { title, description, color, iconSrc } = data.project;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:title" content={`Ency | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={iconSrc || "/images/tmp/noto_rocket.png"} />
        <meta property="og:url" content={`${getURL()}/`} />
        <meta content={color} data-react-helmet="true" name="theme-color"></meta>
        <title>{data.project.title}</title>
      </Head>
    </>
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
