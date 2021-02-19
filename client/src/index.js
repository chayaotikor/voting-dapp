import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore } from "@drizzle/store";
import Plurality from "./artifacts/Plurality.json";


const options = {
  contracts: [Plurality],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};
const store = generateStore(options);
const drizzle = new Drizzle(options, store);

ReactDOM.render(
    <Router>
      <App drizzle = {drizzle} />
    </Router>,
  document.getElementById("root")
);
