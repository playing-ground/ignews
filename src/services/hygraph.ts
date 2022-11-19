import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(
  process.env.HYGRAPH_ENDPOINT as string, {
  headers: {
    authorization: `Bearer ${process.env.HYGRAPH_ACCESS_TOKEN as string}`
  }
});