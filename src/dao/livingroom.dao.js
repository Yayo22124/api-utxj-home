import Livingroom from "../models/livingroom.schema.js";
import { NotFoundException } from "../errors/index.js" //! Custom errors

export const livingroomDao = {}


// ! Get all information of livingroom (all livingroom and sensors/actuators)
livingroomDao.getAll = async () => {
    try {
        const livingroomData = await Livingroom.find({}).sort({
            initialDate: 1
        });

        return livingroomData;
    } catch (error) {
        console.error(`Error in livingroomDao getAll: ${error.message}`);
        throw error;
    }
}


// ! Get only information of livingroom filter by type = sensors
livingroomDao.getLivingroomSensors = async () => {
    try {
        const sensorsData = await Livingroom.find({
            type: /sensor/i
        }).sort({
            initialDate: 1
        });
        
        return sensorsData;
    } catch (error) {
        console.error(`Error in livingroomDao getLivingroomSensors: ${error.message}`);
        throw error;
    }
}

// ! Get only information of livingroom filter by type = actuators
livingroomDao.getLivingroomActuators = async () => {
    try {
        const actuatorsData = await Livingroom.find({
            type: /actuator|actuador/i
        }).sort({
            initialDate: 1
        });
        
        return actuatorsData;
    } catch (error) {
        console.error(`Error in livingroomDao livingroomActuators: ${error.message}`);
        throw error;
    }
}

// ! Get only information of livingroom filter by type = sensors and by location name
livingroomDao.getLivingroomSensorsByName = async (roomName, limit = 10, sortBy, typeSort = 'asc') => {
    try {
        let sensorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of livingroom
            const validSortProperty = Object.keys(Livingroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return sensorsData = await Livingroom.find({
                    type: /sensor/i,
                    location: roomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of livingroom to sort.`)
            }
        }

        return sensorsData = await Livingroom.find({
            type: /sensor/i,
            location: roomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in livingroomDao getLivingroomSensorsByName: ${error.message}`);
        throw error;
    }
}

// ! Get only information of livingroom filter by type = actuators and by location name
livingroomDao.getLivingroomActuatorsByName = async (roomName, limit = 10, sortBy, typeSort = 'asc') => {
    try {
        let actuatorsData = [];
        if (sortBy) {
            // Check if sortBy is a valid property of livingroom
            const validSortProperty = Object.keys(Livingroom.schema.paths).includes(sortBy);

            if (validSortProperty) {
                return actuatorsData = await Livingroom.find({
                    type: /actuator|actuador/i,
                    location: roomName
                }).sort({
                    sortBy: typeSort == 'asc' ? 1 : -1
                }).limit(limit);
            } else {
                throw new Error(`${sortBy} is not a valid property of livingroom to sort.`)
            }
        }

        return actuatorsData = await Livingroom.find({
            type: /actuator|actuador/i,
            location: roomName
        }).limit(limit);
    } catch (error) {
        console.error(`Error in livingroomDao getLivingroomActuatorsByName: ${error.message}`);
        throw error;
    }
}

livingroomDao.createLivingroomData = async (newData) => {
    try {
        const savedData = await Livingroom.create(newData);

        return savedData;
    } catch (error) {
        console.error(`Error in livingroomDao createLivingroomData: ${error.message}`);
        throw error;
    }
}