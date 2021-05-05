import { withUrqlClient } from "next-urql";
import { getAPIURl } from "src/server/getAPIURL";
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
