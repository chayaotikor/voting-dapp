const Web3 = require("web3");
const { abi, networks } = require("../client/src/artifacts/Voting.json");
const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");

const contract = new web3.eth.Contract(abi, networks["5777"].address, {
  from: process.env.DEFAULT_ACCOUNT,
  gas: 3000000,
});

module.exports = {
  /* CONTRACT MUTATION RESOLVERS */
  register: async ({ address }) => {
    try {
      let transaction = await contract.methods.register(address).send();
      console.log(transaction)
      return `The following address has been registered: ${transaction.events.Registered.returnValues[0]}`;
    } catch (error) {
      let keys = Object.keys(error.data);
      if (error.data[keys[0]].reason) {
        throw Error(`${error.data[keys[0]].reason}`);
      } else {
        throw Error(error);
      }
    }
  },

  vote: async ({ choices, sender }) => {
    try {
      let transaction = await contract.methods
        .vote(choices)
        .send({ from: sender });

      return `Votes have been cast from the following address: ${transaction.events.VoteCast.returnValues[0]}`;
    } catch (error) {
      console.log(error);
      let keys = Object.keys(error.data);
      if (error.data[keys[0]].reason) {
        throw Error(`${error.data[keys[0]].reason}`);
      } else {
        throw Error(error);
      }
    }
  },

  countVotes: async () => {
    try {
      let transaction = await contract.methods.countProposals().send();

      let result = transaction.events.VotesCounted.map((proposal) => {
        return {
          totalVotes: proposal.returnValues._totalVotes,
          yesCount: proposal.returnValues._yesCount,
          noCount: proposal.returnValues._noCount,
        };
      });

      return result;
    } catch (error) {
      let keys = Object.keys(error.data);
      if (error.data[keys[0]].reason) {
        throw Error(`${error.data[keys[0]].reason}`);
      } else {
        throw Error(error);
      }
    }
  },

  /* CONTRACT QUERY RESOLVERS */
  electionOfficial: async () => {
    try {
      let official = await contract.methods.getElectionOfficial().call();
      return official;
    } catch (error) {
      throw Error(error);
    }
  },

  totalRegisteredVoters: async () => {
    try {
      let registeredCount = await contract.methods
        .countRegisteredVoters()
        .call();
      return registeredCount;
    } catch (error) {
      throw Error(error);
    }
  },

  totalProposals: async () => {
    try {
      let proposalCount = await contract.methods.getTotalProposals().call();
      return proposalCount;
    } catch (error) {
      throw Error(error);
    }
  },

  voterChoices: async ({ address, sender }) => {
    try {
      let choices = await contract.methods
        .getChoices(address)
        .call({ from: sender });

      return choices;
    } catch (error) {
      let keys = Object.keys(error.data);
      if (error.data[keys[0]].reason) {
        throw Error(`${error.data[keys[0]].reason}`);
      } else {
        throw Error(error);
      }
    }
  },

  winningProposals: async () => {
    try {
      let winners = await contract.methods.getWinningProposals().call();
      return winners;
    } catch (error) {
      throw Error(error);
    }
  },

  proposalVoteCount: async ({ proposalNumber }) => {
    try {
      let counts = await contract.methods
        .getProposalCount(proposalNumber)
        .call();

      let result = {
        totalVotes: Number(counts[0]) + Number(counts[1]),
        yesCount: counts[0],
        noCount: counts[1],
      };

      return result;
    } catch (error) {
      throw Error(error);
    }
  },

  getAccounts: async () => {
    try {
      let accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      throw Error(error);
    }
  },
};
