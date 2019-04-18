import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createReducer, configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import { initialState } from "./redux/reducers";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// TODO is there a better way to do this?
it("renders without crashing", () => {
  const client = new ApolloClient({});
  const store = configureStore({ reducer: createReducer(initialState, {}) });
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
