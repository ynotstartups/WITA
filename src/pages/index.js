import React from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"

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

const styles = () => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
})

export default withStyles(styles)(IndexPage)

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
