import { Express, NextFunction, Request, Response } from "express";

const NotFoundRoute = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
      errors: {
        message: "Method not found",
      },
    });
  });
};

export default NotFoundRoute;
