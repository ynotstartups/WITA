import React, { useReducer } from "react";
import gql from "graphql-tag";
import { Typography } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

import Header from "../Components/Header/Header";
import ArtworkGallery from "../Components/ArtworkGallery/ArtworkGallery";
import { withApollo } from "react-apollo";

const ArtistImages = gql`
  query ArtistImages($id: String!, $page: Int!) {
    artist(id: $id) {
      displayLabel
      artworks(page: $page) {
        image {
          width
          height
          url
        }
      }
    }
  }
`;

const initialState = {
  photos: [],
  initFetchDone: false,
  displayLabel: null,
  page: 1,
  ended: false
};

function reducer(state, action) {
  switch (action.type) {
    case "append":
      return {
        photos: state.photos.concat(action.photos),
        displayLabel: action.displayLabel,
        initFetchDone: true,
        page: state.page + 1,
        ended: action.ended
      };
    default:
      throw new Error();
  }
}

function appendPhotos(displayLabel, photos, ended) {
  return {
    type: "append",
    photos,
    ended,
    displayLabel
  };
}

const PageArtistGallery = ({ savedArtists, match, client }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPhotos = async () => {
    const { data } = await client.query({
      query: ArtistImages,
      variables: { id: match.params.id, page: state.page }
    });

    const { artworks, displayLabel } = data.artist;
    const photos = artworks.map(({ image }) => ({
      width: image.width,
      height: image.height,
      src: image.url
    }));

    let ended = false;
    if (artworks.length === 0) {
      ended = true;
    }

    dispatch(appendPhotos(displayLabel, photos, ended));
  };

  return (
    <>
      <Header />
      <div style={{ padding: `16px 16px 0` }}>
        <Typography variant="h4" gutterBottom>
          Artwork Gallery for {state.displayLabel}
        </Typography>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchPhotos}
        hasMore={!state.ended}
        loader={<div key={0}>Loading ...</div>}
      >
        {state.photos.length !== 0 && <ArtworkGallery photos={state.photos} />}
      </InfiniteScroll>
    </>
  );
};

export default withApollo(PageArtistGallery);
