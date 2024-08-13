import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { FAQController } from "controller/logic/vigor/faqLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function FAQRoute(): Router {
    const controller = new FAQController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createFAQ));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editFAQ));
    router.get("/getone/:id", catchAsync(controller.getOneFAQ));

    router.get("/getAll", catchAsync(controller.getAllFAQ));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteFAQ)
    );

    return router;
}
