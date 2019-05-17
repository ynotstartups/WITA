import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

import Link from "../Link"
import HeaderSearchBar from "./HeaderSearchBar/HeaderSearchBar"

const styles = theme =>
  createStyles({
    container: { color: "black" },
    siteName: {
      pointerEvents: "none",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    noStyledLink: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
      },
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        textDecoration: "none",
      },
      marginRight: "1rem",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })

interface Props extends WithStyles<typeof styles> {}

const Header: React.FunctionComponent<Props> = ({ classes }) => (
  <AppBar position="sticky" className={classes.container}>
    <Toolbar>
      {/* 
        // @ts-ignore */}
      <Link to="/" className={classes.link}>
        <Typography variant="h6" color="inherit" noWrap>
          Who is this artist?
        </Typography>
      </Link>
      <HeaderSearchBar />
      {/* 
        // @ts-ignore */}
      <Button
        component={Link}
        className={classes.noStyledLink}
        to="/movements/"
        color="inherit"
      >
        Movements
      </Button>
      {/* 
        // @ts-ignore */}
      <Button
        component={Link}
        className={classes.noStyledLink}
        to="/"
        color="inherit"
      >
        Likes
      </Button>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
