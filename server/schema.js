const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type ProposalCount {
    totalVotes: Int!
    yesCount: Int!
    noCount: Int!
  }

  type RootQuery {
    electionOfficial: String!
    totalRegisteredVoters: Int!
    voterChoices(address: String!, sender: String!): [Boolean!]!
    totalProposals: Int!
    winningProposals: [Boolean!]!
    proposalVoteCount(proposalNumber: Int!): ProposalCount!
  }
  
  type RootMutation {
    countVotes: [ProposalCount!]!
    register(address: String!): String!
    vote(choices: [Boolean!]!, sender: String!): String!
  }

   schema {
     query: RootQuery
     mutation: RootMutation
 }
`);