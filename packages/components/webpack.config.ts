import * as path from "path";
import * as webpack from "webpack";

const {
  DefinePlugin,
  container: { ModuleFederationPlugin },
} = require("webpack");

const dev = process.env.NODE_ENV === "development";
// const deps = require("./package.json").dependencies;

const config: webpack.Configuration = {
  entry: require.resolve("./src"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "lib"),
  },
  plugins: [
    new DefinePlugin({
      "process.env.NAME": JSON.stringify(require("./package").name),
    }),
    new ModuleFederationPlugin({
      name: "components",
      exposes: {
        ".": "./src",
      },
      shared: ["react", "react-dom", "@mofed/config"],
    }),
  ],
};

export default config;
