import path from "path";
import { Configuration, EnvironmentPlugin } from "webpack";
import * as config from "@mofed/bundle";

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
  ],
});
