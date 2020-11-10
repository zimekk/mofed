import * as path from "path";
import * as webpack from "webpack";

const { ModuleFederationPlugin } = webpack.container;

const dev = process.env.NODE_ENV === "development";

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
    new ModuleFederationPlugin({
      name: "components",
      exposes: {
        ".": "./src",
      },
      shared: ["react"],
    }),
  ],
};

export default config;
