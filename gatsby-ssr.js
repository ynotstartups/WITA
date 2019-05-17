/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import { ApolloProvider } from "react-apollo"

import client from "./src/apollo"
import TopLayout from "./src/TopLayout"

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <TopLayout>{element}</TopLayout>
    </ApolloProvider>
  )
}
