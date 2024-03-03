import { NotFoundException } from "../errors/NotFoundException.error.js";
import { KitchenDao } from "../dao/index.js" ;

export const kitchensController = {}

kitchensController.getAllkitchensData = async (req, res, next) => {
    try {
        // Let variables to send actuators/sensors data, depending if location param is used
        let sensorsData = [];
        let actuatorsData = []

        const kitchenName = req.query.location; //! Getting kitchen name of location param
        console.log(kitchenName);
        const dataLimit = req.query.limit;
        const dataSortBy = req.query.sortBy;
        const dataTypeSort = req.query.typeSort;
        
        //* if kitchen name exist, controller get data filtered by location
        if (kitchenName) {
            sensorsData = await KitchenDao.getKitchensSensorsByName(kitchenName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
            actuatorsData = await KitchenDao.getKitchensActuatorsByName(kitchenName, dataLimit || 10, dataSortBy || 'createdAt', dataTypeSort || 'asc');
        } else { 
            // * if kitchen name not exist, data get of all kitchens
            sensorsData = await KitchenDao.getKitchensSensors();
            actuatorsData = await KitchenDao.getKitchensActuators();
        }


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            sensorsData,
            actuatorsData
        })
    } catch (error) {
        console.error(`Error in kitchens Controller: getAllkitchensData: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}

kitchensController.createkitchenData = async (req, res, next) => {
    try {
        //* get newData for kitchen of request body
        const newData =  req.body;

        if (!newData) {
            throw new NotFoundException("To create kitchen information, is required data by body. ")
        }

        const saveData = await KitchenDao.createKitchenData(newData);

        res.status(200).json({
            success: true,
            message: "New data for kitchens is sucessfully created.",
            data: saveData
        })
        
    } catch (error) {
        console.error(`Error in kitchens Controller: createkitchenData: ${error.message}`);
        // next is a http request method that let to continue to next middleware in the list (this case the next middleware is error handler)
        // error handler is a global middleware that is used to response errors to client, this manage errors 
        next(error) //Continue to global error handler (error middleware) 
        throw error;
        
    }
}