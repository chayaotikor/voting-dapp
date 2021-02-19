const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema')
const rootResolver = require('./resolvers')

const server = express();
server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);