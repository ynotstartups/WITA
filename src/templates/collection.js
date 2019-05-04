import React from "react"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArtistCard from "../components/ArtistCard/ArtistCard"

const Collection = data => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Grid container spacing={2}>
        {data.data.artsy.artists.map(
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
