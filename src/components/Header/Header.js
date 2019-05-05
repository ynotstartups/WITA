import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

import Link from "../Link"
import HeaderSavedArtist from "./HeaderSavedArtist/HeaderSavedArtist"
import HeaderSearchBar from "./HeaderSearchBar/HeaderSearchBar"

const Header = ({ classes }) => (
  <AppBar position="static" className={classes.container}>
    <Toolbar>
      <Link to="/" className={classes.link}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Who is this artist?
        </Typography>
      </Link>
      <HeaderSearchBar />
      <Link to="/" className={classes.link}>
        <HeaderSavedArtist />
      </Link>
    </Toolbar>
  </AppBar>
)

const styles = theme => ({
  container: { color: "white" },
  siteName: {
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
    },
    marginRight: "1rem",
  },
})

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withStyles(styles)(Header)
