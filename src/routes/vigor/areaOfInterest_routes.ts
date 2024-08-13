import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { AreaOfInterestController } from "controller/logic/vigor/areaOfInterestLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function AreaOfInterestRoute(): Router {
    const controller = new AreaOfInterestController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createAreaOfInterest));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editAreaOfInterest));
    router.get("/getone/:id", catchAsync(controller.getOneAreaOfInterest));

    router.get("/getAll", catchAsync(controller.getAllAreaOfInterest));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteAreaOfInterest)
    );

    return router;
}
