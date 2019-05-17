import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TemplateSearch from "../templates/TemplateSearch"

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <SEO title="search" keywords={[`artist`, `search`]} />
      <Router>
        <TemplateSearch path="/search/:query" />
      </Router>
    </Layout>
  )
}

export default App
