const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    //path.join(__dirname, 'src/index.js'),
    './src/index.js'
  ],
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'docs'),
    //publicPath: '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      //filename: 'index..html',
      //template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
};
