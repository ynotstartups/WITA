import React from "react"
import Gallery from "react-photo-gallery"
import { withTheme } from "@material-ui/core/styles"

import Artwork, { Photo } from "./Artwork/Artwork"

interface Props {
  theme: any
  photos: Photo[]
}

const ArtworkGallery: React.FunctionComponent<Props> = ({ theme, photos }) => {
  const { sm, md, lg } = theme.breakpoints.values
  function columns(containerWidth) {
    let columnsNumber = 1
    if (containerWidth >= sm) columnsNumber = 2
    if (containerWidth >= md) columnsNumber = 3
    if (containerWidth >= lg) columnsNumber = 4
    return columnsNumber
  }

  return (
    <Gallery
      photos={photos}
      direction="column"
      columns={columns}
      margin={0}
      // @ts-ignore
      renderImage={Artwork}
    />
  )
}

export default withTheme(ArtworkGallery)
