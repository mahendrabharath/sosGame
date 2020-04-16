var webpack = require('webpack');
var webpackConfig = require("./webpack.test");

module.exports = function (config) {
  config.set({
    
        
    browsers: [ 'Chrome' ], //run in Chrome
    // htmlReporter: {
    //   outputFile: 'tests/units.html',
            
    //   // Optional
    //   pageTitle: 'Unit Tests',
    //   subPageTitle: 'Composite 2.0',
    //   groupSuites: true,
    //   useCompactStyle: true,
    //   useLegacyStyle: true
    // },
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    //reporters: [ 'dots' ], //report results in this format
    reporters: ['progress', 'html'],
    htmlReporter: {
      outputFile: 'tests/index.html',
            
      // Optional 
      pageTitle: 'Unit Tests',
      subPageTitle: 'FDX - Dashboard',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },
    webpack: webpackConfig,

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};