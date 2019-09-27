const path = require("path");
const ChildProcess = require("child_process");

const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config(); //include env file in here as well

const TITLE = process.env.TITLE;
const VERSION = ChildProcess.execSync("git rev-parse HEAD")
  .toString()
  .trim();

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

module.exports = {
  mode: "development",

  context,

  entry: [
    "react-hot-loader/patch",
    /*"webpack-hot-middleware/client",*/
    path.join(context, "src/index.tsx")
  ],

  output: {
    path: path.join(context, "build/"),
    filename: "bundle.js",
    publicPath: "/"
  },

  devtool: "source-map",
  devServer: {
    contentBase: ".",
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    disableHostCheck: true
  },

  optimization: {
    minimize: false,
    splitChunks: { chunks: "all" }
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      systemvars: true
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE,
      template: "index.ejs",
      version: VERSION
    })
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.resolve(context, "src")],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%", "last 2 major versions", "IE 10"]
                    }
                  }
                ],
                "@babel/preset-react",
                "@babel/preset-typescript"
              ],
              plugins: [
                "react-hot-loader/babel",
                "babel-plugin-styled-components",

                // Stage 2
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-throw-expressions",

                // Stage 3
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-syntax-import-meta",
                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "@babel/plugin-proposal-json-strings",
                "@babel/plugin-proposal-object-rest-spread",
                [
                  "babel-plugin-transform-builtin-extend",
                  {
                    globals: ["Error", "Array"]
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/,
        loader: "file-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  }
};
