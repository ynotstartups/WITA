import React from "react"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import OpenInNew from "@material-ui/icons/OpenInNew"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import {
  createStyles,
  withStyles,
  withTheme,
  WithStyles,
} from "@material-ui/styles"

const styles = () =>
  createStyles({
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

enum Direction {
  column = "column",
  row = "row",
}

export interface Photo {
  src: string
  width: number
  height: number
  title: string
  href: string
}

interface Props extends WithStyles<typeof styles> {
  top: number
  left: number
  direction: Direction
  theme: any
  photo: Photo
}

const Artwork: React.FunctionComponent<Props> = ({
  theme,
  photo,
  direction,
  top,
  left,
  classes,
}) => {
  const cont = {
    overflow: "hidden",
    position: "absolute" as "absolute",
    left: 0,
    top: 0,
  }

  if (direction === "column") {
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

export default withTheme(withStyles(styles)(Artwork))
