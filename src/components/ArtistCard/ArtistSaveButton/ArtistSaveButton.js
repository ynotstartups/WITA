import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';


function ArtistSaveButton({
  id, savedArtists,
  // dispatchSaveArtist, dispatchRemoveArtist,
}) {
  const isSaved = savedArtists.includes(id);

  const handleClick = () => {
    // if (isSaved) {
    //   dispatchRemoveArtist(id);
    // } else {
    //   dispatchSaveArtist(id);
    // }
  };

  return (
    <IconButton onClick={handleClick}>
      <Favorite color={isSaved ? 'secondary' : 'inherit'} />
    </IconButton>
  );
}

ArtistSaveButton.propTypes = {
  id: PropTypes.string.isRequired,
  savedArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchSaveArtist: PropTypes.func.isRequired,
  dispatchRemoveArtist: PropTypes.func.isRequired,
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ArtistSaveButton);

export default ArtistSaveButton
