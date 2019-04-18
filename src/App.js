import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useDebouncedCallback from "use-debounce/lib/callback";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import ArtistCard from "./Components/ArtistCard/ArtistCard";
import SavedArtist from "./Components/SavedArtist/SavedArtist";
import { changeSearchQuery } from "./redux/actions";
import { connect } from "react-redux";

// redux-persist doesn't work with immer
// https://github.com/rt2zz/redux-persist/issues/747
// setAutoFreeze(false);

function mapStateToProps({ searchQuery }) {
  return {
    searchQuery: searchQuery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSearchQuery: query => dispatch(changeSearchQuery(query))
  };
}

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

const App = ({ classes, searchQuery, changeSearchQuery }) => {
  const [query, setQuery] = useState("Tiger");
  const handleSearchSubmit = event => {
    event.preventDefault();
    changeSearchQuery(query);
  };

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
            WITA
          </Typography>
          <div className={classes.search}>
            <form onSubmit={handleSearchSubmit}>
              <div className={classes.searchFrom}>
                <Input
                  placeholder="Search…"
                  type="search"
                  name="query"
                  value={query}
                  onChange={event => {
                    setQuery(event.target.value);
                  }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  disableUnderline
                />
                <Button
                  className={classes.searchIcon}
                  color="inherit"
                  type="submit"
                >
                  <SearchIcon />
                </Button>
              </div>
            </form>
          </div>
          <SavedArtist />
        </Toolbar>
      </AppBar>
      <div style={{ padding: 20 }}>
        <Query query={SEARCH_ARTISTS(searchQuery)}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Grid container spacing={32}>
                {data.search.edges.map(({ node }) => {
                  const { displayLabel, imageUrl, href, bio } = node;
                  return (
                    <Grid item xs={12} sm={6} md={3} justify="space-evenly">
                      <ArtistCard {...{ displayLabel, imageUrl, href, bio }} />
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
  searchFrom: {
    display: "flex",
    alignItems: "center"
  },
  search: {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    color: "inherit",
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
