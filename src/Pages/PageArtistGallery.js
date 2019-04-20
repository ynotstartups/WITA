import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "../Components/Header/Header";
import ArtworkGallery from "../Components/ArtworkGallery/ArtworkGallery";

const ArtistImages = gql`
  query ArtistImages($id: String!) {
    artist(id: $id) {
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

const PageArtistGallery = ({ savedArtists }) => {
  return (
    <>
      <Header />
      {/* TODO make a content wrapper component */}
      <div style={{ padding: 32 }}>
        <Query query={ArtistImages} variables={{ id: "andy-warhol" }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            const photos = data.artist.artworks.map(({ image }) => ({
              width: image.width,
              height: image.height,
              src: image.url
            }));

            return <ArtworkGallery photos={photos} />;
          }}
        </Query>
      </div>
    </>
  );
};

export default PageArtistGallery;
