import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { protect, restrictTo } from "middleware/auth";
import { UserRole } from "entity/enum/websiteRoles";
import { EmailHTMLTemplateController, EmailTemplateController } from "controller/logic/vigor/emailRelatedLogic";
import { ROLE } from "entity/enum/role";

export function emailTemplateRoute(): Router {
  const controller = new EmailTemplateController();

  const router = Router();

  router.post("/create", protect(), restrictTo(ROLE.adminUser), catchAsync(controller.createEmailTemplate));
  router.put("/edit/:id", protect(), restrictTo(ROLE.adminUser), catchAsync(controller.editEmailTemplate));
  router.get("/getone/:id", catchAsync(controller.getOneEmailTemplate));

  router.get("/getAll", catchAsync(controller.getAllEmailTemplate));

  router.delete(
    "/delete/:id",
    protect(),
    restrictTo(ROLE.adminUser),
    catchAsync(controller.deleteEmailTemplate)
  );

  return router;
}

export function emailHTMLTemplateRoute(): Router {
  const controller = new EmailHTMLTemplateController();

  const router = Router();

  router.post(
    "/create",
    protect(),
    restrictTo(ROLE.adminUser),
    catchAsync(controller.createEmailHTMLTemplate)
  );
  router.put(
    "/edit/:id",
    protect(),
    restrictTo(ROLE.adminUser),
    catchAsync(controller.editEmailHTMLTemplate)
  );
  router.get("/getone/:id", catchAsync(controller.getOneEmailHTMLTemplate));

  router.get("/getAll", catchAsync(controller.getAllEmailHTMLTemplate));

  router.delete(
    "/delete/:id",
    protect(),
    restrictTo(ROLE.adminUser),
    catchAsync(controller.deleteEmailHTMLTemplate)
  );

  return router;
}
