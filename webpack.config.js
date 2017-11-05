const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const path
const paths = {
  dist: './wwwroot/dist',
  dev: './ClientApp',
};

module.exports = (env) => {
  const extractCSS = new ExtractTextPlugin('style.css');
  const isDevBuild = !(env && env.production);
  return [
    {
      devtool: isDevBuild ? 'source-map' : 'cheap-module-source-map',
      stats: { modules: false },
      entry: {
        main: ['react-hot-loader/patch', path.resolve(__dirname, paths.dev)],
      },
      output: {
        path: path.resolve(__dirname, paths.dist),
        publicPath: '/dist/',
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: isDevBuild
              ? ['style-loader', 'css-loader']
              : ExtractTextPlugin.extract({ use: 'css-loader' }),
          },
          { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
          },
        ],
      },
      plugins: [
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./wwwroot/dist/vendor-manifest.json'),
        }),
        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'static',
        // }),
      ].concat(isDevBuild
        ? [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true,
          }),
          new webpack.NoEmitOnErrorsPlugin(),
        ]
        : [
          extractCSS,
          new OptimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true,
            },
          }),
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: false,
          }),
        ]),
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
        modules: [path.resolve('./'), path.resolve('./node_modules')],
      },
    },
  ];
};
