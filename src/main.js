import * as dotenv from "dotenv";

import app from "./app.js";
import database from "./config/database.config.js";

dotenv.config({
    path: "src/.env"
})
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Express application running in: http://localhost:${port}`);
}) 