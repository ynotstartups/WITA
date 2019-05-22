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
        allMovementsJson {
          edges {
            node {
              title
              artists {
                name
                imageUrl
              }
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
    const templateMovement = path.resolve(`src/templates/TemplateMovement.tsx`)
    result.data.allMovementsJson.edges.forEach(edge => {
      const { artists, title, path, image } = edge.node
      let artistsName = artists.map(artist => artist.name)
      let artistsNameImageMap = artists.reduce((dict, artist) => {
        dict[artist.name] = artist.imageUrl
        return dict
      }, {})

      createPage({
        path: `/movements/${path}/`,
        component: slash(templateMovement),
        context: {
          title,
          artistsNameImageMap,
          image,
          artistsName,
        },
      })
    })
  })
}
