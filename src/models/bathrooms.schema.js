import { Schema, model } from "mongoose";

const bathroomSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    description: String,
    location: String,
    sensors: [],
    actuators: [],
    status: Boolean
},{
    versionKey: false,
    timestamps: true
})

export default model('bathroom', bathroomSchema);