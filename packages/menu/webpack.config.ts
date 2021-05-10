import * as path from "path";
import * as webpack from "webpack";

const { DefinePlugin } = require("webpack");

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
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new DefinePlugin({
      "process.env.NAME": JSON.stringify(require("./package").name),
    }),
  ],
};

export default config;
