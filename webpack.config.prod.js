const merge = require('webpack-merge');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    //new UglifyJSPlugin({
    //})
    new MinifyPlugin()
  ]
});
