import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import CardActionArea from "@material-ui/core/CardActionArea"
import PropTypes from "prop-types"
import { navigate } from "@reach/router"

import ArtistSaveButton from "./ArtistSaveButton/ArtistSaveButton"

const AnchorButton = ({ href, children }) => {
  return (
    <Button
      size="small"
      color="primary"
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      style={{ color: "black" }}
    >
      {children}
    </Button>
  )
}

const ArtistCard = ({ imageUrl, displayLabel, id, href, classes }) => (
  <Card className={classes.card} elevation={2}>
    <CardHeader action={<ArtistSaveButton id={id} />} title={displayLabel} />
    <CardActionArea
      onClick={() => {
        navigate(`/gallery/${id}`)
      }}
    >
      <CardMedia
        className={classes.image}
        image={imageUrl || `${process.env.PUBLIC_URL}/img/no-image.jpg`}
      />
    </CardActionArea>
    <CardActions>
      <AnchorButton href={`https://www.artsy.net${href}`}>Artsy</AnchorButton>
      <AnchorButton
        href={`https://en.wikipedia.org/wiki/${displayLabel.replace(
          / /g,
          "_"
        )}`}
      >
        Wikipedia
      </AnchorButton>
      <AnchorButton
        href={`https://www.google.com/search?tbm=isch&q=${displayLabel}`}
      >
        Google
      </AnchorButton>
    </CardActions>
  </Card>
)

const styles = () => ({
  card: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "black 1px solid",
  },
  image: {
    // LOL Artsy cropped it to 230
    height: 230,
    width: 230,
    margin: "auto",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
})

ArtistCard.propTypes = {
  imageUrl: PropTypes.string,
  displayLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

ArtistCard.defaultProps = {
  imageUrl: "",
}

export default withStyles(styles)(ArtistCard)
