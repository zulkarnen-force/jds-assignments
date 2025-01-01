import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "@application/logging";
import ApiError from "@type/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logProperties = {
    method: req.method,
    originalUrl: req.originalUrl,
    headers: req.headers,
    body: req.body,
  };
  logger.error({
    error: {
      message: err.message,
      stack: err.stack,
    },
    logProperties,
  });
  if (err instanceof ApiError) {
    res.status(err.status).json({
      errors: { message: err.message },
    });
  } else {
    if (err instanceof ZodError) {
      const errorDetails = err.errors.map((error) => {
        return {
          path: error.path.join("."),
          message: error.message,
          errorCode: error.code,
        };
      });
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorDetails,
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
