import { NotFoundException } from "../errors/NotFoundException.error.js";
import { garageDao } from "../dao/index.js";

export const garageController = {}

garageController.getAllgarageData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const garageName = req.query.location; //! Getting bedroom name of location param
        console.log(garageName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;

        //* if bedroom name exist, controller get data filtered by location
        if (garageName) {
            sensorsData = await garageDao.getgarageSensorsByName(garageName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
            actuatorsData = await garageDao.getgarageActuatorsByName(garageName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
        } else { 
            // * if bedroom name not exist, data get of all bedrooms
            sensorsData = await garageDao.getgarageSensors();
            actuatorsData = await garageDao.getgarageActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getAllgaragesData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

garageController.creategarageData = async (req, res, next) => {
    try {
        //* get newData for bedroom of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create garage information, is required data by body. ")
        }

        const saveData = await garageDao.creategarageData(newData);

        res.status(200).json({
            success: true,
            message: "New data for garage is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in garage Controller: createBedroomData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}