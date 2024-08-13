import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo } from "middleware/auth";
import { StateController } from "controller/logic/vigor/stateLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function StateRoute(): Router {
    const controller = new StateController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createState));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editState));
    router.get("/getone/:id", catchAsync(controller.getOneState));

    router.get("/getAll", catchAsync(controller.getAllState));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteState)
    );

    return router;
}
