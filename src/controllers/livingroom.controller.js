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
            sensorsData = await livingroomDao.getLivingroomSensorsByName(roomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
            actuatorsData = await livingroomDao.getLivingroomActuatorsByName(roomName, dataLimit || 10, dataSortBy || 'registeredDate', dataTypeSort);
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


livingroomController.getLastRecords = async (req, res, next) => {
    try {
        const livingroomName = req.query.location;

        if (!livingroomName) {
            throw new NotFoundException("Location parameter is required.");
        }

        const { actuatorsLastRecord, sensorsLastRecord } = await livingroomDao.getLastRecords(livingroomName);

        res.status(200).json({
            success: true,
            sensorsData: sensorsLastRecord,
            actuatorsData: actuatorsLastRecord
        });
    } catch (error) {
        console.error(`Error in Last Records Controller: getLastRecords: ${error.message}`);
        next(error);
        throw error;
    }
};


livingroomController.getSensorRecords = async (req,res, next) => {
    try {
        const livingroomName = req.query.location;
        const sensorName = req.query.sensorName;
        
        if (!livingroomName || !sensorName) {
            throw new NotFoundException("'location' and 'sensorName' query params must be required")
        }
        const sensorRecords = await livingroomDao.getSensorRecords(livingroomName, sensorName);

        res.status(200).json({
            success: true,
            records: sensorRecords
        })
    } catch (error) {
        console.error(`Error in Livingrooms Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}

livingroomController.getActuatorRecords = async (req,res, next) => {
    try {
        const livingroomName = req.query.location;
        const actuatorName = req.query.actuatorName;
        
        if (!livingroomName || !actuatorName) {
            throw new NotFoundException("'location' and 'actuatorName' query params must be required")
        }
        const actuatorRecords = await livingroomDao.getActuatorRecords(livingroomName, actuatorName);

        res.status(200).json({
            success: true,
            records: actuatorRecords
        })
    } catch (error) {
        console.error(`Error in Livingrooms Controller: getSensorRecords: ${error.message}`);
        next(error);
        throw error;
    }
}