const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyZeroTrustToDev = createProxyMiddleware({});

module.exports = (app) => {
  app.use("/rest-api", proxyZeroTrustToDev);
};
