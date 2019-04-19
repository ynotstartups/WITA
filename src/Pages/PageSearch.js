import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import ArtistCard from "../Components/ArtistCard/ArtistCard";
import Header from "../Components/Header/Header";
import { Typography } from "@material-ui/core";

function mapStateToProps({ searchQuery }) {
  return {
    searchQuery: searchQuery
  };
}

console.log(ArtistCard.fragments.ArtistCardArtist);

// cannot reuse fragments because `GraphQL error on Artsy side, named fragment spread is currently not supported`
const SEARCH_ARTISTS = query => {
  return gql`
    {
      search(query: "${query}", entities: [ARTIST], first: 20) {
        edges {
          node {
            displayLabel
            imageUrl
            ... on Artist {
              id
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

const PageSearch = ({ classes, searchQuery, changeSearchQuery }) => {
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Query query={SEARCH_ARTISTS(searchQuery)}>
          {({ loading, error, data }) => {
            console.log(SEARCH_ARTISTS(searchQuery));
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <Typography variant="h4" gutterBottom>
                  Search artists with name {searchQuery}
                </Typography>
                <Grid container spacing={32}>
                  {data.search.edges.map(({ node }, index) => {
                    const { displayLabel, imageUrl, id } = node;
                    return (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <ArtistCard {...{ displayLabel, imageUrl, id }} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(PageSearch);
