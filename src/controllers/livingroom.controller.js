import { NotFoundException } from "../errors/NotFoundException.error.js";
import { livingroomDao } from "../dao/index.js";

export const livingroomController = {}

livingroomController.getAll = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const roomName = req.query.location; //! Getting livingroom name of location param
        console.log(roomName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;

        //* if livingroom name exist, controller get data filtered by location
        if (roomName) {
            sensorsData = await livingroomDao.getLivingroomSensorsByName(roomName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
            actuatorsData = await livingroomDao.getLivingroomActuatorsByName(roomName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
        } else { 
            // * if livingroom name not exist, data get of all livingroom
            sensorsData = await livingroomDao.getLivingroomSensors();
            actuatorsData = await livingroomDao.getLivingroomActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Livingroom Controller: getAll: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

livingroomController.createLivingroomData = async (req, res, next) => {
    try {
        //* get newData for livingroom of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create livingroom information, is required data by body. ")
        }

        const saveData = await livingroomDao.createLivingroomData(newData);

        res.status(200).json({
            success: true,
            message: "New data for livingroom is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in Livingroom Controller: createLivingroomData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}