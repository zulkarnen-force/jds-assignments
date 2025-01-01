import { NextFunction, Response, Request } from "express";
import { z, ZodError } from "zod";

export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => {
          return { reason: `${issue.path.join(".")} is ${issue.message}` };
        });
        res.status(400).json({
          errors: { type: "ValidationError", details: errorMessages },
        });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
