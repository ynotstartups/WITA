import React from "react"
import Gallery from "react-photo-gallery"
import PropTypes from "prop-types"
import { withTheme } from "@material-ui/core/styles"

const ArtworkGallery = ({ theme, photos, id }) => {
  const { sm, md, lg } = theme.breakpoints.values
  function columns(containerWidth) {
    let columnsNumber = 1
    if (containerWidth >= sm) columnsNumber = 2
    if (containerWidth >= md) columnsNumber = 3
    if (containerWidth >= lg) columnsNumber = 4
    return columnsNumber
  }

  return (
    <Gallery photos={photos} direction="column" columns={columns} margin={16} />
  )
}

export default withTheme(ArtworkGallery)

ArtworkGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    })
  ).isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}
