import React from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "../components/Link"

// TODO patch ./node_modules/graphql/utilities/assertValidName.js

const IndexPage = props => {
  const { classes } = props

  return (
    <Layout>
      <SEO title="Home" keywords={[`artist`, `WhoIsThisArtist`]} />
      <Link to={"/gallery/tiger"}>Gallery</Link>
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
    allCollectionsJson {
      edges {
        node {
          title
        }
      }
    }
  }
`
