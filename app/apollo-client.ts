import { ApolloClient, InMemoryCache } from "@apollo/client";

// const URL = "http://localhost:8000/graphql";
const URL = "http://localhost:4000/";
export const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
});

export const countryClient = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

/// Public GQL APIs
// https://www.apollographql.com/blog/community/backend/8-free-to-use-graphql-apis-for-your-projects-and-demos/
// https://github.com/graphql-kit/graphql-apis
// https://stepzen.com/blog/free-public-graphql-apis
// https://blog.graphqleditor.com/best-graphql-apis-to-play-with
// https://www.postman.com/cs-demo/workspace/public-graphql-apis/request/8854915-b43151eb-0107-4387-b90b-3ce4cc9c6a02

/// Public OData API List
// https://www.odata.org/odata-services/

/// How OData Works
// https://www.progress.com/tutorials/odata/connecting-to-odata-service-from-nodejs-or-nextjs

/// OData NPM Pkg
// https://www.npmjs.com/package/odata
