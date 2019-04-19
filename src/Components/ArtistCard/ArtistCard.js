import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { saveArtist, removeArtist } from "../../redux/actions";
import Favorite from "@material-ui/icons/Favorite";
import gql from "graphql-tag";

function mapStateToProps({ savedArtists }) {
  return {
    savedArtists: savedArtists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // TODO can I just pass id into redux actions?
    saveArtist: id => dispatch(saveArtist(id)),
    removeArtist: id => dispatch(removeArtist(id))
  };
}

const ArtistCard = ({
  imageUrl,
  displayLabel,
  id,
  saveArtist,
  removeArtist,
  savedArtists,
  classes
}) => {
  const [isSaved, setIsSaved] = useState(savedArtists.includes(id));

  const handleClick = () => {
    if (isSaved) {
      removeArtist(id);
    } else {
      saveArtist(id);
    }
    setIsSaved(!isSaved);
  };
  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <Favorite color={isSaved ? "secondary" : "default"} />
          </IconButton>
        }
        title={displayLabel}
      />
      <CardMedia className={classes.image} image={imageUrl} />
    </Card>
  );
};

ArtistCard.fragments = {
  ArtistCardArtist: gql`
    fragment ArtistCardArtist on Artist {
      id
      name
      artworks(page: 1) {
        displayLabel
        images {
          url
          title
        }
      }
    }
  `
};
const styles = theme => ({
  image: {
    height: 150
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ArtistCard));
