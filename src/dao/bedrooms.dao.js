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


bedroomDao.getSensorChartData = async (bedroomName, sensorName) => {
    try {
        if (sensorName === "Temperatura y Humedad") {
            const sensorData = await Bedroom.aggregate([
                { 
                    $match: {
                        type: /sensor/i,
                        location: bedroomName,
                        name: sensorName
                    }
                },
                {
                    $unwind: "$readings" // Descomponer el arreglo readings
                },
                {
                    $project: {
                        _id: 0,
                        name: "$readings.name",
                        value: "$readings.value" // Extraer solo los valores de readings
                    }
                }
            ]);

            // Filtrar las lecturas de temperatura y humedad
            const temperatureReadings = sensorData.filter(entry => entry.name.toLowerCase().includes('temperatura'));
            const humidityReadings = sensorData.filter(entry => entry.name.toLowerCase().includes('humedad'));

            // Verificar si se encontraron lecturas para temperatura y humedad
            if (!temperatureReadings.length || !humidityReadings.length) {
                throw new NotFoundException("Lectura de temperatura o humedad no encontrada");
            }

            // Extraer solo los valores de temperatura y humedad
            const temperatureValues = temperatureReadings.map(entry => entry.value);
            const humidityValues = humidityReadings.map(entry => entry.value);

            // Devolver dos arreglos, uno para la temperatura y otro para la humedad
            return [temperatureValues, humidityValues];
        } else {
            // Para otros sensores, manejarlos de manera similar a como lo estabas haciendo antes
            const sensorData = await Bedroom.aggregate([
                { 
                    $match: {
                        type: /sensor/i,
                        location: bedroomName,
                        name: sensorName
                    }
                },
                {
                    $unwind: "$readings" // Descomponer el arreglo readings
                },
                {
                    $project: {
                        _id: 0,
                        value: "$readings.value" // Extraer solo los valores de readings
                    }
                }
            ]);

            if (sensorData.length === 0) {
                throw new NotFoundException(`No se encontraron datos para el sensor ${sensorName} en la habitación ${bedroomName}`);
            }

            // Devolver un solo arreglo con los valores del sensor
            return [sensorData.map(entry => entry.value)];
        }
    } catch (error) {
        console.error(`Error in bedroomDAO getSensorChartData: ${error.message}`);
        throw error;
    }
}
