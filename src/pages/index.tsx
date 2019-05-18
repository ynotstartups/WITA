import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SavedArtists from "../components/SavedArtists/SavedArtists"
import MainContent from "../components/MainContent/MainContent"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`WhoIsThisArtist`]} />
      <MainContent>
        <SavedArtists />
      </MainContent>
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
