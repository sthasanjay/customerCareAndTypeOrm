import { AppDataSource } from "data-source";

// connectDB
export default function initializeDB() {
  AppDataSource.initialize()
    .then(async () => {
      // DB Connection Message
      console.log("DB connection successful!!!");
    })
    .catch((error) => console.log("DB connection ", error));
}
