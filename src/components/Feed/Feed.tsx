import React from "react"
import Grid from "@material-ui/core/Grid"

import ArtistCard from "../ArtistCard/ArtistCard"

interface ArtistsData {
  displayLabel: string
  id: string
  href: string
  imageUrl: string
}

interface Props {
  artistsData: ArtistsData[]
}

const Feed: React.FunctionComponent<Props> = ({ artistsData }) => {
  return (
    <Grid container spacing={2}>
      {artistsData.map(node => (
        <Grid item xs={12} sm={6} md={3} key={node.id}>
          <ArtistCard {...node} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Feed
