import React from "react"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const Title = ({ children, classes }) => {
  return (
    <Typography className={classes.title} gutterBottom align={"center"}>
      {children}
    </Typography>
  )
}

const styles = theme => ({
  title: {
    fontSize: "2.125rem", // h4
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem", // h3
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.75rem", // h2
    },
  },
})

export default withStyles(styles)(Title)

Title.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}
