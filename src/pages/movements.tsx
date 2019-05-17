import React from "react"
import { graphql } from "gatsby"
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { IFluidObject } from "gatsby-background-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/Title/Title"
import CollectionItem from "../components/CollectionItem/CollectionItem"

// the image name need to match path name for movements
// maybe I should add a new field with image name
function getImageFluid(name: String, images: any): IFluidObject {
  const image = images.filter(({ node }) => node.base.startsWith(name))
  const { node } = image[0]
  return node.childImageSharp.fluid
}

const styles = () =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  })

interface Props extends WithStyles<typeof styles> {
  data: any
}

const IndexPage: React.FunctionComponent<Props> = ({ data, classes }) => {
  return (
    <Layout>
      <SEO title="movements" keywords={[`artists`]} />
      <Title>Movements</Title>
      <div className={classes.container}>
        <Grid container>
          {data.allMovementsJson.edges.map(({ node }) => {
            const { title, path } = node
            return (
              <Grid item xs={6} sm={4} md={3} key={title}>
                <CollectionItem
                  href={`/movements/${path}`}
                  title={title}
                  imageFluid={getImageFluid(path, data.allFile.edges)}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </Layout>
  )
}

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
