import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { RouteComponentProps } from "@reach/router"

import Title from "../components/Title/Title"
import Feed from "../components/Feed/Feed"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

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
            birthday
            deathday
            nationality
          }
        }
      }
    }
  }
`

interface Props extends RouteComponentProps {}

// https://github.com/reach/router/issues/147
// Prop query is auto generated by Reach Router
// @ts-ignore
const TemplateSearch: React.FunctionComponent<Props> = ({ query }) => {
  return (
    <>
      <Title>{`Searching artists with name ${query}`}</Title>
      <Query query={SEARCH_ARTISTS} variables={{ query }}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingSpinner />
          if (error) return <h1>{`Error! ${error.message}`}</h1>
          return (
            <Feed artistsData={data.search.edges.map(({ node }) => node)} />
          )
        }}
      </Query>
    </>
  )
}

export default TemplateSearch
