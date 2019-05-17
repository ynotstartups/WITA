import React from "react"
import Typography from "@material-ui/core/Typography"
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles"

const styles = theme =>
  createStyles({
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

interface Props extends WithStyles<typeof styles> {
  children: string
}

const Title: React.FunctionComponent<Props> = ({ children, classes }) => {
  return (
    <Typography className={classes.title} gutterBottom align={"center"}>
      {children}
    </Typography>
  )
}

export default withStyles(styles)(Title)
