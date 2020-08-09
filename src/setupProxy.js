// 这里是模拟
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/ajax",
    createProxyMiddleware({
      target: "https://m.maoyan.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/comic_v2",
    createProxyMiddleware({
      target: "https://mhd.zhuishushenqi.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
