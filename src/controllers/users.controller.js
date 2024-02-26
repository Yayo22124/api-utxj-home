import { userDao } from "../dao/index.js";

export const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
    try {
        const users = await userDao.getAll();
        //* Response
        res.status(200).json({
            status: 200,
            users
        });
    } catch (err) {
        //! Query Error
        console.error(`Error en getAllUsers: ${err}`);
        res.status(500).json({
            status: 500,
            error: err
        });
    }
}

usersController.getUserById = async (req, res, next) => {
    const userId = req.params.id;

    // ! Error: Endpoint dont receive an user Id
    if (!userId) {
        next(new Error("This endpoint require a valid param for User ID."))
    } 

    try {
        const user = await userDao.getUserById(userId);

        //! Error: User not found in Database;
        if (!user) {
            return res.status(404).json({
                status: 404,
                error: `User with Id: ${userId} not found.`
            })    
        } 

        res.status(200).json({
            status: 200,
            user
        });
    } catch (err) {
        //! Query Error
        console.error(`Error en getUserById: ${err}`);
        res.status(500).json({
            status: 500,
            error: err
        });
    }
}