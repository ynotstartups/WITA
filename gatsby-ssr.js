/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
/* eslint-disable import/prefer-default-export, react/prop-types */

import React from "react"
import { Provider } from "react-redux"
import { ApolloProvider } from "react-apollo"

import client from "./src/apollo"
import TopLayout from "./src/TopLayout"
import createStore from "./src/redux/store"

export const wrapRootElement = ({ element }) => {
  const store = createStore()
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <TopLayout>{element}</TopLayout>
      </ApolloProvider>
    </Provider>
  )
}
