import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Grid from "@material-ui/core/Grid";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import { connect } from "react-redux";
import Header from "./Components/Header/Header";

function mapStateToProps({ searchQuery }) {
  return {
    searchQuery: searchQuery
  };
}

const SEARCH_ARTISTS = query => {
  return gql`
    {
      search(query: "${query}", entities: [ARTIST], first: 20) {
        edges {
          node {
            displayLabel
            imageUrl
            ... on Artist {
              __id
              name
              artworks(page: 1) {
                displayLabel
                images {
                  url
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
};

const App = ({ classes, searchQuery, changeSearchQuery }) => {
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Query query={SEARCH_ARTISTS(searchQuery)}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Grid container spacing={32}>
                {data.search.edges.map(({ node }, index) => {
                  const { displayLabel, imageUrl, __id: id } = node;
                  return (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <ArtistCard {...{ displayLabel, imageUrl, id }} />
                    </Grid>
                  );
                })}
              </Grid>
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(App);
