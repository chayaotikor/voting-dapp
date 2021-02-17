import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore } from "@drizzle/store";
import { options } from "./drizzleOptions";

const store = generateStore(options);
const drizzle = new Drizzle(options, store);
console.log(drizzle)


ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <Router>
      <Route path={"/"} component={App} />
    </Router>
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

