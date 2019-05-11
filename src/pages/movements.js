import React from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/Title/Title"
import CollectionItem from "../components/CollectionItem/CollectionItem"

// the image name need to match path name for movements
// maybe I should add a new field with image name
function getImageFluid(name, images) {
  const image = images.filter(({ node }) => node.base.startsWith(name))
  const { node } = image[0]
  return node.childImageSharp.fluid
}

const IndexPage = props => {
  const { classes } = props
  return (
    <Layout>
      <SEO title="movements" keywords={[`artists`]} />
      <Title>Movements</Title>
      <div className={classes.container}>
        <Grid container>
          {props.data.allMovementsJson.edges.map(({ node }) => {
            const { title, path } = node
            return (
              <Grid item xs={6} sm={4} md={3} key={title}>
                <CollectionItem
                  href={`/movements/${path}`}
                  title={title}
                  imageFluid={getImageFluid(path, props.data.allFile.edges)}
                />
              </Grid>
            )
          })}
        </Grid>
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
    allMovementsJson(filter: { path: { ne: "onboarding" } }) {
      edges {
        node {
          title
          path
        }
      }
    }

    allFile(filter: { relativePath: { glob: "*.jpg" } }) {
      edges {
        node {
          base
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
