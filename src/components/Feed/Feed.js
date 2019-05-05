import React from "react"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"

import ArtistCard from "../ArtistCard/ArtistCard"

const Feed = ({ ArtistsData }) => {
  return (
    <Grid container spacing={2}>
      {ArtistsData.map(node => (
        <Grid item xs={12} sm={6} md={3} key={node.id}>
          <ArtistCard {...node} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Feed

Feed.propTypes = {
  ArtistsData: PropTypes.arrayOf(
    PropTypes.shape({
      displayLabel: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
}
