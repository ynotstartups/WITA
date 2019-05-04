import React from "react"
import slug from "slug"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "../components/Link"

const IndexPage = props => {
  const { classes } = props

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={classes.container}>
        <Typography variant="h2">Collections</Typography>
        {props.data.allCollectionsJson.edges.map(({ node }) => {
          const { title } = node
          return (
            <Link
              key={title}
              to={`collections/${slug(title)}/`}
              color="primary"
            >
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
    allCollectionsJson {
      edges {
        node {
          title
        }
      }
    }
  }
`
