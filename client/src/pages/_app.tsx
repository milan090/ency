import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import "src/client/styles/tailwind.css";
import "src/client/styles/globals.css";

import { domain } from "src/utils/domain";
import { Provider } from "next-auth/client";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
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
}
