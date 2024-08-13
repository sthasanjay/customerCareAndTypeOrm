import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo } from "middleware/auth";
import { TaskController } from "controller/logic/vigor/taskLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function TaskRoute(): Router {
    const controller = new TaskController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createTask));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editTask));
    router.get("/getone/:id", catchAsync(controller.getOneTask));

    router.get("/getAll", catchAsync(controller.getAllTask));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteTask)
    );

    return router;
}
