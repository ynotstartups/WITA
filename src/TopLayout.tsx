import React from "react"
import { Helmet } from "react-helmet"
import { ThemeProvider } from "@material-ui/styles"

import theme from "./theme"

interface Props {
  children: React.ReactNode
}

const TopLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </Helmet>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </React.Fragment>
  )
}

export default TopLayout
