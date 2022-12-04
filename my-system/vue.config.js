const { defineConfig } = require("@vue/cli-service");
const proxyObj = {};
proxyObj["/"] = {
  ws: false,
  target: "http://127.0.0.1:3007",
  changeOrigin: true,
  pathReWrite: {
    "^/": "/api",
  },
};
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: proxyObj,
  },
});
