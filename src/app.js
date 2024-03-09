import Express from "express";
import bathroomsRouter from "./routes/bathrooms.routes.js";
import bedroomsRouter  from "./routes/bedrooms.routes.js";
import cors from "cors";
import { errorHandler } from "./middlewares/index.js";
import garageRouter from "./routes/garage.routes.js";
import kitchenRouter from "./routes/kitchen.routes.js";
import livingroomRouter  from "./routes/livingroom.routes.js";
import  morgan  from "morgan";
import roomsRouter from "./routes/rooms.routes.js";

// ! Express instance for application.
const app = new Express();
// ! BedroomsRoutes instance for application


//* Settings
//* Middlewares
app.use(cors())
app.use(Express.json()) // Use JSON estandard for Express Application.
app.use(morgan('dev'))
app.use(Express.urlencoded({
    extended: false
}))

//* Routes
const apiUrl = "/api/v1"; // Routes root endpoint
app.use(`${apiUrl}/bedrooms`, bedroomsRouter)
app.use(`${apiUrl}/kitchens`, kitchenRouter)
app.use(`${apiUrl}/bathrooms`, bathroomsRouter)
app.use(`${apiUrl}/garages`, garageRouter)
app.use(`${apiUrl}/livingrooms`, livingroomRouter)
app.use(`${apiUrl}/rooms`, roomsRouter)

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