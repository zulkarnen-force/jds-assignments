import { Router } from "express";
import users from "./user";
import auth from "./auth";
const v1 = Router();

v1.use("/users", users);
v1.use("/auth", auth);

export default v1;
