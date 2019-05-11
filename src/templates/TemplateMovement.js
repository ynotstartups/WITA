import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/Title/Title"
import Feed from "../components/Feed/Feed"

const Collection = props => {
  const { title } = props.pageContext
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Title>{title}</Title>
      <Feed ArtistsData={props.data.artsy.artists} />
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query($artists: [String!]) {
    artsy {
      artists(slugs: $artists) {
        id
        displayLabel
        href
        imageUrl
      }
    }
  }
`
