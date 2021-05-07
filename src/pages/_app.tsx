import Head from "next/head";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { TOAST_OPTIONS } from "src/config/toaster";
import { getURL } from "src/server/getURL";
import { GRAPHQL_ENDPOINT } from "src/client/graphql/client";

import "src/client/styles/globals.css";
import "src/client/styles/tailwind.css";
import { withUrqlClient } from "next-urql";

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const queryClient = new QueryClient();
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
        <meta property="og:url" content={getURL()} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster position="bottom-right" toastOptions={TOAST_OPTIONS} />
      </QueryClientProvider>
    </Provider>
  );
};

export default withUrqlClient(
  () => ({
    url: GRAPHQL_ENDPOINT,
    // Dont pass in ssrCache exchange here
  }),
  { ssr: false }
)(App as any);
