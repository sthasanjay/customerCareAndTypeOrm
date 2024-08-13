import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { PostalCodeController } from "controller/logic/vigor/postalCodeLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function PostalCodeRoute(): Router {
    const controller = new PostalCodeController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createPostalCode));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editPostalCode));
    router.get("/getone/:id", catchAsync(controller.getOnePostalCode));

    router.get("/getAll", catchAsync(controller.getAllPostalCode));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deletePostalCode)
    );

    return router;
}
