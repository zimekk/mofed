import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { resolve } from "path";
import * as webpack from "webpack";

const { ModuleFederationPlugin } = webpack.container;

const dev = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
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
    new ModuleFederationPlugin({
      remotes: {
        "@mofed/app": dev ? "app@//localhost:8090/app.js" : "app@app/app.js",
        "@mofed/components": dev
          ? "components@//localhost:8090/components.js"
          : "components@components/components.js",
      },
    }),
    new HtmlWebpackPlugin(),
  ],
};

export default config;
