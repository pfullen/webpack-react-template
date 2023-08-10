/* eslint-disable no-undef */
const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let target = "web";
const plugins = [new ReactRefreshWebpackPlugin()];

const devConfig = {
  mode: "development",
  plugins: plugins,
  target: target,
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3004,
    hot: true,
  },
};

module.exports = merge(commonConfig, devConfig);
