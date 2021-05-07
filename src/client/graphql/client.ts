import { getAPIURl } from "src/server/getURL";
import fetch from "isomorphic-unfetch";
import { dedupExchange, cacheExchange, fetchExchange, ssrExchange, createClient } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";

export const GRAPHQL_ENDPOINT = `${getAPIURl()}/graphql`;

const isServerSide = typeof window === "undefined";

// The `ssrExchange` must be initialized with `isClient` and `initialState`
export const ssrCache = ssrExchange({
  isClient: !isServerSide,
});

export const urqlExchanges = [
  devtoolsExchange,
  dedupExchange,
  cacheExchange,
  ssrCache,
  fetchExchange,
];

export const graphqlClient = createClient(
  {
    exchanges: urqlExchanges,
    url: GRAPHQL_ENDPOINT,
    fetch,
    fetchOptions: {
      credentials: "include",
    },
    requestPolicy: `cache-and-network`,
  }
  // { ssr: false } // Important so we don't wrap our component in getInitialProps
);
