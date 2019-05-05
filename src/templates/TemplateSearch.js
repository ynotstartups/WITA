import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import PropTypes from "prop-types"

import Title from "../components/Title/Title"
import Feed from "../components/Feed/Feed"

// cannot reuse fragments because `GraphQL error on Artsy side
// named fragment spread is currently not supported`
const SEARCH_ARTISTS = gql`
  query Search($query: String!) {
    search(query: $query, entities: [ARTIST], first: 20) {
      edges {
        node {
          displayLabel
          imageUrl
          ... on Artist {
            id
            name
            href
          }
        }
      }
    }
  }
`

const TemplateSearch = ({ query }) => {
  return (
    <>
      <Title>Searching artists with name {query}</Title>
      <Query query={SEARCH_ARTISTS} variables={{ query }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          return (
            <Feed ArtistsData={data.search.edges.map(({ node }) => node)} />
          )
        }}
      </Query>
    </>
  )
}

export default TemplateSearch

TemplateSearch.propTypes = {
  query: PropTypes.string.isRequired,
}
