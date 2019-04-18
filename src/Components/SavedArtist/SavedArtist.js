import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Star from "@material-ui/icons/Star";
import { connect } from "react-redux";

const ConnectedSavedArtist = ({ numberOfSaved }) => (
  <IconButton color="inherit">
    <Badge badgeContent={numberOfSaved} color="primary">
      <Star />
    </Badge>
  </IconButton>
);

const mapStateToProps = state => {
  return { numberOfSaved: state.savedArtists.length };
};
const SavedArtist = connect(mapStateToProps)(ConnectedSavedArtist);

export default SavedArtist;
