import * as dotenv from "dotenv";

import app from "./app.js";
import database from "./config/database.config.js";

dotenv.config({
    path: "src/.env"
})

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Express application running in: http://localhost:${port}`);
})