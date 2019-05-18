import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TemplateSearch from "../templates/TemplateSearch"
import MainContent from "../components/MainContent/MainContent"

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <SEO title="search" keywords={[`artist`, `search`]} />
      <MainContent>
        <Router>
          <TemplateSearch path="/search/:query" />
        </Router>
      </MainContent>
    </Layout>
  )
}

export default App
