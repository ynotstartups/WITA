import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { saveArtist, removeArtist } from "../../redux/actions";
import Favorite from "@material-ui/icons/Favorite";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

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
  href,
  saveArtist,
  removeArtist,
  savedArtists,
  classes,
  history
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
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <Favorite color={isSaved ? "secondary" : "inherit"} />
          </IconButton>
        }
        title={displayLabel}
      />
      <CardActionArea
        onClick={() => {
          history.push(`/gallery/${id}`);
        }}
      >
        <CardMedia className={classes.image} image={imageUrl} />
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(`https://www.artsy.net${href}`);
          }}
        >
          Artsy
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(
              `https://en.wikipedia.org/wiki/${displayLabel.replace(/ /g, "_")}`
            );
          }}
        >
          Wikipedia
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(
              `https://www.google.com/search?tbm=isch&q=${displayLabel}`
            );
          }}
        >
          Google
        </Button>
      </CardActions>
    </Card>
  );
};

ArtistCard.fragments = {
  ArtistCardArtist: gql`
    fragment ArtistCardArtist on Artist {
      id
      name
      href
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
  card: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  image: {
    // LOL Artsy cropped it to 230
    height: 230,
    width: 230,
    margin: "auto",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ArtistCard)));
