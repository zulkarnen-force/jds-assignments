import express from "express";
import { errorHandler } from "../middlewares/error.handler";
import router from "@routes/api";
import MiddlewareBootstrap from "@middleware/index";

export const app = express();

new MiddlewareBootstrap(app, ["api", "cors"]);

app.use("/assets", express.static("./src/application/assets/"));
app.use("/avatar", express.static("public/img/avatar"));
app.use(router);

new MiddlewareBootstrap(app, ["notfound"]);

app.use(errorHandler);
