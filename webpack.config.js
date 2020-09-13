const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "eval",
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "./src/react/main/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
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
