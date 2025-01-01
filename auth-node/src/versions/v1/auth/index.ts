import { Router } from "express";
import { AuthController } from "./AuthController";
import { login } from "./AuthSchema";
import { validateRequest } from "@middleware/validateRequest";
import AuthUsecase from "./AuthUsecase";
import { UserPsqlRepo } from "../user/UserRepo";
import { validateJwt } from "@lib/jwt/validateJwt";
import { register } from "../user/UserSchema";

export const r = Router();

const usecase = new AuthUsecase(new UserPsqlRepo());
const controller = new AuthController(usecase);

r.post("/login", validateRequest(login), controller.login.bind(controller));
r.post(
  "/register",
  validateRequest(register),
  controller.register.bind(controller)
);
r.get("/me", validateJwt, controller.me.bind(controller));

export default r;
