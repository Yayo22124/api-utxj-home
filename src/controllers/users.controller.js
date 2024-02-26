import { userDao } from "../dao/index.js";

export const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
    try {
        const users = await userDao.getAll();
        //* Response
        res.json(users);
    } catch (err) {
        //! Query Error
        console.error(`Error en getAllUsers: ${err}`);
        res.status(500).json({
            status: 500,
            error: "Error getting users."
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
        const user = await userDao.getAll();

        //! Error: User not found in Database;
        if (!user) {
            return res.status(404).json({
                status: 404,
                error: `User with Id: ${userId} not found.`
            })    
        } 

        res.json({user});
    } catch (err) {
        //! Query Error
        console.error(`Error en getUserById: ${err}`);
        res.status(500).json({
            status: 500,
            error: "Error getting user."
        });
    }
}