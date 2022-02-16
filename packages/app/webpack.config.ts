import path from "path";
import { Configuration, EnvironmentPlugin, container } from "webpack";
import * as config from "@mofed/bundle";

const { ModuleFederationPlugin } = container;

const dev = process.env.NODE_ENV === "development";

export default (): Configuration => ({
  ...config,
  entry: require.resolve("./src"),
  output: {
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new EnvironmentPlugin({
      NAME: require("./package").name,
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
});
