import React from "react";
import Gallery from "react-photo-gallery";
import PropTypes from "prop-types";

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 750) columns = 3;
  if (containerWidth >= 1000) columns = 4;
  return columns;
}

const ArtworkGallery = ({ photos }) => (
  <Gallery photos={photos} direction="column" columns={columns} margin={16} />
);

export default ArtworkGallery;

ArtworkGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  ).isRequired
};
