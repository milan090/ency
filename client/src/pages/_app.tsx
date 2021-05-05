import Head from "next/head";
import NextApp, { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextUrqlAppContext } from "next-urql";
import { Provider } from "next-auth/client";
import { domain } from "process";
import React from "react";

import "src/client/styles/globals.css";
import "src/client/styles/tailwind.css";
import { graphqlClient } from "src/client/graphql/client";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta
          property="og:title"
          content="Ency | Traditional Writing is good. But it could be better 👍"
        />
        <meta
          property="og:description"
          content="Presenting to you Ency, an AI Assisstant that helps you complete your reports, assignments and articles much faster & easier. There’s no turning back now!"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content={`https://${domain}`} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
};

App.getInitialProps = async (ctx: NextUrqlAppContext) => {
  const appProps = await NextApp.getInitialProps(ctx as any);
  return { ...appProps };
};
export default graphqlClient(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  App
);
