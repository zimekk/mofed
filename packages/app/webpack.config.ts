import * as path from "path";
import * as webpack from "webpack";

const { ModuleFederationPlugin } = webpack.container;

const config: webpack.Configuration = {
  devServer: {
    port: 8090,
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
    new ModuleFederationPlugin({
      name: "app",
      exposes: {
        ".": "./src",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};

export default config;
