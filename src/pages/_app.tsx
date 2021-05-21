import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { TOAST_OPTIONS } from "src/config/toaster";
import { GRAPHQL_ENDPOINT } from "src/client/graphql/client";
import { DefaultSeo } from "next-seo";

import "src/client/styles/globals.css";
import "src/client/styles/tailwind.css";

import { withUrqlClient } from "next-urql";
import { SEO } from "src/config/seo";

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const queryClient = new QueryClient();
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <DefaultSeo
          title={pageProps?.seo?.title || SEO.DEFAULT_TITLE}
          titleTemplate={SEO.DEFAULT_TITLE_TEMPLATE}
          description={SEO.DEFAULT_DESCRIPTION}
          // canonical={url}
          openGraph={{
            type: "website",
            locale: "en_US",
            // url,
            site_name: SEO.SITE_NAME,
            title: SEO.SITE_NAME,
            description: SEO.DEFAULT_DESCRIPTION,
            images: [
              {
                url: SEO.DEFAULT_OG_IMAGE,
                alt: SEO.SITE_NAME,
              },
            ],
          }}
          twitter={{
            handle: SEO.TWITTER_HANDLE,
            site: SEO.TWITTER_HANDLE,
            cardType: "summary_large_image",
          }}
          additionalLinkTags={[
            {
              rel: "shortcut icon",
              href: SEO.FAVICON_LINK,
            },
          ]}
        />
        <Component {...pageProps} />
        <Toaster position="top-right" toastOptions={TOAST_OPTIONS} />
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
