import Plurality from "./artifacts/Plurality.json";

export const options = {
  contracts: [Plurality],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};