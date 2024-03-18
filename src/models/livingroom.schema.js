import { Schema, model } from "mongoose";

const livingroomSchema = new Schema({
    arduinoIp: String,
    type: String,
    name: String,
    brand: String,
    model: String,
    specifications: [{}],
    location: String,
    status: String,
    registeredDate: {
        type: Date,
        default: Date.now
    },
    owner: String,
    readings: [{
        name: String,
        value: Number,
        measurementUnit: String
    }],
    actions: [{
        name: String,
        value: Boolean
    }]
},{
    versionKey: false
});

export default model('livingroom', livingroomSchema);
