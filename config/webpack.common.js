/* eslint-disable no-undef */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { htmlPlugin } = require("./plugins/HtmlPlugin");

let target = "web";
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  htmlPlugin,
];
const cleanChunkName = (name) => {
  return name
    .replace(/node_modules/g, "nodemodules")
    .replace(/[-_.|]+/g, " ")
    .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, "")
    .trim()
    .replace(/ +/g, "-");
};

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    assetModuleFilename: "images/[hash][ext][query]",
    // filename: (pathData) => {
    //   return `email-ui-${pathData.chunk.name}.[contenthash:8].js`;
    // },
    // chunkFilename: (pathData) => {
    //   return `email-ui-${cleanChunkName(pathData.chunk.id)}.[contenthash:8].js`;
    // },
  },
  optimization: {
    chunkIds: "named",
  },
  module: {
    rules: [
      {
        test: /bootstrap\.[jt]sx?$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "", esModule: false },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: plugins,
  target: target,
  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".ts", ".tsx"],
    alias: {
      "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      react: require.resolve("react"),
      assets: path.resolve(__dirname, "../src/stories/assets"),
      "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
      "react-router": require.resolve("react-router"),
      "react-router-dom": require.resolve("react-router-dom"),
      redux: require.resolve("redux"),
      "react-redux": require.resolve("react-redux"),
      hooks: path.resolve(__dirname, "../src/hooks"),
      components: path.resolve(__dirname, "../src/components"),
      containers: path.resolve(__dirname, "../src/containers"),
      selector: path.resolve(__dirname, "../src/selector"),
      services: path.resolve(__dirname, "../src/services"),
      utils: path.resolve(__dirname, "../src/utils"),
      types: path.resolve(__dirname, "../src/types"),
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
    },
  },
};
