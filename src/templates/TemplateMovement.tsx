import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/Title/Title"
import Feed from "../components/Feed/Feed"
import MainContent from "../components/MainContent/MainContent"

interface PageContext {
  title: string
  artistsNameImageMap: object
}

interface Props {
  pageContext: PageContext
  data: any
}

const Collection: React.FunctionComponent<Props> = ({ pageContext, data }) => {
  const artistsNameImageMap = pageContext.artistsNameImageMap
  const artists = data.artsy.artists.map(artist => {
    const givenImageUrl = artistsNameImageMap[artist.id]
    if (givenImageUrl !== "") {
      artist.imageUrl = givenImageUrl
    }
    return artist
  })

  const { title } = pageContext
  return (
    <Layout>
      <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
      <MainContent>
        <Title>{`${title}`}</Title>
        <Feed artistsData={artists} />
      </MainContent>
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query($artistsName: [String!]) {
    artsy {
      artists(slugs: $artistsName) {
        id
        displayLabel
        href
        imageUrl
      }
    }
  }
`
