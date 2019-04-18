import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDebounce } from "use-debounce";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Star from "@material-ui/icons/Star";

const SEARCH_ARTISTS = query => {
  return gql`
    {
      search(query: "${query}", entities: [ARTIST], first: 20) {
        edges {
          node {
            displayLabel
            imageUrl
            href
            ... on Artist {
              href
              name
              bio
              artworks(page: 1) {
                displayLabel
                images {
                  url
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
};

const App = ({ onDogSelected, classes }) => {
  const [query, setQuery] = useState("tiger");
  const [debouncedQuery] = useDebounce(query, 1000);

  window.setQuery = setQuery;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            WITA?
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={e => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Star />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 20 }}>
        <Query query={SEARCH_ARTISTS(debouncedQuery)}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Grid container spacing={32}>
                {data.search.edges.map(({ node }) => {
                  const { displayLabel, imageUrl, href, bio } = node;
                  return (
                    <Grid item xs={12} sm={6} md={3} justify="space-evenly">
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
                              window.open(`https://www.artsy.net${href}`);
                            }}
                          >
                            Save
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
                    </Grid>
                  );
                })}
              </Grid>
            );
          }}
        </Query>
      </div>
    </>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {},
  search: {
    position: "relative",
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {},
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

export default withStyles(styles)(App);
