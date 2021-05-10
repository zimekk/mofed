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
    new DefinePlugin({
      "process.env.NAME": JSON.stringify(require("./package").name),
    }),
    new ModuleFederationPlugin({
      name: "app",
      exposes: {
        ".": "./src",
      },
      remotes: {
        "@mofed/components": dev
          ? "components@//localhost:8085/components.js"
          : "components@components/components.js",
      },
      shared: ["react", "react-dom", "@mofed/config"],
    }),
  ],
};

export default config;
