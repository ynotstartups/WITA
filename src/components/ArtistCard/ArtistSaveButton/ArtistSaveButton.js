import React, { useState, useEffect } from "react"
import IconButton from "@material-ui/core/IconButton"
import { connect } from "react-redux"
import Favorite from "@material-ui/icons/Favorite"
import PropTypes from "prop-types"

import { saveArtist, removeArtist } from "../../../redux/actions"

function mapStateToProps(state) {
  return {
    savedArtists: state.savedArtists,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSaveArtist: id => dispatch(saveArtist(id)),
    dispatchRemoveArtist: id => dispatch(removeArtist(id)),
  }
}

function ArtistSaveButton({
  id,
  savedArtists,
  dispatchSaveArtist,
  dispatchRemoveArtist,
}) {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setIsSaved(savedArtists.includes(id))
  }, [])

  const handleClick = () => {
    if (isSaved) {
      dispatchRemoveArtist(id)
    } else {
      dispatchSaveArtist(id)
    }
  }

  return (
    <IconButton onClick={handleClick}>
      <Favorite color={isSaved ? "secondary" : "inherit"} />
    </IconButton>
  )
}

ArtistSaveButton.propTypes = {
  id: PropTypes.string.isRequired,
  savedArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchSaveArtist: PropTypes.func.isRequired,
  dispatchRemoveArtist: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistSaveButton)

export { ArtistSaveButton as UnconnectedArtistSaveButton }
