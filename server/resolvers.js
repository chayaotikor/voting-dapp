const Web3 = require('web3')
const artifact = require('../client/src/artifacts/Plurality.json')

const abi = artifact.abi;
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const contract = new web3.eth.Contract(
  abi,
  process.env.CONTRACT_ADDRESS
);

console.log(contract)