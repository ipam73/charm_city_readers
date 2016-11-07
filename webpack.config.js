var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'javascripts/main-parent.js': __dirname + '/src/web/main.jsx',
  },
  output: {
    path: __dirname + '/web/public/build',
    filename: '[name]',
  },
  module: {
    loaders: [
      {test: /\.coffee$/, loader: 'coffee-loader'},
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /android/],
        loader: 'babel',
        query: {presets: ['react', 'es2015']},
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /android/],
        loader: 'babel',
        query: {presets: ['es2015']},
      },
      { // Support require('./abc.less')
        test: /\.less$/,
        exclude: [/node_modules/, /android/],
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /android/],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.less'],
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
  ],
};
