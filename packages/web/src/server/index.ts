import express, {
  Express,
  Response,
  Request,
  // RequestHandler,
  Router,
} from "express";
import http from "http";

export const middleware = Router().get("/", (req: Request, res: Response) =>
  res.send(Object.assign({ status: "ok" }, req.query))
);

export function serve() {
  const { PORT: port = 8080, PUBLIC = "public" } = process.env;
  const middlewares = [
    middleware,
    express.static(require("path").resolve(process.cwd(), PUBLIC)),
  ];
  const server = http.createServer(
    middlewares.reduce(
      (app, middleware) => app.use(middleware),
      express()
    ) as Express
  );
  server.listen({ port }, () => {
    console.info(`Listening on port: ${port}`);
  });
}

if (process.mainModule?.filename === __filename) {
  serve();
}
