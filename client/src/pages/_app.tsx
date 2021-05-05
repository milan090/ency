import Head from "next/head";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { graphqlClient } from "src/client/graphql/client";
import { TOAST_OPTIONS } from "src/config/toaster";
import { getURL } from "src/server/getURL";

import "src/client/styles/globals.css";
import "src/client/styles/tailwind.css";

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

// App.getInitialProps = async (ctx: NextUrqlAppContext) => {
//   const appProps = await NextApp.getInitialProps(ctx as any);
//   return { ...appProps };
// };

export default graphqlClient(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  App
);
