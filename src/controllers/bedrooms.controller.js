import { NotFoundException } from "../errors/NotFoundException.error.js";
import { bedroomDao } from "../dao/index.js";

export const bedroomsController = {}

bedroomsController.getAllBedroomsData = async (req, res, next) => {
    try {
        const sensorsData = await bedroomDao.getBedroomsSensors();
        const actuatorsData = await bedroomDao.getBedroomsActuators();

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