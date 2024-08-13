import "reflect-metadata"; // Has sideeffects
import * as dotenv from "dotenv";
import "newrelic";

import { startServer } from "app";
import "middleware"; // Has sideeffects (initializes middleware)

import initializeRouter from "router";

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  console.log(err.name, err.message);
});
initializeRouter();
startServer();
