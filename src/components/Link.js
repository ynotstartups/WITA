import React from "react"
import MuiLink from "@material-ui/core/Link"
import { Link as GastsbyLink } from "gatsby"

class Link extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return <MuiLink component={GastsbyLink} {...this.props} />
  }
}

export default Link
