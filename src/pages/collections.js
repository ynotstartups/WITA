import React from "react"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "../components/Link"
import Title from "../components/Title/Title"

const IndexPage = props => {
  const { classes } = props

  return (
    <Layout>
      <SEO title="collections" keywords={[`artists`]} />
      <div className={classes.container}>
        <Title>Collections</Title>
        {props.data.allCollectionsJson.edges.map(({ node }) => {
          const { title, path } = node
          return (
            <Link key={title} to={`/collections/${path}`} color="primary">
              <Typography variant="h5">{title}</Typography>
            </Link>
          )
        })}
      </div>
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
    allCollectionsJson(filter: { path: { ne: "onboarding" } }) {
      edges {
        node {
          title
          path
        }
      }
    }
  }
`
