import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration, EnvironmentPlugin, container } from "webpack";
import "webpack-dev-server";
import * as config from "@mofed/bundle";

const { ModuleFederationPlugin } = container;

const dev = process.env.NODE_ENV === "development";

export default (): Configuration => ({
  ...config,
  devServer: {
    port: 8080,
  },
  entry: require.resolve("./src"),
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
    new EnvironmentPlugin({
      NAME: require("./package").name,
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
});
