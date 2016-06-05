var webpack = require('webpack');
var util = require('util');

var app = ['./javascripts/entry.js'];

if (process.env.WEBPACK_DEV_SERVER == 'true'){
  console.log("Including webpack webserver in app");
  app = [
      'webpack/hot/dev-server', 
      'webpack-dev-server/client?http://localhost:8080',
      './javascripts/entry.js'];
}

module.exports = {
  entry: {
    app: app
  },
  output: {
    path: './public/built',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:8080/built/'
  },
  externals: [
    'chokidar','s3','node-uuid','fs','ipc','child_process', 'process', 'electron'
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
