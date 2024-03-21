import Bathroom from "../models/bathrooms.schema.js";
import { NotFoundException } from "../errors/index.js"

export const bathroomDao = {}
bathroomDao.getAllBathrooms = async () => {
    try {
        const bathroomsData = await Bathroom.find({}).sort({
            initialDate: 1
        })
        return bathroomsData;
    } catch (error) {
        console.error(`Error in bathroomDao getAllbathrooms: ${error.message}`);
        throw error;
    }
}
bathroomDao.getBathroomsSensors = async () => {
    try {
        const sensorsData = await Bathroom.find({
            type: /sensor/i
        }).sort({
            initialDate: 1
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in bathroomDao getAllbathrooms: ${error.message}`);
        throw error;
    }
}
bathroomDao.getBathroomsActuators = async () => {
    try {
        const actuatorsData = await Bathroom.find({
            type: /actuator|actuador/i
        }).sort({
            initialDate: 1
        });
        
        return actuatorsData;
    } catch (error) {
        console.error(`Error in bathroomDao getAllbathrooms: ${error.message}`);
        throw error;
    }
}
bathroomDao.getBathroomsSensorsByName = async (bathroomName, limit = 1000, sortBy, typeSort = 'asc') => {
    try {
        let sensorsData = [];
        if (sortBy) {
            const validSortProperty = Object.keys(Bathroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return sensorsData = await Bathroom.find({
                    type: /sensor/i,
                    location: bathroomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Bathroom to sort.`)
            }
        }

        return sensorsData = await Bathroom.find({
            type: /sensor/i,
            location: bathroomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in bathroomDao getAllbathrooms: ${error.message}`);
        throw error;
    }
}
bathroomDao.getBathroomsActuatorsByName = async (bathroomName, limit = 1000, sortBy, typeSort = 'asc') => {
    try {
        let actuatorsData = [];
        if (sortBy) {
            const validSortProperty = Object.keys(Bathroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return actuatorsData = await Bathroom.find({
                    type: /actuator|actuador/i,
                    location: bathroomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of Bathroom to sort.`)
            }
        }

        return actuatorsData = await Bathroom.find({
            type: /actuator|actuador/i,
            location: bathroomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in bathroomDao getAllbathrooms: ${error.message}`);
        throw error;
    }
}
bathroomDao.createBathroomData = async (newData) => {
    try {
        const savedData = await Bathroom.create(newData);

        return savedData;
    } catch (error) {
        console.error(`Error in bathroomDao createbathroomData: ${error.message}`);
        throw error;
    }
}

bathroomDao.getLastRecords = async (bathroomName) => {
    try {
        const sensorsLastRecord = await Bathroom.aggregate([
            { 
                $match: {
                    type: /sensor/i,
                    location: bathroomName
                }
            },
            {
                $group: {
                    _id: "$name",
                    lastRecord: { $last: "$$ROOT" }
                }
            }
        ]);

        const actuatorsLastRecord = await Bathroom.aggregate([
            { 
                $match: {
                    type: /actuador/i,
                    location: bathroomName
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

bathroomDao.getSensorRecords = async (bathroomName, sensorName) => {
    try {
        const sensorRecords = await Bathroom.find({
            type: /sensor/i,
            location: bathroomName,
            name: sensorName
        }).sort("-registeredDate")

        return sensorRecords
    } catch (error) {
        console.error(`Error in bathroomDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}

bathroomDao.getActuatorRecords = async (bathroomName, actuatorName) => {
    try {
        const actuatorRecords = await Bathroom.find({
            type: /actuador/i,
            location: bathroomName,
            name: actuatorName
        }).sort("-registeredDate")

        return actuatorRecords
    } catch (error) {
        console.error(`Error in bathroomDAO getSensorRecords: ${error.message}`);
        throw error;
    }
}