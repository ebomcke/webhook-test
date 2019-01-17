const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common.config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [common.getDotEnvPlugin('.env.local')]
});
