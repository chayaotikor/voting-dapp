import React from "react";
import { ContractData, AccountData } from "@drizzle/react-components";

export const Home = ({ drizzleState, drizzle }) => {
  return (
    <>
      <AccountData
        drizzle={drizzle}
        drizzleState={drizzleState}
        accountIndex={0}
        units="ether"
        precision={3}
      />
      <ContractData contract="Plurality" />
    </>
  );
};
