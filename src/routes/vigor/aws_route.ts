import { catchAsync } from "utils/catchAsync";
import { Router } from "express";
import { GenerateUploadURL } from "controller/logic/aws/pre_signed_url";

export function PreSignedUrlRoute(): Router {
  const router = Router();

  router.get("/create", catchAsync(GenerateUploadURL));

  return router;
}
