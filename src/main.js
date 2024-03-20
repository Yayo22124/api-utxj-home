import "./config/database.config.js";

import * as dotenv from "dotenv";

import app from "./app.js";

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