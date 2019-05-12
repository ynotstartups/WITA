/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
/* eslint-disable import/prefer-default-export, react/prop-types */

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

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
