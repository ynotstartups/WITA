import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import { changeSearchQuery } from "../../../redux/actions";
import { withStyles } from "@material-ui/core/styles";

function mapDispatchToProps(dispatch) {
  return {
    _changeSearchQuery: query => dispatch(changeSearchQuery(query))
  };
}

const HeaderSearchBar = ({ classes, _changeSearchQuery }) => {
  const [query, setQuery] = useState("Tiger");
  const handleSearchSubmit = event => {
    event.preventDefault();
    _changeSearchQuery(query);
    document.activeElement.blur();
  };

  return (
    <div className={classes.search}>
      <form onSubmit={handleSearchSubmit} action="#" method="get">
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
          <Button className={classes.searchIcon} color="inherit" type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

const styles = theme => ({
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
    color: "inherit",
    flex: 1
  },
  inputInput: {
    color: "inherit",
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    transition: theme.transitions.create("width"),
    width: "100%"
  }
});

export { HeaderSearchBar };

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(HeaderSearchBar));