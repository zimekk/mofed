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
      shared: ["react"],
    }),
  ],
};

export default config;
