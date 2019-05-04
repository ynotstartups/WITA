const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `{
      allCollectionsJson {
        edges {
          node {
            title
            artists
          }
        }
      }
    }`
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create image post pages.
    const collectionTemplate = path.resolve(`src/templates/collection.js`)
    result.data.allCollectionsJson.edges.forEach(edge => {
      const {artists, title} = edge.node
      createPage({
        path: `/collections/${slug(title)}/`,
        component: slash(collectionTemplate),
        context: {
          title,
          artists
        },
      })
    })
  })
}
