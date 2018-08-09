const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components'),
      actions: path.resolve(__dirname, './src/actions'),
      constants: path.resolve(__dirname, './src/constants'),
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './static'),
    hot: true,
    inline: true,
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.less|.css$/,
        exclude: /\/node_modules/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({})
  ]
};
