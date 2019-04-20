import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Typography } from "@material-ui/core";

import Header from "../Components/Header/Header";
import ArtworkGallery from "../Components/ArtworkGallery/ArtworkGallery";

const ArtistImages = gql`
  query ArtistImages($id: String!) {
    artist(id: $id) {
      displayLabel
      artworks(size: 50) {
        image {
          width
          height
          url
        }
      }
    }
  }
`;

const PageArtistGallery = ({ savedArtists, match }) => {
  return (
    <>
      <Header />
      {/* TODO make a content wrapper component */}
      <div style={{ padding: 32 }}>
        <Query query={ArtistImages} variables={{ id: match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const { artworks, displayLabel } = data.artist;
            const photos = data.artist.artworks.map(({ image }) => ({
              width: image.width,
              height: image.height,
              src: image.url
            }));

            return (
              <>
                <Typography variant="h4" gutterBottom>
                  Artwork Gallery for {displayLabel}
                </Typography>
                <ArtworkGallery photos={photos} />
              </>
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default PageArtistGallery;
