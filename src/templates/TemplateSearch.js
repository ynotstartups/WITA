import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import PropTypes from "prop-types"
import ArtistCard from "../components/ArtistCard/ArtistCard"

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
    <Query query={SEARCH_ARTISTS} variables={{ query }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
          <>
            <Typography variant="h2" gutterBottom align={"center"}>
              Searching artists with name {query}
            </Typography>
            <Grid container spacing={2}>
              {data.search.edges.map(({ node }) => (
                <Grid item xs={12} sm={6} md={3} key={node.id}>
                  <ArtistCard {...node} />
                </Grid>
              ))}
            </Grid>
          </>
        )
      }}
    </Query>
  )
}

export default TemplateSearch

TemplateSearch.propTypes = {
  query: PropTypes.string.isRequired,
}
