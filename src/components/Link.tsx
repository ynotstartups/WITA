import React from "react"
import MuiLink from "@material-ui/core/Link"
import { Link as GatsbyLink } from "gatsby"

class Link extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    // @ts-ignore
    return <MuiLink component={GatsbyLink} {...this.props} />
  }
}

export default Link
