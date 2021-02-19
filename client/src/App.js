import React from "react";
import { ApolloProvider } from "@apollo/client";
import { gql } from "@apollo/client";

function App({ client }) {
  return (
    console.log(client),
    (
      <ApolloProvider client={client}>
        <div>
          <h1>Apollo Up</h1>
        </div>
      </ApolloProvider>
    )
  );
}

export default App;
