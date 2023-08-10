const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Email Module',
  template: path.resolve(__dirname, '../../public/index.html'),
});

module.exports = { htmlPlugin };