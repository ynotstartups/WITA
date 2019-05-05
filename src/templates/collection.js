import React from "react"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArtistCard from "../components/ArtistCard/ArtistCard"

const Collection = props => {
  const { title } = props.pageContext
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Typography variant="h2" gutterBottom align={"center"}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {props.data.artsy.artists.map(
          ({ name, displayLabel, id, href, imageUrl }) => (
            <Grid item xs={12} sm={6} md={3} key={id}>
              <ArtistCard
                displayLabel={displayLabel}
                href={href}
                imageUrl={imageUrl}
                id={id}
              />
            </Grid>
          )
        )}
      </Grid>
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query($artists: [String!]) {
    artsy {
      artists(slugs: $artists) {
        id
        displayLabel
        href
        imageUrl
        name
      }
    }
  }
`
