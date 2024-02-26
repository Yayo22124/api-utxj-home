import { roomDao } from "../dao/index.js";

export const roomsController = {};

roomsController.getAllRooms = async (req, res, next) => {
    try {
        const rooms = roomDao.getAllRooms();

        res.status(200).json({
            status: 200,
            rooms
        });
    } catch (err) {
        console.error(`Error en getAllRooms Controller: ${err}`);
        res.status(500).json({
            status: 500,
            error: `Internal server error, try again or try later.`
        })
    }
}

roomsController.getRoomById = async (req, res, next) => {
    const roomId = req.params._id;

    // ! Error: Endpoint dont receive an user Id
    if (!roomId) {
        next(new Error("This endpoint require a valid param for Room ID."))
    }

    try {
        const room = roomDao.getRoomById(roomId)

        if (!room) {
            return res.status(404).json({
                status: 404,
                error: `Room with id: ${roomId}, not found.`
            })    
        }

        return res.status(200).json({
            status: 200,
            room
        })
    } catch (err) {
        console.error(`Error en getRoomById Controller: ${err}`);
        res.status(500).json({
            status: 500,
            error: `Error getting room, please try again or try later.`
        })
    }
}

roomsController.insertRoom = async (req, res, next) => {
    const newRoom = req.body;

    if (!newRoom) {
        next(new Error("This endpoint mus be need a new room in a body."))
    }

    try {
        const saveRoom = roomDao.insertRoom(newRoom);

        res.status(200).json({
             status: 200,
             message: "Room succesfully saved."
        })
    } catch (err) {
        console.error(`Error en insertRoom Controller: ${err}`);
    }
}