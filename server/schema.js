const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type RootQuery {
    getElectionOfficial: String!
  }

  type RootMutation {
    register(address: String!): String
  }

   schema {
     query: RootQuery
     mutation: RootMutation
 }
`);