import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ArtistCard from "../components/ArtistCard/ArtistCard"

const Collection = data => {
  console.log(data)
  // const {artists, title} = data.pageContext;
  // console.log(artists);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Grid container spacing={2}>
        {data.data.artsy.artists.map(({ displayLabel, id, href, imageUrl }) => (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <ArtistCard
              displayLabel={displayLabel}
              href={href}
              imageUrl={imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query($artists: [String!]) {
    artsy {
      artists(slugs: $artists) {
        displayLabel
        href
        imageUrl
        name
      }
    }
  }
`
