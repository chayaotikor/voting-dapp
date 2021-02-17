import React from "react";
import { DrizzleContext } from '@drizzle/react-plugin'
import { Home } from './components/Home';
import { Drizzle, generateStore } from "@drizzle/store";
import { options } from "./drizzleOptions";

const store = generateStore(options);
const drizzle = new Drizzle(options, store);

const App =() => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext

          if (!initialized) {
            return "Loading..."
          }
          return (
            <Home drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}

        </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
