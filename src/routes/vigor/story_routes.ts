import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { adminProtect, restrictTo} from "middleware/auth";
import { StoryController } from "controller/logic/vigor/storyLogic";
import { AdminRole } from "../../entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

export function StoryRoute(): Router {
    const controller = new StoryController();

    const router = Router();

    router.post("/create", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.createStory));
    router.put("/edit/:id", adminProtect(), restrictTo(ROLE.adminUser), catchAsync(controller.editStory));
    router.get("/getone/:id", catchAsync(controller.getOneStory));

    router.get("/getAll", catchAsync(controller.getAllStory));

    router.delete(
        "/delete/:id",
        adminProtect(),
        restrictTo(ROLE.adminUser),
        catchAsync(controller.deleteStory)
    );

    return router;
}
