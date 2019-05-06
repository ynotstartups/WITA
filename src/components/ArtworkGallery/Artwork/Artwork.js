import React from "react"
import PropTypes from "prop-types"
import { withTheme } from "@material-ui/core/styles"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import OpenInNew from "@material-ui/icons/OpenInNew"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"

const cont = {
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
  classes,
}) => {
  if (direction === "column") {
    cont.position = "absolute"
    cont.left = left
    cont.top = top
  }

  const { sm } = theme.breakpoints.values
  let height = 16
  let width = 0
  if (window.innerWidth >= sm) {
    width = 16
  }

  return (
    <div
      style={{
        display: "flex",
        height: photo.height - height,
        width: photo.width - width,
        marginVertical: height / 2,
        marginHorizontal: width / 2,
        ...cont,
        justifyContent: "center",
      }}
      className={classes.container}
    >
      <img
        src={photo.src}
        height={photo.height - height}
        width={photo.width - width}
        alt={photo.title}
      />
      <GridListTileBar
        title={photo.title}
        className={classes.bar}
        actionIcon={
          <Tooltip
            title="Open In Artsy"
            aria-label="Open In Artsy"
            placement="top"
          >
            <IconButton
              aria-label="Open In Artsy"
              href={`https://www.artsy.net${photo.href}`}
              rel="noopener noreferrer"
              target="_blank"
              className={classes.button}
            >
              <OpenInNew style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        }
      />
    </div>
  )
}

const styles = () => ({
  container: {
    "&:hover $bar": {
      visibility: "visible",
    },
  },
  bar: {
    padding: "3px 3px 3px 0",
    visibility: "hidden",
  },
  button: {
    marginVertical: 5,
  },
})

export default withTheme(withStyles(styles)(Artwork))

Artwork.propTypes = {
  photo: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
