import path from "path";
import { Subject } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import {
  Compilation,
  Compiler,
  Configuration,
  EnvironmentPlugin,
} from "webpack";
import "webpack-dev-server";
import * as config from "@mofed/bundle";

class RequireResolvePlugin {
  options = { emit: (_: Function) => undefined };
  constructor(options = {}) {
    Object.assign(this.options, options);
  }

  apply(compiler: Compiler) {
    const { name } = this.constructor;
    compiler.hooks.emit.tap({ name }, (compilation: Compilation) => {
      const [asset] = Object.values(compilation.assets);
      this.options.emit(
        require("require-from-string")(asset.source()).middleware
      );
    });
  }
}

const middleware$ = new Subject();
const handler$ = new Subject();

handler$
  .pipe(withLatestFrom(middleware$))
  .subscribe(([args, f]: any) => f(...args));

const middleware = (...args: unknown[]) => handler$.next(args);

export default (): Configuration[] => [
  {
    ...config,
    devServer: {
      port: 8000,
      setupMiddlewares: (middlewares) => middlewares.concat(middleware),
    },
    entry: {
      index: require.resolve("./src"),
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
      new RequireResolvePlugin({ emit: (f: Function) => middleware$.next(f) }),
    ],
    target: "node",
  },
];
