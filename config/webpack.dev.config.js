const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
})