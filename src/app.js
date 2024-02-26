import Express from "express";
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

// ! Middleware 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "Endpoint not available or not found.",
        message: "Page not found, please sure to use a correct endpoints like /api/v1/users/"
    })
})

// ! Middleware for management errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        error: "Internal server error, try again or later."
    })
})

//* Routes
const apiUrl = "/api/v1";
app.use(`${apiUrl}/users`, usersRouter);

export default app;