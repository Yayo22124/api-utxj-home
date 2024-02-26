import { Schema, model } from "mongoose";

const bedroomSchema = new Schema({
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

export default model('bedroom', bedroomSchema);