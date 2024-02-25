import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        names: String,
        lastNames: String,
    },
    userName: String,
    email: String,
    estatus: Boolean
},{
    versionKey: false,
    timestamps: true
})

export default model('user', userSchema);