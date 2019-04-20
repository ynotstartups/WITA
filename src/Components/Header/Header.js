import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HeaderSavedArtist from "./HeaderSavedArtist/HeaderSavedArtist";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSearchBar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const Header = ({ classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.siteName}>
          <Typography variant="h6" color="inherit" noWrap>
            Who is this artist?
          </Typography>
        </div>
        <HeaderSearchBar />
        <Link to="/" className={classes.link}>
          <HeaderSavedArtist />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  siteName: { pointerEvents: "none" },
  link: { textDecoration: "none", color: "inherit" }
});

export default withStyles(styles)(Header);
