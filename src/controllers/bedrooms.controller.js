import { NotFoundException } from "../errors/NotFoundException.error.js";
import { bedroomDao } from "../dao/index.js";

export const bedroomsController = {}

bedroomsController.getAllBedroomsData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const bedroomName = req.query.location; //! Getting bedroom name of location param
        console.log(bedroomName);

        //* if bedroom name exist, controller get data filtered by location
        if (bedroomName) {
            sensorsData = await bedroomDao.getBedroomsSensorsByName(bedroomName);
            actuatorsData = await bedroomDao.getBedroomsActuatorsByName(bedroomName);
        } else { 
            // * if bedroom name not exist, data get of all bedrooms
            sensorsData = await bedroomDao.getBedroomsSensors();
            actuatorsData = await bedroomDao.getBedroomsActuators();
        }

        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getAllBedroomsData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

bedroomsController.getAllBedroomsDataByName = async (req, res, next) => {
    try {
        const bedroomName = req.query.location;
        console.log(bedroomName);
        if (!bedroomName) {
            throw new NotFoundException("Bedroom name is required like request param.")
        }
        const sensorsData = await bedroomDao.getBedroomsSensorsByName(bedroomName);
        const actuatorsData = await bedroomDao.getBedroomsActuatorsByName(bedroomName);

        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getAllBedroomsData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

bedroomsController.getOneBedroomByName = async (req, res, next) => {
    try {
        const bedroomName = req.params.name;
        if (!bedroomName) {
            throw new NotFoundException("Bedroom name is required like request param.")
        }
        const bedroomData = await bedroomDao.getOneBedroomById();
        
        if (!bedroomData) {
            throw new NotFoundException(`Bedroom with name: ${bedroomName} not found.`)
        }
        
        res.status(200).json({
            success: true,
            data: bedroomData
        })
    } catch (error) {
        console.error(`Error in Bedrooms Controller: getOneBedRoomByName: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}