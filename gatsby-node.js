const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/gallery/)) {
    page.matchPath = "/gallery/*"
    createPage(page)
  }

  if (page.path.match(/^\/search/)) {
    page.matchPath = "/search/*"
    createPage(page)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allCollectionsJson {
          edges {
            node {
              title
              artists
              path
              image
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create image post pages.
    const collectionTemplate = path.resolve(`src/templates/collection.js`)
    result.data.allCollectionsJson.edges.forEach(edge => {
      const { artists, title, path, image } = edge.node
      createPage({
        path: `/collections/${path}/`,
        component: slash(collectionTemplate),
        context: {
          title,
          artists,
          image,
        },
      })
    })
  })
}
