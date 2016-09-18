module.exports = {
  entry: "./client/routes.js",
  output: {
      path: __dirname + "/client",
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
      }
    ]
  }
}
