import React from "react"
import PropTypes from "prop-types"
import { withTheme } from "@material-ui/core/styles"

const cont = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
}

const Artwork = ({
  theme,
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
}) => {
  if (direction === "column") {
    cont.position = "absolute"
    cont.left = left
    cont.top = top
  }

  const { sm, md, lg } = theme.breakpoints.values
  let height = 16
  let width = 0
  if (window.innerWidth >= sm) {
    width = 16
  }

  return (
    <div
      style={{
        display: "flex",
        height: photo.height,
        width: photo.width,
        ...cont,
        justifyContent: "center",
      }}
    >
      <img
        src={photo.src}
        height={photo.height - height}
        width={photo.width - width}
        alt={photo.title}
      />
    </div>
  )
}

const styles = theme => ({
  container: {
    paddingBottom: theme.spacing(1),
  },
})

export default withTheme(Artwork)

Artwork.propTypes = {
  photo: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
