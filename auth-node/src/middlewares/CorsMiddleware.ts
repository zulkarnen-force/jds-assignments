import config from "@config/index";
import { Express } from "express";
import cors from "cors";

const CorsMiddleware = (app: Express) => {
  app.use(
    cors({
      origin: config.allowsOrigins,
      credentials: true,
    })
  );
};

export default CorsMiddleware;
