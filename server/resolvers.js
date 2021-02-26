// const {contract} = require('./deployment')

const Web3 = require("web3");
const { abi } = require("../client/src/artifacts/Plurality.json");
const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");

const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
  from: process.env.DEFAULT_ACCOUNT,
  gas: 3000000,
});

module.exports = {
  getElectionOfficial: async (name) => {
    try {
      let official = await contract.methods.getElectionOfficial().call();
      return official;
    } catch (error) {
      throw Error(error);
    }
  },

  register: async ({ address }) => {
    try {
      let transaction = await contract.methods.register(address).send();

      return `The following address has been registered: ${transaction.events.Registered.returnValues[0]}`;
    } catch (error) {
      let keys = Object.keys(error.data);
      throw Error(`${error.data[keys[0]].reason}`);
    }
  },

  vote: async ({ choices, sender }) => {
    try {
      let transaction = await contract.methods.pluralityVote(choices).send({from: sender});

      return `Votes have been cast from the following address: ${transaction.events.VoteCast.returnValues[0]}`;

    } catch (error) {
      let keys = Object.keys(error.data);
      throw Error(`${error.data[keys[0]].reason}`);
    }
  },
  countVotes: async () => {
    try {
      let transaction = await contract.methods.countPluralityProposals().send();

      let result = transaction.events.VotesCounted.map(proposal => {
        
        return {
          totalVotes: proposal.returnValues._totalVotes,
          yesCount: proposal.returnValues._yesCount,
          noCount: proposal.returnValues._noCount,
        };
      });
      
       return result;

    } catch (error) {
      let keys = Object.keys(error.data);
      throw Error(`${error.data[keys[0]].reason}`);
    }
  },

  
};
