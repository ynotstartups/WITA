import React, { useReducer } from "react"
import gql from "graphql-tag"
import InfiniteScroll from "react-infinite-scroller"
import PropTypes from "prop-types"

import { withApollo } from "react-apollo"
import ArtworkGallery from "../components/ArtworkGallery/ArtworkGallery"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const ArtistImages = gql`
  query ArtistImages($id: String!, $page: Int!) {
    artist(id: $id) {
      displayLabel
      artworks(page: $page) {
        title
        image {
          width
          height
          url
        }
      }
    }
  }
`

const initialState = {
  photos: [],
  initFetchDone: false,
  displayLabel: null,
  page: 1,
  ended: false,
}

function reducer(state, action) {
  switch (action.type) {
    case "append":
      return {
        photos: state.photos.concat(action.photos),
        displayLabel: action.displayLabel,
        initFetchDone: true,
        page: state.page + 1,
        ended: action.ended,
      }
    default:
      throw new Error()
  }
}

function appendPhotos(displayLabel, photos, ended) {
  return {
    type: "append",
    photos,
    ended,
    displayLabel,
  }
}

const PageArtistGallery = ({ client, id }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchPhotos = async () => {
    const { data } = await client.query({
      query: ArtistImages,
      variables: { id, page: state.page },
    })

    const { artworks, displayLabel } = data.artist
    const photos = artworks.map(({ image, title }) => ({
      width: image.width,
      height: image.height,
      src: image.url,
      title,
    }))

    let ended = false
    if (artworks.length === 0) {
      ended = true
    }

    dispatch(appendPhotos(displayLabel, photos, ended))
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchPhotos}
      hasMore={!state.ended}
      loader={<LoadingSpinner key={0} />}
    >
      {state.photos.length !== 0 && <ArtworkGallery photos={state.photos} />}
    </InfiniteScroll>
  )
}

export default withApollo(PageArtistGallery)

PageArtistGallery.propTypes = {
  id: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}
