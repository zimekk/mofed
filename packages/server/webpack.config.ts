import path from "path";
// import { Subject } from "rxjs";
// import { withLatestFrom } from "rxjs/operators";
import {
  // Compilation,
  // Compiler,
  Configuration,
  EnvironmentPlugin,
} from "webpack";
import "webpack-dev-server";
import * as config from "@mofed/bundle";
import { RequestHandler } from "webpack-dev-server";

// class RequireResolvePlugin {
//   options = { emit: (_: Function) => undefined };
//   constructor(options = {}) {
//     Object.assign(this.options, options);
//   }

//   apply(compiler: Compiler) {
//     const { name } = this.constructor;
//     compiler.hooks.emit.tap({ name }, (compilation: Compilation) => {
//       const [asset] = Object.values(compilation.assets);
//       this.options.emit(
//         require("require-from-string")(asset.source()).middleware
//       );
//     });
//   }
// }

// const middleware$ = new Subject();
// const handler$ = new Subject();

// handler$
//   .pipe(withLatestFrom(middleware$))
//   .subscribe(([args, f]: any) => f(...args));

// const middleware = (...args: unknown[]) => handler$.next(args);

const ENTRY = "index";
const cache = {} as { hash: string; middleware: Function };

export default (): Configuration[] => [
  {
    ...config,
    devServer: {
      devMiddleware: { serverSideRender: true },
      port: 8000,
      // setupMiddlewares: (middlewares) => middlewares.concat(middleware),
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
      [ENTRY]: require.resolve("./src"),
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
      // new RequireResolvePlugin({ emit: (f: Function) => middleware$.next(f) }),
    ],
    target: "node",
  },
];
