import React from "react";
import { Typography } from "@material-ui/core";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import Header from "../Components/Header/Header";
import ArtistCard from "../Components/ArtistCard/ArtistCard";

const mapStateToProps = state => {
  return { savedArtists: state.savedArtists };
};

const SAVED_ARTISTS = gql`
  query Artists($slugs: [String]) {
    artists(slugs: $slugs) {
      displayLabel
      imageUrl
      ...ArtistCardArtist
    }
  }
  ${ArtistCard.fragments.ArtistCardArtist}
`;

const PageSavedArtists = ({ savedArtists }) => {
  return (
    <>
      <Header />
      <Typography variant="h4" gutterBottom>
        Your saved Artist
      </Typography>
      <Query query={SAVED_ARTISTS} variables={{ slugs: savedArtists }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Grid container spacing={32}>
              {data.artists.map(({ displayLabel, imageUrl, id }, index) => {
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
    </>
  );
};

export default connect(mapStateToProps)(PageSavedArtists);
