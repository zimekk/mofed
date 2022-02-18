import path from "path";
import { Configuration, EnvironmentPlugin, container } from "webpack";
import "webpack-dev-server";
import * as config from "@mofed/bundle";
import { RequestHandler } from "webpack-dev-server";

const { ModuleFederationPlugin } = container;

const ENTRY = "index";
const cache = {} as { hash: string; middleware: Function };

const dev = process.env.NODE_ENV === "development";

export default (): Configuration[] => [
  {
    ...config,
    devServer: {
      // https://github.com/webpack/webpack-dev-middleware#serversiderender
      devMiddleware: { serverSideRender: true },
      // port: 8000,
      // https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
      setupMiddlewares: (middlewares) =>
        middlewares.concat(((req, res, next) => {
          const {
            devMiddleware: { outputFileSystem, stats },
          } = res.locals.webpack;
          const {
            children: [{ assetsByChunkName, outputPath }],
            hash,
          } = stats.toJson();
          const [filePath] = assetsByChunkName[ENTRY];
          if (cache.hash !== hash) {
            Object.assign(
              cache,
              { hash },
              require("require-from-string")(
                outputFileSystem
                  .readFileSync(path.join(outputPath, filePath))
                  .toString()
              )
            );
          }
          return cache.middleware(req, res, next);
        }) as RequestHandler),
      static: false,
    },
    entry: {
      [ENTRY]: require.resolve("./src/server"),
    },
    externalsPresets: { node: true },
    externals: [
      require("webpack-node-externals")({
        additionalModuleDirs: ["../../node_modules"],
      }),
    ],
    optimization: {
      minimize: false,
    },
    output: {
      clean: true,
      library: {
        type: "commonjs2",
      },
      path: path.resolve(__dirname, "lib"),
    },
    plugins: [
      new EnvironmentPlugin({
        NAME: JSON.stringify(require("./package").name),
      }),
    ],
    target: "node",
  },
  {
    ...config,
    entry: require.resolve("./src/client"),
    output: {
      path: path.resolve(__dirname, "public"),
    },
    plugins: [
      new (require("copy-webpack-plugin"))({
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
      new (require("html-webpack-plugin"))(),
    ],
    // https://webpack.js.org/configuration/target/
    target: "web",
  },
];
