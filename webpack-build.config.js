const path = require("path");
const ChildProcess = require("child_process");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

require("dotenv").config(); //include env file in here as well

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

const PUBLIC_PATH = process.env.PUBLIC_PATH;
const TITLE = process.env.TITLE;
const VERSION = ChildProcess.execSync("git rev-parse HEAD")
  .toString()
  .trim();

module.exports = {
  mode: "production",

  context,

  entry: ["@babel/polyfill", path.join(context, "src/index.tsx")],

  devtool: "source-map",

  output: {
    path: path.join(context, "dist/"),
    filename: "[name].[chunkhash].js",
    publicPath: PUBLIC_PATH
  },
  optimization: {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          parallel: true,
          sourceMap: true,
          output: {
            comments: false
          },
          compress: {
            unsafe: false,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: false
          }
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      })
    ]
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE,
      template: "index.prod.ejs",
      version: VERSION
    }),
    /*new ScriptExtHtmlWebpackPlugin({ defaultAttribute: "defer" }),
    new PreloadWebpackPlugin({ include: "initial" }), enable for server side rendering*/
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe),
      systemvars: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    //https://github.com/jantimon/favicons-webpack-plugin
    /*new FaviconsWebpackPlugin({
      // Your source logo
      logo: "assets/favicons/favicon.png",
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      cache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // see https://github.com/haydenbleasel/favicons#usage
      favicons: {
        appName: TITLE,
        appDescription: "",
        version: VERSION,
        lang: "en-us",
        background: "#fff",
        theme_color: "#fff"
        // usw
      }
    })*/
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

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
                    },
                    // for uglifyjs...
                    forceAllTransforms: true
                    /*useBuiltIns: "entry"*/
                  }
                ],
                "@babel/preset-react",
                "@babel/preset-typescript"
              ],
              plugins: [
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: true }
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
          MiniCssExtractPlugin.loader,
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
