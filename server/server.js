const express = require("express");
const graphqlHTTP = require("express-graphql");
const Web3 = require("web3");




const server = express();
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);