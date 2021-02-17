import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Home } from "./components/Home";

const App = () => (
  <DrizzleContext.Consumer>
    {(context) => {
      const { drizzle, drizzleState, initialized } = context;

      if (!initialized) {
        return "Loading...";
      }
      return <Home drizzle={drizzle} drizzleState={drizzleState} />;
    }}
  </DrizzleContext.Consumer>
);

export default App;
