import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore, EventActions } from "@drizzle/store";
import Plurality from "./artifacts/Plurality.json";
import { toast } from "react-toastify";

const contractEventNotifier = (store) => (next) => (action) => {
  if (action.type === EventActions.TX_ERROR) {
    const contract = action.name;
    const contractEvent = action.event.event;
    const message = action.event.returnValues._message;
    const display = `${contract}(${contractEvent}): ${message}`;

    toast.success(display, { position: toast.POSITION.TOP_RIGHT });
  }
  return next(action);
};

const options = {
  contracts: [Plurality],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};

const middleware = [contractEventNotifier]
const store = generateStore({  options,
  middleware,
  disableReduxDevTools: false
});
  
console.log(store)
const drizzle = new Drizzle(options, store);

ReactDOM.render(
    <Router>
      <App drizzle = {drizzle} />
    </Router>,
  document.getElementById("root")
);
