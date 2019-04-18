import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HeaderSavedArtist from "./HeaderSavedArtist/HeaderSavedArtist";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSearchBar";

const Header = ({ classes }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          WITA
        </Typography>
        <HeaderSearchBar />
        <HeaderSavedArtist />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
