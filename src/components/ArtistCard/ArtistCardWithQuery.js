import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import PropTypes from "prop-types"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import ArtistCard from "./ArtistCard"

const GET_ARTIST = gql`
  query Artist($id: String!) {
    artist(id: $id) {
      id
      displayLabel
      href
      imageUrl
    }
  }
`

function ArtistCardWithQuery({ id }) {
  return (
    <Query query={GET_ARTIST} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingSpinner />
        if (error) return `Error! ${error.message}`
        return <ArtistCard {...data.artist} />
      }}
    </Query>
  )
}

export default ArtistCardWithQuery

ArtistCardWithQuery.propTypes = {
  id: PropTypes.string.isRequired,
}
