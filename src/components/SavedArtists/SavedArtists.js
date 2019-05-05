import React, { useEffect } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import { navigate } from "@reach/router"
import PropTypes from "prop-types"

import Title from "../../components/Title/Title"
import Feed from "../../components/Feed/Feed"

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
      <Title>Your liked Artists</Title>
      <Query query={SAVED_ARTISTS} variables={{ slugs: savedArtists }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          return <Feed ArtistsData={data.artists} />
        }}
      </Query>
    </>
  )
}

export default connect(mapStateToProps)(SavedArtists)
SavedArtists.propTypes = {
  savedArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
}
