import { PreSignedUrlRoute } from "./vigor/aws_route";
import { Router } from "express";
import { authRoute } from "./vigor/auth_routes";
import { emailHTMLTemplateRoute, emailTemplateRoute } from "./vigor/emailRelated_routes";

///
import { EventRoute } from "./vigor/event_routes";

import { TaskRoute } from "./vigor/task_routes";

import { StateRoute } from "./vigor/state_routes";

import { StoryRoute } from "./vigor/story_routes";

import { PostalCodeRoute } from "./vigor/postalCode_routes";

import { CityRoute } from "./vigor/city_routes";

import { FAQRoute } from "./vigor/faq_routes";

import { AreaOfInterestRoute } from "./vigor/areaOfInterest_routes";

import { NewsRoute } from "./vigor/news_routes";




export function controllerRouter(): Router {
  const apiRouter = Router();



  //
  apiRouter.use("/user", authRoute());
  apiRouter.use("/emailTemplate", emailTemplateRoute());
  apiRouter.use("/aws/s3/preSignedUrl", PreSignedUrlRoute());
  apiRouter.use("/emailHTMLTemplate", emailHTMLTemplateRoute());

  apiRouter.use("/event", EventRoute());

  apiRouter.use("/task", TaskRoute());

  apiRouter.use("/faq", FAQRoute());

  apiRouter.use("/story", StoryRoute());

  apiRouter.use("/news", NewsRoute());

  apiRouter.use("/city", CityRoute());

  apiRouter.use("/state", StateRoute());

  apiRouter.use("/postalCode", PostalCodeRoute());

  apiRouter.use("/areaOfInterest", AreaOfInterestRoute());








  return apiRouter;
}
