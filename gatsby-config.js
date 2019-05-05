module.exports = {
  siteMetadata: {
    title: `Who is this artist | Collections`,
    siteUrl: `https://whoisthisartist.com`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WhoIsThisArtists?`,
        short_name: `Artist?`,
        start_url: `/`,
        background_color: `#d2a32d`,
        theme_color: `#d2a32d`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "ARTSY",
        // This is the field under which it's accessible
        fieldName: "artsy",
        // URL to query from
        url: "https://metaphysics-production.artsy.net/",
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://whoisthisartist.com",
        policy: [{ userAgent: "*", disallow: "" }],
      },
    },
  ],
}
