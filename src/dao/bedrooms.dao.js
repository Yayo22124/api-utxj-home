import Bedroom from "../models/bedrooms.schema.js";
import { NotFoundException } from "../errors/index.js" //! Custom errors

// bedroomsDao object
export const bedroomDao = {}

bedroomDao.getAllBedrooms = async () => {
    try {
        const bedroomsData = await Bedroom.find({});

        return bedroomsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.getBedroomsSensors = async () => {
    try {
        const sensorsData = await Bedroom.find({
            type: /sensor/i
        }).limit(1);
    
        return sensorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.getBedroomsActuators = async () => {
    try {
        const actuatorsData = await Bedroom.find({
            type: /actuator|actuador/i
        }).limit(1);
    
        return actuatorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.getBedroomsSensorsByName = async (bedroomName) => {
    try {
        const sensorsData = await Bedroom.find({
            type: /sensor/i,
            location: bedroomName
        }).limit(1);
    
        return sensorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.getBedroomsActuatorsByName = async (bedroomName) => {
    try {
        const actuatorsData = await Bedroom.find({
            type: /actuator|actuador/i,
            location: bedroomName
        }).limit(1);
    
        return actuatorsData;
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.getOneBedroomById = async (sensorId) => {
    try {
        const bedroomData = await Bedroom.findOne({
            _id: sensorId
        });

        // If bedroomData is null or undefined, shoot a NotFound Error
        if (!bedroomData) {
            throw new NotFoundException(`Bedroom with ID: ${sensorId} not found.`)
        }

        return bedroomData;
    } catch (error) {
        console.error(`Error in bedroomDao getOneSensorById: ${error.message}`);
        throw error;
    }
}