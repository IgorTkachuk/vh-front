const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";

module.exports = (env) => ({
  entry: path.resolve(__dirname, "src", "index.tsx"),
  mode: mode,
  devtool: isDev ? "inline-source-map" : undefined,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDev,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-modules-typescript-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: (resourcePath) =>
                  Boolean(resourcePath.includes(".module.")),
                localIdentName: isDev
                  ? "[path][name]__[local]--[hash:base64:5]"
                  : "[hash:base64:8]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new Dotenv({
      path: `.env${env.file ? `.${env.file}` : ""}`,
    }),
  ],
});
