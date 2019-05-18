import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/Title/Title"
import Feed from "../components/Feed/Feed"
import MainContent from "../components/MainContent/MainContent"

interface PageContext {
  title: String
}

interface Props {
  pageContext: PageContext
  data: any
}

const Collection: React.FunctionComponent<Props> = ({ pageContext, data }) => {
  const { title } = pageContext
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Title>{`${title}`}</Title>
      <MainContent>
        <Feed artistsData={data.artsy.artists} />
      </MainContent>
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
