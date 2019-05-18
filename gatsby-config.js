module.exports = {
  siteMetadata: {
    title: `Who is this artist?`,
    siteUrl: `https://whoisthisartist.com`,
    description: `An utility tool to quickly get artists' information and save for later`,
    author: `@ynotstartups`,
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
    `gatsby-plugin-remove-serviceworker`,
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
        path: `${__dirname}/src/data/`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        analyzerPort: 3000,
        production: false,
        analyzerMode: "disabled",
      },
    },
    `gatsby-plugin-typescript`,
  ],
}
