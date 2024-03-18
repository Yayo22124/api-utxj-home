import { NotFoundException } from "../errors/NotFoundException.error.js";
import { bathroomDao } from "../dao/index.js";

export const bathroomsController = {}

bathroomsController.getAllBathroomsData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const bathroomName = req.query.location; //! Getting bathroom name of location param
        console.log(bathroomName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;

        //* if bathroom name exist, controller get data filtered by location
        if (bathroomName) {
            sensorsData = await bathroomDao.getBathroomsSensorsByName(bathroomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
            actuatorsData = await bathroomDao.getBathroomsActuatorsByName(bathroomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
        } else { 
            // * if bathroom name not exist, data get of all bathrooms
            sensorsData = await bathroomDao.getBathroomsSensors();
            actuatorsData = await bathroomDao.getBathroomsActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Bathrooms Controller: getAllBathroomsData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

bathroomsController.createBathroomData = async (req, res, next) => {
    try {
        //* get newData for bathroom of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create bathroom information, is required data by body. ")
        }

        const saveData = await bathroomDao.createBathroomData(newData);

        res.status(200).json({
            success: true,
            message: "New data for bathrooms is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in Bathrooms Controller: createBathroomData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}