const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: true,
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const clientConfig = {
  entry: ['react-hot-loader/patch', path.join(__dirname, '/src/client/index.tsx')],
  stats: dev ? "normal" : "errors-only",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [new webpack.HotModuleReplacementPlugin()]
    : [DefinePluginConfig],
};

const serverConfig = {
  entry: path.join(__dirname, "src/server/index.ts"),
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      app: path.resolve(__dirname, "src/client/")
    }
  },
  stats: dev ? "normal" : "errors-only",
  output: {
    path: __dirname,
    filename: "server.js",
    publicPath: "/"
  },
  mode: dev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ]
  }
};

module.exports = [clientConfig, serverConfig];
