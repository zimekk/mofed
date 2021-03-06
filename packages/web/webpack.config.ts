import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const {
  DefinePlugin,
  container: { ModuleFederationPlugin },
} = require("webpack");

const dev = process.env.NODE_ENV === "development";

const config = {
  devServer: {
    port: 8080,
  },
  entry: require.resolve("./src"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.dirname(require.resolve("@mofed/app/public/main")),
          to: path.resolve(__dirname, "public/app"),
        },
        {
          from: path.dirname(require.resolve("@mofed/components/lib/main")),
          to: path.resolve(__dirname, "public/components"),
        },
      ],
    }),
    new DefinePlugin({
      "process.env.NAME": JSON.stringify(require("./package").name),
    }),
    new ModuleFederationPlugin({
      remotes: {
        "@mofed/app": dev ? "app@//localhost:8090/app.js" : "app@app/app.js",
        "@mofed/components": dev
          ? "components@//localhost:8090/components.js"
          : "components@components/components.js",
      },
      shared: ["react", "react-dom", "@mofed/config"],
    }),
    new HtmlWebpackPlugin(),
  ],
};

export default config;
