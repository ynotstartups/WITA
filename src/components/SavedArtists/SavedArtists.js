import React, { useEffect } from "react"
import { Typography } from "@material-ui/core"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { connect } from "react-redux"
import { navigate } from "@reach/router"
import PropTypes from "prop-types"

import ArtistCard from "../ArtistCard/ArtistCard"

const mapStateToProps = state => ({
  savedArtists: state.savedArtists.slice().reverse(),
})

const SAVED_ARTISTS = gql`
  query Artists($slugs: [String]) {
    artists(slugs: $slugs) {
      id
      displayLabel
      href
      imageUrl
      name
    }
  }
`

const SavedArtists = ({ savedArtists }) => {
  useEffect(() => {
    if (savedArtists.length === 0) {
      // TODO: can I pass a name instead of hardcoding path?
      navigate("/collections/onboarding")
    }
  }, [savedArtists.length])

  return (
    <>
      <Typography variant="h2" gutterBottom align={"center"}>
        Your saved Artists
      </Typography>
      <Query query={SAVED_ARTISTS} variables={{ slugs: savedArtists }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          return (
            <Grid container spacing={2}>
              {data.artists.map(
                ({ imageUrl, displayLabel, id, href, classes, history }) => (
                  <Grid item xs={12} sm={6} md={3} key={id}>
                    <ArtistCard
                      {...{
                        imageUrl,
                        displayLabel,
                        id,
                        href,
                        classes,
                        history,
                      }}
                    />
                  </Grid>
                )
              )}
            </Grid>
          )
        }}
      </Query>
    </>
  )
}

export default connect(mapStateToProps)(SavedArtists)
SavedArtists.propTypes = {
  savedArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
}
