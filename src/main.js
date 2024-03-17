import * as dotenv from "dotenv";

import app from "./app.js";
import database from "./config/database.config.js";

dotenv.config({
    path: "src/.env"
})
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`
    ##############################################################

        Express API REST Application is running and listening on:
        
            Local: http://localhost:${port}
            Railway: https://api-utxj-home.up.railway.app/

    ##############################################################
    `);
}) 