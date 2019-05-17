import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

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

interface Props {
  id: String
}

const ArtistCardWithQuery: React.FunctionComponent<Props> = ({ id }) => {
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
