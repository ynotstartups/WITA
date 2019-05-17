import React from "react"
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = () =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  })

interface Props extends WithStyles<typeof styles> {
  key?: number
}

const LoadingSpinner: React.FunctionComponent<Props> = ({ classes, key }) => {
  return (
    <div className={classes.container} key={key}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default withStyles(styles)(LoadingSpinner)
