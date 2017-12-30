module.exports = {
  entry: "./lib/gate_is_down.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  module: {
  	loaders: [
  		{
  			test: /\.json$/,
  			loader: 'json-loader'
  		}
		]
	},
  // alias: {
  //   'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
  //   'pgpass$': path.join(__dirname, 'aliases/pgpass.js'),
  // },
	node: {
		fs: 'empty',
		net: 'mock',
		tls: 'mock',
    dns: 'mock'
	},
	// target: 'node'
};