import { NotFoundException } from "../errors/NotFoundException.error.js";
import { roomsDao }  from "../dao/index.js"

export const roomsController = {}; 

roomsController.getAllNames = async (req, res, next) => {
    try {
        const roomsNames = await roomsDao.getAllRoomsNames();
        console.log(roomsNames);


        // .status is a method that let define specific status code of response (200 is OK (Succes or correct)) 
        res.status(200).json({
            success: true,
            roomsNames
        })
    } catch (error) {
        console.error(`Error in Rooms Controller: getAllNames: ${error.message}`);
        next(error) //Continue to global error handler (error middleware) 
        throw error;
    }
}
