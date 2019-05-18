import React, { useReducer } from "react"
import gql from "graphql-tag"
import InfiniteScroll from "react-infinite-scroller"

import ArtworkGallery from "../components/ArtworkGallery/ArtworkGallery"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import ArtistBar from "../components/ArtistBar/ArtistBar"
import { withApollo } from "react-apollo"
import MainContent from "../components/MainContent/MainContent"

// https://github.com/apollographql/apollo-client/issues/2510
// the id field below artists is not used by me but the store needs it for
// handing cache
const ArtistImages = gql`
  query ArtistImages($id: String!, $page: Int!) {
    artist(id: $id) {
      id
      displayLabel
      artworks(page: $page) {
        title
        href
        image {
          width
          height
          url
        }
      }
    }
  }
`

interface Photo {
  width: number
  height: number
  src: string
  href: string
  title: string
}

interface Action {
  type: "append"
  displayLabel: string
  ended: boolean
  photos: Photo[]
}

interface State {
  photos: Photo[]
  initFetchDone: boolean
  displayLabel: string
  page: number
  ended: boolean
}

const initialState: State = {
  photos: [] as Photo[],
  initFetchDone: false,
  displayLabel: "",
  page: 1,
  ended: false,
}

function reducer(state: State, action: Action) {
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

function appendPhotos(
  displayLabel: string,
  photos: Photo[],
  ended: boolean
): Action {
  return {
    type: "append",
    photos,
    ended,
    displayLabel,
  }
}

interface Props {
  id: string
  client: any
}
const PageArtistGallery: React.FunctionComponent<Props> = ({ client, id }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchPhotos = async () => {
    const { data } = await client.query({
      query: ArtistImages,
      variables: { id, page: state.page },
    })

    const { artworks, displayLabel } = data.artist
    const photos = artworks.map(({ image, title, href }) => ({
      width: image.width,
      height: image.height,
      src: image.url,
      href: href,
      title,
    }))

    let ended = false
    if (artworks.length === 0) {
      ended = true
    }

    dispatch(appendPhotos(displayLabel, photos, ended))
  }

  return (
    <>
      <MainContent>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchPhotos}
          hasMore={!state.ended}
          loader={<LoadingSpinner key={0} />}
        >
          {state.photos.length !== 0 && (
            <ArtworkGallery photos={state.photos} />
          )}
        </InfiniteScroll>
      </MainContent>
      <ArtistBar displayLabel={state.displayLabel} id={id} />
    </>
  )
}

export default withApollo(PageArtistGallery)
