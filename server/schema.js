const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Plurality {
      totalRegisteredVoters: Int
    }
`)