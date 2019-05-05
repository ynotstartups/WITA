import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TemplateArtworkGallery from "../templates/TemplateArtworkGallery"

const App = () => {
  return (
    <Layout>
      <SEO title="gallery" keywords={[`artist`, `gallery`]} />
      <Router>
        <TemplateArtworkGallery path="/gallery/:id" />
      </Router>
    </Layout>
  )
}

export default App
