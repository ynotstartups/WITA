import React, { useState } from "react"
import { navigate } from "@reach/router"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import { fade } from "@material-ui/core/styles/colorManipulator"
import SearchIcon from "@material-ui/icons/Search"
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles"

const handleSearchSubmit = (event, query) => {
  event.preventDefault()

  // do nothing if it is empty query
  if (query === "") {
    return
  }

  ;(document.activeElement as HTMLElement).blur()
  navigate(`/search/${query}`)
}

const styles = theme =>
  createStyles({
    searchFrom: {
      display: "flex",
      alignItems: "center",
    },
    search: {
      flex: 1,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        margin: `0 ${theme.spacing(2)}px`,
      },
    },
    searchIcon: {
      width: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    inputRoot: {
      color: "inherit",
      flex: 1,
    },
    inputInput: {
      color: "inherit",
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })

interface Props extends WithStyles<typeof styles> {}

const HeaderSearchBar: React.FunctionComponent<Props> = ({ classes }) => {
  const [query, setQuery] = useState("")

  return (
    <div className={classes.search}>
      <form
        onSubmit={event => handleSearchSubmit(event, query)}
        action="#"
        method="get"
      >
        <div className={classes.searchFrom}>
          <Input
            placeholder="Search by Artist name…"
            type="search"
            name="query"
            value={query}
            onChange={event => {
              setQuery(event.target.value)
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            disableUnderline
          />
          <Button className={classes.searchIcon} color="inherit" type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </div>
  )
}

export { HeaderSearchBar as UnconnectedHeaderSearchBar }

export default withStyles(styles)(HeaderSearchBar)
