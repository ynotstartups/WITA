import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

function LoadingSpinner(props) {
  const { classes } = props
  return (
    <div className={classes.container} {...props}>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  )
}

const styles = theme => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
})

LoadingSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoadingSpinner)
