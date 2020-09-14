const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval",
  mode: process.env.prod ? "production" : "development",
  entry: [
    "./src/react/main/index"
  ],
  plugins: [new HtmlWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css?$/,
        loader: ["style-loader", "css-loader"],
        include: path.join(__dirname, "src")
      }
    ]

  }
};
