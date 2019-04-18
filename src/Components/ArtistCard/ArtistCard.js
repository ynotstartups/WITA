import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { saveArtist, removeArtist } from "../../redux/actions";

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

const ConnectedArtiestCard = ({
  imageUrl,
  displayLabel,
  bio,
  href,
  saveArtist,
  removeArtist,
  savedArtists
}) => {
  const [isSaved, setIsSaved] = useState(savedArtists.includes(href));

  return (
    <Card>
      <CardMedia
        style={{ height: 150 }}
        image={imageUrl}
        title={`Art work by ${displayLabel}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {displayLabel}
        </Typography>
        <Typography component="p">{bio}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            if (isSaved) {
              removeArtist(href);
            } else {
              saveArtist(href);
            }
            setIsSaved(!isSaved);
          }}
        >
          {!isSaved ? "like" : "unlike"}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(`https://www.artsy.net${href}`);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

const ArtistCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedArtiestCard);

export default ArtistCard;
