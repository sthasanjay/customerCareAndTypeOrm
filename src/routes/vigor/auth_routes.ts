import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { AuthController } from "controller/logic/vigor/authLogic";

export function authRoute(): Router {
  const controller = new AuthController();
  const router = Router();

  router.post("/signup", catchAsync(controller.signUp));
  router.post("/login", catchAsync(controller.login));
  router.post("/adminLogin", catchAsync(controller.login));

  return router;
}
