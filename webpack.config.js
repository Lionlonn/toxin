const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};


const PAGES_DIR = `${PATHS.src}/views/pages`;



const getEntries = pages => {
  const entries = {};
  const htmlPages = [];

  pages.forEach(name => {
    entries[name] = `${PAGES_DIR}/${name}/index.ts`;
    htmlPages.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `${PAGES_DIR}/${name}/${name}.pug`,
        chunks: [name],
      }),
    );
  });

  return [entries, htmlPages];
};

const [entries, htmlPages] = getEntries(fs.readdirSync(PAGES_DIR));

module.exports = {
  mode,
  target,
  devtool,
  // devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: ['index.html'],
    // open: true,
    hot: true,
  },
  entry: {
    ...entries
  },
  resolve: {
    alias: {
      data: path.resolve(__dirname, 'src/data'),
      'root-style': path.resolve(__dirname, 'src/index.scss'),
      components: path.resolve(__dirname, 'src/views/components/'),
      data: path.resolve(__dirname, 'src/data'),
      layouts: path.resolve(__dirname, 'src/views/layouts/'),
      libs: path.resolve(__dirname, 'src/libs'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
    extensions: ['.ts', '.js', '.css', '.scss'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'

  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
  
  plugins: [
    ...htmlPages,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            }
          },

          'sass-loader'
        ],
      },
      
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}img/[name][ext]`,
        },
      },
      {
        test: /\.(t|j)s$/i,
        use: ['ts-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
      },

    ]
  },
};