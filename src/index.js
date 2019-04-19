import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";

// TODO
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net/"
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
