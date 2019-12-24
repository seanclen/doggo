module.exports = {
  pathPrefix: '/doggo',
  siteMetadata: {
    title: 'doggo',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'doggo',
        short_name: 'doggo',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/logo-128px.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
