import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo } from "middleware/auth";
import { EventController } from "controller/logic/vigor/eventLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function EventRoute(): Router {
    const controller = new EventController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createEvent));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editEvent));
    router.get("/getone/:id", catchAsync(controller.getOneEvent));

    router.get("/getAll", catchAsync(controller.getAllEvent));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteEvent)
    );

    return router;
}
