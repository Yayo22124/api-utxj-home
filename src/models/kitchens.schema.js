import { Schema, model } from "mongoose";

const kitchenSchema = new Schema({
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
    estatus: Boolean
},{
    versionKey: false,
    timestamps: true
})

export default model('kitchen', kitchenSchema);