import Express from "express";
import database from "./config/database.config.js";
import  morgan  from "morgan";
import { usersRouter } from "./routes/index.js";

// ! Express instance for application.
const app = new Express();

//* Settings
//* Middlewares
app.use(Express.json()) // Use JSON estandard for Express Application.
app.use(morgan('prod'))
app.use(Express.urlencoded({
    extended: false
}))

//* Routes
const apiUrl = "/api/v1";
app.use(`${apiUrl}/usuarios`, usersRouter);

export default app;