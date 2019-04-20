import React, { useState, useReducer, useEffect } from "react";
import gql from "graphql-tag";
import { Typography } from "@material-ui/core";

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

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    // fetch on only 1 more screen of content left
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - window.innerHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

const PageArtistGallery = ({ savedArtists, match, client }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFetching, setIsFetching] = useInfiniteScroll(async () => {
    if (state.ended) {
      // for stopping the useInfiniteScroll callback being called
      setIsFetching(true);
      return;
    }

    await fetchPhotos();
    setIsFetching(false);
  });

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

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: 32 }}>
        {state.initFetchDone ? (
          <>
            <Typography variant="h4" gutterBottom>
              Artwork Gallery for {state.displayLabel}
            </Typography>
            <ArtworkGallery photos={state.photos} />
          </>
        ) : (
          <div>Loading...</div>
        )}
        {!state.ended && isFetching && <div>Loading...</div>}
        {state.ended && (
          <div>That's all the artworks in Artsy for this artist...</div>
        )}
      </div>
    </>
  );
};

export default withApollo(PageArtistGallery);
