var path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

var SRC_DIR = path.join(__dirname, "/src");
var DIST_DIR = path.join(__dirname, "/public");

module.exports = {
  mode: 'development',
  plugins: [new CompressionPlugin(), new MiniCssExtractPlugin()],
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: {
          loader: 'file-loader',
        }
      }
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    filename: 'index.js',
    path: DIST_DIR,
  },
};