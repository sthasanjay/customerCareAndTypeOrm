import { app } from "app";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "middleware/errors";
import { controllerRouter } from "./routes";

export default function initializeRouter() {
  console.info("Initializing routes...", process.env.DB_PORT);

  app.use("/api", controllerRouter());
  //swaggerRouter();
  //app.use("/swagger/", swaggerRouter());
  app.get("*", (req, res) => res.status(404).send({ message: "404 Not Found" }));
  app.use(errorHandler);
}
