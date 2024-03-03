import Express from "express";
import bedroomsRouter  from "./routes/bedrooms.routes.js";
import bathroomsRouter from "./routes/bathrooms.routes.js";
import { errorHandler } from "./middlewares/index.js";
import  morgan  from "morgan";

// ! Express instance for application.
const app = new Express();
// ! BedroomsRoutes instance for application


//* Settings
//* Middlewares
app.use(Express.json()) // Use JSON estandard for Express Application.
app.use(morgan('dev'))
app.use(Express.urlencoded({
    extended: false
}))

//* Routes
const apiUrl = "/api/v1"; // Routes root endpoint
app.use(`${apiUrl}/bedrooms`, bedroomsRouter)
app.use(`${apiUrl}/bathrooms`, bathroomsRouter)

// ! Middleware for management errors
app.use(errorHandler)

// ! Middleware 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "Endpoint not available or not found.",
        message: "Page not found, please sure to use a correct endpoints like"
    })
})

export default app;