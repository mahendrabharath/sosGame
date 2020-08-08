const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var production = process.argv.reduce(function (p, c) {
  return p || c == '-p'
}, false);

var local = process.argv.reduce(function (p, c) {
  return p || c == '--env.mode=local'
}, false);

module.exports = {
  entry: {

    app: './src/index.js'
  },

  resolve: {
    extensions: [
      ".js", ".jsx"
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-2'] // ,'bundle?lazy&name=[name]'
        }
      },
      {
        test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-2']
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }, {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      title: 'igi-react'
    })
  ],
};


