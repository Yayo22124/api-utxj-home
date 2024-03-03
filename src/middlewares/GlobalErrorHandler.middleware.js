import { NotFoundException } from "../errors/index.js";

export const errorHandler = (err,req, res, next) => {
    console.error(`Error Handler Detected: ${err}`);

    // Error status code by default or get of err.statusCode, property of own custom errors.
    const statusCode = err.statusCode || 500;

    // Response the error by type of error
    if (err instanceof NotFoundException) { //* If err is an instance of specific error, response with specific message. 
        res.status(404).json({
            success: false,
            message: err.name,
            error: err.message
        })
    }

    // Default error response
    res.status(500).json({
        success: false,
        message: "InternalServerError",
        error: err || "Internal server error, try again or later."
    })
}