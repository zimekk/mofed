import path from "path";
import { Configuration, EnvironmentPlugin, container } from "webpack";
import * as config from "@mofed/bundle";

const { ModuleFederationPlugin } = container;

export default (): Configuration => ({
  ...config,
  entry: require.resolve("./src"),
  output: {
    path: path.resolve(__dirname, "lib"),
  },
  plugins: [
    new EnvironmentPlugin({
      NAME: require("./package").name,
    }),
    new ModuleFederationPlugin({
      name: "components",
      exposes: {
        ".": "./src",
      },
      shared: ["react", "react-dom", "@mofed/config"],
    }),
  ],
});
