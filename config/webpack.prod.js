var webpack = require("webpack");
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require('./webpack.common.js');
var utility = require("./utility");
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = merge(common, {
  output: {
    path: utility.root("dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },

  plugins: [
    new WebpackBundleSizeAnalyzerPlugin({
      analyzerMode: 'static',
      //  openAnalyzer : true,
      generateStatsFile: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin("[name].[hash].css"),
    new webpack.DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV)
      }
    }),
  ]
});
