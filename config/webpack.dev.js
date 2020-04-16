const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
var helpers = require("./helpers");


module.exports = merge(common, {
  devtool: 'inline-source-map',
  output: {
    path: helpers.root("dist"),
    publicPath: "http://localhost:3000/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
},
devServer: {
  historyApiFallback: true,
  stats: "minimal"/*,
  TODO setup when REST service ready
  proxy: {
      "/api/**": {
          target: "http://localhost:8080/nurdbot-rest-service",
          secure: false,
          changeOrigin: true
      }
  }*/
},
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('local')
    }
  })
  ]
});

