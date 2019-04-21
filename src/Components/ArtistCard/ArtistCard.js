import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import ArtistSaveButton from './ArtistSaveButton/ArtistSaveButton';

const ArtistCard = ({
  imageUrl, displayLabel, id, href, classes, history,
}) => (
  <Card className={classes.card}>
    <CardHeader action={<ArtistSaveButton id={id} />} title={displayLabel} />
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
          window.open(`https://en.wikipedia.org/wiki/${displayLabel.replace(/ /g, '_')}`);
        }}
      >
          Wikipedia
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          window.open(`https://www.google.com/search?tbm=isch&q=${displayLabel}`);
        }}
      >
          Google
      </Button>
    </CardActions>
  </Card>
);

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
  `,
};

const styles = theme => ({
  card: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    // LOL Artsy cropped it to 230
    height: 230,
    width: 230,
    margin: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
});

export default withRouter(withStyles(styles)(ArtistCard));
