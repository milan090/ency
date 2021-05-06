import { withUrqlClient } from "next-urql";
import { getAPIURl } from "src/server/getURL";
import fetch from "isomorphic-unfetch";

const GRAPHQL_ENDPOINT = `${getAPIURl()}/graphql`;

export const graphqlClient = withUrqlClient(() => ({
  url: GRAPHQL_ENDPOINT,
  fetch,
  fetchOptions: {
    credentials: "include",
  },
  requestPolicy: `cache-and-network`,
}));
