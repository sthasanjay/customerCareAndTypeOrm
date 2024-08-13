import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { NewsController } from "controller/logic/vigor/newsLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function NewsRoute(): Router {
    const controller = new NewsController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createNews));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editNews));
    router.get("/getone/:id", catchAsync(controller.getOneNews));

    router.get("/getAll", catchAsync(controller.getAllNews));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteNews)
    );

    return router;
}
