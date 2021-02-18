import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/id/QmNaQtEMH9woCmaZWVhqUknEjepp73azwnVJvV1q4oCGW1",
  cache: new InMemoryCache(),
});
console.log(client)

ReactDOM.render(
  <Router>
    <App client={client} />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
