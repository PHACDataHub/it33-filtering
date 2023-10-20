const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuring create react app's built-in dev proxy to simplify networking to the GQL API in dev 
// ... also makes supporting the not-so-simple networking necessary for itHub codespaces possible
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

module.exports = function(app) {
  console.log("test")
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_GQL_CONTAINER_NAME || "localhost"}:${process.env.REACT_APP_GQL_PORT || "4000"}/graphql`,
      changeOrigin: true,
    })
  );
};