const path = require('path');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const path
const paths = {
  dist: './wwwroot/dist',
  dev: './ClientApp',
};

module.exports = (env) => {
  const extractCSS = new ExtractTextPlugin('vendor.css');
  const isDevBuild = !(env && env.production);
  return [
    {
      devtool: isDevBuild ? 'source-map' : 'cheap-module-source-map',
      stats: { modules: false },
      entry: {
        vendor: [
          'axios',
          'material-ui',
          'prop-types',
          'react',
          'react-dom',
          'react-redux',
          'react-router-dom',
          'react-router-redux',
          'react-tap-event-plugin',
          'redux',
          'redux-form',
          'redux-thunk',
        ],
      },
      output: {
        path: path.join(__dirname, paths.dist),
        publicPath: '/dist/',
        filename: '[name].js',
        library: '[name]_[hash]',
      },
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
        modules: [path.resolve('./'), path.resolve('./node_modules')],
      },
      module: {
        rules: [
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
            use: 'url-loader?limit=100000',
          },
          { test: /\.css(\?|$)/, use: extractCSS.extract(['css-loader']) },
        ],
      },
      plugins: [
        extractCSS,
        // Compress extracted CSS.
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true,
          },
        }),
        new webpack.DllPlugin({
          path: path.join(__dirname, paths.dist, '[name]-manifest.json'),
          name: '[name]_[hash]',
        }),
      ].concat(isDevBuild
        ? [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true,
          }),
        ]
        : [
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: false,
          }),
        ]),
    },
  ];
};
