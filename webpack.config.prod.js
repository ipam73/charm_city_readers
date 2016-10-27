var devConfig = require('./webpack.config.js');
var webpack = require('webpack');

var prodPlugin = new webpack.DefinePlugin({
  'process.env': {
    // This has effect on the react lib size
    'NODE_ENV': JSON.stringify('production'),
  },
});

var uglifyPluging = new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false,
  },
});

devConfig.plugins.push(prodPlugin);
devConfig.plugins.push(uglifyPluging);
devConfig.plugins.push(new webpack.optimize.DedupePlugin());
// devConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
// devConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js'));
// devConfig.devtool = 'source-map';

module.exports = devConfig;
