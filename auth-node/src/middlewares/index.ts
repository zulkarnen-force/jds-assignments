import { Express } from "express";
import CoreMiddleware from "./ApiMiddleware";
import CorsMiddleware from "./CorsMiddleware";
import NotFoundRoute from "./NotFoundRoute";
import ApiMiddleware from "./ApiMiddleware";

type MiddlewareFunction = (app: Express) => void;
type MiddlewareConfig = {
  [key: string]: MiddlewareFunction;
};

const middleware: MiddlewareConfig = {
  api: ApiMiddleware,
  cors: CorsMiddleware,
  notfound: NotFoundRoute,
};

/**
 * Apply middlewares to the express app based on the configuration
 * @param app express app
 * @param config list of middlewares
 *
 */
export default class MiddlewareBootstrap {
  constructor(
    private app: Express,
    config: string[] = ["core", "cors", "notfound", "cache"]
  ) {
    for (const moduleName of config) {
      const applyMiddleware = middleware[moduleName];
      if (applyMiddleware) {
        applyMiddleware(this.app);
      } else {
        console.warn(`Middleware module "${moduleName}" not found.`);
      }
    }
  }
}
