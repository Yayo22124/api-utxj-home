import Livingroom from "../dao/livingRooms.dao.js";

const livingroomDao = {};

livingroomDao.getAll = async () => {
    try {
        const livingRooms = await Livingroom.find({});

        return livingRooms;
    } catch (err){
        console.error(`Error en LivingRooms getAll DAO: ${err}`);
    }
} 

livingroomDao.getOne = async (id) => {
    try {
        const livingRoom = await Livingroom.find({id});

        return livingRoom;
    } catch (err){
        console.error(`Error en LivingRoom getOne DAO: ${err}`);
    }
} 

livingroomDao.insertOne = async (newLivingroom) => {
    try {
        const createLivingRoom = await Livingroom.create(newLivingroom);

        return createLivingRoom;
    } catch (err){
        console.error(`Error en LivingRoom insertOne DAO: ${err}`);
    }
} 

livingroomDao.updateOne = async (id, updateLivingroom) => {
    try {
        const setLivingRoom = await Livingroom.findOneAndUpdate({id}, updateLivingroom);

        return setLivingRoom;
    } catch (err){
        console.error(`Error en LivingRoom updateOne DAO: ${err}`);
    }
} 

livingroomDao.deleteOne = async (id) => {
    try {
        const removeLivingRoom = await Livingroom.findOneAndDelete({id});

        return removeLivingRoom;
    } catch (err){
        console.error(`Error en LivingRoom deleteOne DAO: ${err}`);
    }
} 
