// const {contract} = require('./deployment')

const Web3 = require("web3");
const { abi } = require("../client/src/artifacts/Plurality.json");
const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");

const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
  from: process.env.DEFAULT_ACCOUNT,
});
let balance = await web3.utils.fromWei(
  web3.eth.getBalance("0x35104d871e5531042Db2943587eCf9c176c9f323")
);
console.log(balance);

module.exports = {
  getElectionOfficial: async (name) => {
    try {
      let official = await contract.methods.electionOfficial().call();
      return official;
    } catch (error) {
      console.log(error);
    }
  },

  register: async ({ address }) => {
    try {
      let event = await contract.methods.register(address).send();
      return event;
    } catch (error) {
      console.log(error);
    }
  },
};
