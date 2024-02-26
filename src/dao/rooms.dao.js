import Room from "../models/room.schema.js";

export const roomDao = {};

roomDao.getAllRooms = async () => {
    try {
        const rooms = await Room.find({});

        return rooms;
    } catch (err) {
        console.error(`Error en getAllRooms Dao: ${err}`);
    }
}

roomDao.getRoomById = async (_id) => {
    try {
        const room = await Room.findOne({ _id });

        return room;
    } catch (err) {
        console.error(`Error en getRoomById Dao: ${err}`);
    }
}

roomDao.insertRoom = async (newRoom) => {
    try {
        const createRoom = await Room.create(newRoom);

        return createRoom;
    } catch (err) {
        console.error(`Error en createRoom Dao: ${err}`);
    }
}

roomDao.updateRoom = async (_id, updatedRoom) => {
    try {
        const updateRoom = await Room.findOneAndUpdate({ _id }, newRoom);

        return updateRoom;
    } catch (err) {
        console.error(`Error en updateRoom Dao: ${err}`);
    }
}

roomDao.deleteRoom = async (_id) => {
    try {
        const deleteRoom = await Room.findOneAndDelete({ _id });

        return deleteRoom;
    } catch (err) {
        console.error(`Error en updateRoom Dao: ${err}`);
    }
}