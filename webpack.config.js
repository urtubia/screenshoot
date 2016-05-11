var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './javascripts/entry.js'],
  },
  output: {
    path: './public/built',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:8080/built/'
  },
  externals: [
    'chokidar','s3','node-uuid','fs','ipc','child_process'
  ],
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['react', 'es2015', 'stage-2'] } },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.IgnorePlugin(/^(fs|ipc)$/)
    //new webpack.IgnorePlugin(/chokidar/),
  ],

  //target: "electron"

}
