const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.html$/i,
      use: ['html-loader'],
    },
    {
      test: /\.css$/i,
      exclude: /styles/,
      use: ['to-string-loader', 'css-loader?url=false'],
    },
    {
      test: /\.css$/i,
      include: /styles/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(scss)$/,
      include: /styles/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/i,
      use: 'url-loader?limit=1024',
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: ['file-loader', 'image-webpack-loader?bypassOnDebug'],
    },
    ],
  },
  target: 'web',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Foodoso',
      short_name: 'Foodoso',
      description: "Let's explore good food near you",
      theme_color: '#607d8b9c',
      background_color: '#607d8b9c',
      display: 'standalone',
      inject: true,
      fingerprints: false,
      ios: true,
      start_url: '/index.html',
      icons: [{
        src: path.resolve('src/public/images/app-icon.png'),
        destination: path.join('assets', 'images', 'icons'),
        sizes: [96, 128, 192, 256, 384, 512],
        ios: true,
      }],
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve('src/public/images/app-icon.png'),
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      meta: {
        author: 'Gunali Rezqi Mauludi',
        description: "Let's explore good food near you.",
      },
      minify: 'auto',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/public/',
          to: 'assets/',
          globOptions: {
            ignore: ['**/images/customer-review.png',
              '**/images/hero-image.jpg',
              '**/images/foods/**',
              '**/images/menus/**'],
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        ImageminPngquant({
          quality: [0.3, 0.5],
        }),
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
  ],
};
