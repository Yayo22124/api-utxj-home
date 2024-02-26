import { livingroomsDao } from "../dao/index.js";

const livingroomsController = {}

livingroomsController.getAll = async (req,res,next) => {
    try {
        const livingRooms = await livingroomsDao.getAll();

        res.status(200).json({
            status: 200,
            livingRooms
        })
    } catch(err) {
        console.error(`Error en LivingRooms Controller getAll: ${err}`);
    }
}

livingroomsController.getOne = async (req,res,next) => {
    const livingRoomId = req.params.id;

    if (!id) {
        next(new Error(`This Endpoint require a living room ID.`))
    }

    try {
        const livingRoom = await livingroomsDao.getAll();

        if (!livingRoom) {
            res.status(404).json({
                status: 404,
                error: `Living room with id: ${id}, not found.`
            })
        }

        res.status(200).json({
            status: 200,
            livingRoom
        })
    } catch(err) {
        console.error(`Error en LivingRooms Controller getAll: ${err}`);
        res.status(500).json({
            status: 500,
            error: `Error getting livingroom, please try again or try later.`
        })
    }
}