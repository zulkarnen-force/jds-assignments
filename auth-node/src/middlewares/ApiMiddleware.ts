import { Express } from "express";
import express from "express";
import morgan from "morgan";

const ApiMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(morgan("combined"));
};

export default ApiMiddleware;
