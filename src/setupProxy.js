const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyZeroTrustToDev = createProxyMiddleware({
  // target: 'http://dev.dev.nextiva.xyz',
  // changeOrigin: true,
});

module.exports = (app) => {
  app.use("/rest-api", proxyZeroTrustToDev);
};
