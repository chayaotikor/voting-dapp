const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type ProposalCount {
    totalVotes: Int!
    yesCount: Int!
    noCount: Int!
  }

  type RootQuery {
    getElectionOfficial: String!
    countVotes: [ProposalCount!]!
  }

  type RootMutation {
    register(address: String!): String!
    vote(choices: [Boolean!]!, sender: String!): String!
  }

   schema {
     query: RootQuery
     mutation: RootMutation
 }
`);