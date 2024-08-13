import { app } from "app";
import cors from "cors";

let corsOptions = {
	origin: ["http://localhost:3000"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
