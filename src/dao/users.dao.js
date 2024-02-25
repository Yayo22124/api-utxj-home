import User from "../models/users.schema.js";

export const userDao = {}

// Get All Users
userDao.getAll = async () => {
    const users = await User.find({});

    return users;
}

// Get User
userDao.getUserById = async ( id ) => {
    const user = await User.findOne({ id });

    return user;
}
