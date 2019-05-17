import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SavedArtists from "../components/SavedArtists/SavedArtists"

// TODO patch ./node_modules/graphql/utilities/assertValidName.js

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`WhoIsThisArtist`]} />
      <SavedArtists />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMovementsJson {
      edges {
        node {
          title
        }
      }
    }
  }
`
