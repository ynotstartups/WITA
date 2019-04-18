import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Favorite from "@material-ui/icons/Favorite";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { numberOfSaved: state.savedArtists.length };
};

const HeaderSavedArtist = ({ numberOfSaved }) => (
  <IconButton color="inherit">
    <Badge badgeContent={numberOfSaved} color="secondary">
      <Favorite />
    </Badge>
  </IconButton>
);

export default connect(mapStateToProps)(HeaderSavedArtist);
