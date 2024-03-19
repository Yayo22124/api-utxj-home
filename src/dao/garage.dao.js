import { NotFoundException } from "../errors/index.js" //! Custom errors
import garage from "../models/garage.schema.js";

// garageDao object
export const garageDao = {}

// ! Get all information of garage (all garage and sensors/actuators)
garageDao.getAllgarage = async () => {
    try {
        const garageData = await garage.find({}).sort({
            initialDate: 1
        });

        return garageData;
    } catch (error) {
        console.error(`Error in garageDao getAllgarage: ${error.message}`);
        throw error;
    }
}

// ! Get only information of garage filter by type = sensors
garageDao.getgarageSensors = async () => {
    try {
        const sensorsData = await garage.find({
            type: /sensor/i
        }).sort({
            initialDate: 1
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in garageDao getAllgarage: ${error.message}`);
        throw error;
    }
}

// ! Get only information of garage filter by type = actuators
garageDao.getgarageActuators = async () => {
    try {
        const actuatorsData = await garage.find({
            type: /actuator|actuador/i
        }).sort({
            initialDate: 1
        });
        
        return actuatorsData;
    } catch (error) {
        console.error(`Error in garageDao getAllgarage: ${error.message}`);
        throw error;
    }
}

// ! Get only information of garage filter by type = sensors and by location name
garageDao.getgarageSensorsByName = async (garageName, limit = 10, sortBy, typeSort = 'asc') => {
    try {
        let sensorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of garage
            const validSortProperty = Object.keys(garage.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return sensorsData = await garage.find({
                    type: /sensor/i,
                    location: garageName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of garage to sort.`)
            }
        }

        return sensorsData = await garage.find({
            type: /sensor/i,
            location: garageName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in garageDao getAllgarage: ${error.message}`);
        throw error;
    }
}

// ! Get only information of garage filter by type = actuators and by location name
garageDao.getgarageActuatorsByName = async (garageName, limit = 10, sortBy, typeSort = 'asc') => {
    try {
        let actuatorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of garage
            const validSortProperty = Object.keys(garage.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return actuatorsData = await garage.find({
                    type: /actuator|actuador/i,
                    location: garageName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of garage to sort.`)
            }
        }

        return actuatorsData = await garage.find({
            type: /actuator|actuador/i,
            location: garageName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in garageDao getAllgarage: ${error.message}`);
        throw error;
    }
}

garageDao.creategarageData = async (newData) => {
    try {
        const savedData = await garage.create(newData);

        return savedData;
    } catch (error) {
        console.error(`Error in garageDao creategarageData: ${error.message}`);
        throw error;
    }
}

garageDao.getLastRecords = async (garageName) => {
    try {
        const sensorsLastRecord = await garage.aggregate([
            { 
                $match: {
                    type: /sensor/i,
                    location: garageName
                }
            },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        const actuatorsLastRecord = await garage.aggregate([
            { 
                $match: {
                    type: /actuador/i,
                    location: garageName
                }
            },
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
