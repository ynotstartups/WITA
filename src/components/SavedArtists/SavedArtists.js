import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { navigate } from "@reach/router"
import Grid from "@material-ui/core/Grid"

import Title from "../../components/Title/Title"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import ArtistCardWithQuery from "../../components/ArtistCard/ArtistCardWithQuery"

const SAVED_ARTISTS = gql`
  {
    savedArtists @client
  }
`

const SavedArtists = () => {
  const [savedArtists, setSavedArtists] = useState(undefined)

  useEffect(() => {
    if (savedArtists && savedArtists.length === 0) {
      navigate("/movements/onboarding")
    }
  })

  return (
    <>
      <Title>Your liked Artists</Title>
      <Query query={SAVED_ARTISTS}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingSpinner />
          if (error) return `Error! ${error.message}`

          setSavedArtists(data.savedArtists)
          return (
            <Grid container spacing={2}>
              {data.savedArtists.map(id => (
                <Grid item xs={12} sm={6} md={3} key={id}>
                  <ArtistCardWithQuery id={id} />
                </Grid>
              ))}
            </Grid>
          )
        }}
      </Query>
    </>
  )
}

export default SavedArtists
