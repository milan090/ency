import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { TOAST_OPTIONS } from "src/config/toaster";
import { GRAPHQL_ENDPOINT } from "src/client/graphql/client";

import "src/client/styles/globals.css";
import "src/client/styles/tailwind.css";
import { withUrqlClient } from "next-urql";

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const queryClient = new QueryClient();
  return (
    <Provider session={pageProps.session}>
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
