const path = require('path');

module.exports = {
  entry: './public/gate_is_down.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ],
    rules: [
      { 
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  node: {
    dns: 'mock',
    net: 'mock',
  }
};