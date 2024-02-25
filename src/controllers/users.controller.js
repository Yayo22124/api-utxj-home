import { userDao } from "../dao/index.js";

export const usersController = {};

usersController.getAllUsers = async (req, res) => {
    try {
        const users = await userDao.getAll();
        //* Response
        res.json(users);
    } catch (err) {
        //! Query Error
        res.json({err});
        console.error(err);
        throw new Error(err);
    }
}

usersController.getUserById = async (req, res) => {
    try {
        const user = await userDao.getAll();
        res.json({user});
    } catch (err) {
        //! Query Error
        res.json({err});
        console.error(err);
        throw new Error(err);
    }
}