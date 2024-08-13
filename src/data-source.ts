import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // synchronize: true,
  logging: false,
  migrationsTableName: "migrations",
  entities: ["./src/entity/**/*.ts", "./src/entity/**/*.js"],
  migrations: ["./src/migrations/*.ts", "./src/entity/**/*.js"],
  subscribers: [],
  extra: {
    ssl: false,
  },
});
