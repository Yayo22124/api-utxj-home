import User from "../models/users.schema.js";

export const userDao = {}

// Get All Users
userDao.getAll = async () => {
    try {
        const users = await User.find({});

        return users;
    } catch (err) {
        throw new Error("Error getting users.")
    }
}

// Get User
userDao.getUserById = async ( id ) => {
    try {
        const user = await User.findOne({ id });
    
        return user;
    } catch (err) {
        throw new Error("Error getting user.")
    }
}
