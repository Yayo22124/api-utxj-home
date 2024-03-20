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
        console.error(`Error in bedroomDao getBedroomsSensors: ${error.message}`);
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
        console.error(`Error in bedroomDao getABedroomsActuators: ${error.message}`);
        throw error;
    }
}

// ! Get only information of bedrooms filter by type = sensors and by location name
bedroomDao.getBedroomsSensorsByName = async (bedroomName, limit = 1000, sortBy, typeSort = 'asc') => {
    try {
        let sensorsData = []
        if (sortBy) {
            // Check if sortBy is a valid property of Bedroom
            const validSortProperty = Object.keys(Bedroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return sensorsData = await Bedroom.find({
                    type: /sensor/i,
                    location: bedroomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Bedroom to sort.`)
            }
        }

        return sensorsData = await Bedroom.find({
            type: /sensor/i,
            location: bedroomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in bedroomDao getBedroomsSensorsByName: ${error.message}`);
        throw error;
    }
}

// ! Get only information of bedrooms filter by type = actuators and by location name
bedroomDao.getBedroomsActuatorsByName = async (bedroomName, limit = 1000, sortBy, typeSort = 'asc') => {
    try {
        let actuatorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of Bedroom
            const validSortProperty = Object.keys(Bedroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return actuatorsData = await Bedroom.find({
                    type: /actuator|actuador/i,
                    location: bedroomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Bedroom to sort.`)
            }
        }

        return actuatorsData = await Bedroom.find({
            type: /actuator|actuador/i,
            location: bedroomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in bedroomDao getAllbedrooms: ${error.message}`);
        throw error;
    }
}

bedroomDao.createBedroomData = async (newData) => {
    try {
        const savedData = await Bedroom.create(newData);

        return savedData;
    } catch (error) {
        console.error(`Error in bedroomDao createBedroomData: ${error.message}`);
        throw error;
    }
}

bedroomDao.getLastRecords = async (bedroomName) => {
    try {
        const sensorsLastRecord = await Bedroom.aggregate([
            { 
                $match: {
                    type: /sensor/i,
                    location: bedroomName
                }
            },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        const actuatorsLastRecord = await Bedroom.aggregate([
            { 
                $match: {
                    type: /actuador/i,
                    location: bedroomName
                }
            },
            // {
            //     $sort: { registeredDate: -1 } // Ordena por fecha de registro en orden descendente
            // },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        return {
            sensorsLastRecord,
            actuatorsLastRecord
        };
    } catch (error) {
        console.error(`Error in getLastRecords: ${error.message}`);
        throw error;
    }
};


bedroomDao.getSensorRecords = async (bedroomName, sensorName) => {
    try {
        const sensorRecords = await Bedroom.find({
            type: /sensor/i,
            location: bedroomName,
            name: sensorName
        }).sort("-registeredDate")

        return sensorRecords
    } catch (error) {
        console.error(`Error in bedroomDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}

bedroomDao.getActuatorRecords = async (bedroomName, actuatorName) => {
    try {
        const actuatorRecords = await Bedroom.find({
            type: /actuador/i,
            location: bedroomName,
            name: actuatorName
        }).sort("-registeredDate")

        return actuatorRecords
    } catch (error) {
        console.error(`Error in bedroomDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}