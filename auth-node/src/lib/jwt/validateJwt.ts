import config from "@config/index";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const generateToken = (payload: any) => {
  const secretKey = config.jwt.secret; // Replace with your own secret key
  const options = {
    expiresIn: "24h",
    issuer: "jds",
  };

  const token = jwt.sign(payload, secretKey, options);
  return { token: token, expires_in: options.expiresIn };
};

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwt.secret, (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Token is not provided",
    });
  }
};

export { validateJwt, generateToken };
