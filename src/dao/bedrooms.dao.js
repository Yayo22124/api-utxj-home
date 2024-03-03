import Bedroom from "../models/bedrooms.schema.js";
import { NotFoundException } from "../errors/index.js" //! Custom errors

// bedroomsDao object
export const bedroomDao = {}

// ! Get all information of bedrooms (all bedrooms and sensors/actuators)
bedroomDao.getAllBedrooms = async () => {
    try {
        const bedroomsData = await Bedroom.find({}).sort({
            initialDate: 1
        });

        return bedroomsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}


// ! Get only information of bedrooms filter by type = sensors
bedroomDao.getBedroomsSensors = async () => {
    try {
        const sensorsData = await Bedroom.find({
            type: /sensor/i
        }).sort({
            initialDate: 1
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

// ! Get only information of bedrooms filter by type = actuators
bedroomDao.getBedroomsActuators = async () => {
    try {
        const actuatorsData = await Bedroom.find({
            type: /actuator|actuador/i
        }).sort({
            initialDate: 1
        });
        
        return actuatorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

// ! Get only information of bedrooms filter by type = sensors and by location name
bedroomDao.getBedroomsSensorsByName = async (bedroomName) => {
    try {
        const sensorsData = await Bedroom.find({
            type: /sensor/i,
            location: bedroomName
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

// ! Get only information of bedrooms filter by type = actuators and by location name
bedroomDao.getBedroomsActuatorsByName = async (bedroomName) => {
    try {
        const actuatorsData = await Bedroom.find({
            type: /actuator|actuador/i,
            location: bedroomName
        }).sort({
            initialDate: 1
        });
    
        return actuatorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}