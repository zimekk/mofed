import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { resolve } from "path";
import * as webpack from "webpack";

const { ModuleFederationPlugin } = webpack.container;

const config: webpack.Configuration = {
  devServer: {
    port: 8080,
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.dirname(require.resolve("@mofed/app/public/app")),
          to: path.resolve(__dirname, "public/app"),
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: "web",
      remotes: {
        // '@mofed/app': "app@app/app.js",
        "@mofed/app": "app@//localhost:8090/app.js",
      },
      // shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin(),
  ],
};

export default config;
