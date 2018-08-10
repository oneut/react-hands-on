/**
 * Created by t_ueno on 2016/06/29.
 */
'use strict';

var path = require('path')
var webpack = require('webpack');

module.exports = function (env, options) {
  var config = {
    entry: {
      "github/index": "./src/github/index/app.js"
    },
    output: {
      path: path.resolve(__dirname, '../../public/assets/js'),
      filename: './[name]/bundle.js',
    },
    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      // "jquery": "jQuery"
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "eslint-loader",
            options: {
              configFile: './.eslintrc'
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              extends: path.resolve(__dirname, './.babelrc')
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {loader: "style-loader"},
            {loader: "css-loader"}
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.mode)
      }),
    ],
    watchOptions: {
      poll: 500
    },
  };

  if (env !== 'production') {
    config.devtool = 'inline-source-map'
  }

  return config;
}
