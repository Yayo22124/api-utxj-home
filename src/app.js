import Express from "express";
import  morgan  from "morgan";

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


// ! Middleware for management errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        error: "Internal server error, try again or later."
    })
})

// ! Middleware 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "Endpoint not available or not found.",
        message: "Page not found, please sure to use a correct endpoints like"
    })
})

export default app;