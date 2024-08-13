import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { CityController } from "controller/logic/vigor/cityLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function CityRoute(): Router {
    const controller = new CityController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createCity));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editCity));
    router.get("/getone/:id", catchAsync(controller.getOneCity));

    router.get("/getAll", catchAsync(controller.getAllCity));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteCity)
    );

    return router;
}
