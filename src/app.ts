import express from "express";
import morgan from "morgan";
import initializeDB from "db";

export const app: express.Express = express();

app.use(morgan("dev"));

export function startServer() {
  app.set("trust proxy", true);

  // view engine setup
  // app.set("views", path.join(__dirname, "views"));
  // app.set("view engine", "ejs");
  const port = app.get("port") || 3000;

  app.listen(port, async () => {
    console.log(`App running on port ${port}...`);
    initializeDB();
  });
}
