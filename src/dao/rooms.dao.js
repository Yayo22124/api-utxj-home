import Batroom from "../models/bathrooms.schema.js";
import Bedroom from "../models/bedrooms.schema.js";
import Garage from "../models/garage.schema.js";
import Kitchen from "../models/kitchen.schema.js";
import Livingroom from "../models/livingroom.schema.js";

export const roomsDao = {};

roomsDao.getAllRoomsNames = async () => {
    try {
        const roomNames = {
            bedrooms:  await Bedroom.distinct("location"), 
            bathrooms:  await Batroom.distinct("location"), 
            garages:  await Garage.distinct("location"), 
            kitchens:  await Kitchen.distinct("location"), 
            livingrooms:  await Livingroom.distinct("location"), 
        };

        return roomNames;
    } catch (error) {
        console.error(`Error in roomsDao getAllRoomsName: ${error.message}`);
        throw error;
    }
}