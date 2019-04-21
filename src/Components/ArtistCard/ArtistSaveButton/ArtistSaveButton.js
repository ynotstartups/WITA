import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { saveArtist, removeArtist } from "../../../redux/actions";
import Favorite from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";

function mapStateToProps(state) {
  return {
    savedArtists: state.savedArtists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSaveArtist: id => dispatch(saveArtist(id)),
    dispatchRemoveArtist: id => dispatch(removeArtist(id))
  };
}

function ArtistSaveButton({
  id,
  savedArtists,
  dispatchSaveArtist,
  dispatchRemoveArtist
}) {
  const isSaved = savedArtists.includes(id);
  console.log("isSaved", isSaved);

  const handleClick = () => {
    if (isSaved) {
      console.log("isSaved", isSaved);
      dispatchRemoveArtist(id);
    } else {
      dispatchSaveArtist(id);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <Favorite color={isSaved ? "secondary" : "inherit"} />
    </IconButton>
  );
}

ArtistSaveButton.propTypes = {
  id: PropTypes.string.isRequired,
  savedArtists: PropTypes.array.isRequired,
  dispatchSaveArtist: PropTypes.func.isRequired,
  dispatchRemoveArtist: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistSaveButton);

export { ArtistSaveButton as UnconnectedArtistSaveButton };
