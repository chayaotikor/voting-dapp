import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import { ToastContainer } from "react-toastify";
const {AccountData, ContractData, ContractForm} = newContextComponents

function App({ drizzle }) {
    return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <>
              <ToastContainer />
              <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                sendArgs={{ from: drizzleState.accounts[0] }}
                contract="Plurality"
                method="register"
                labels={["voter address"]}

              />

              {/* <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="Plurality"
                method="getTotalProposals"
              /> */}
            </>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>

    );
}

export default App;
