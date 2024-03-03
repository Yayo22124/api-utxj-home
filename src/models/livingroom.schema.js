import { Schema, model } from "mongoose";

const livingroomSchema = new Schema({
    type: String,
    name: String,
    brand: String,
    model: String,
    specifications: [],
    location: String,
    status: String,
    initialDate: String,
    owner: String,
    startsAt: String,
    endsAt: String,
    readings: [{
        name: String,
        value: Number,
        measuramentUnit: String 
    }],
    actions: [{
        name: String,
        value: Number,
        duration: Number,
        measuramentUnit: String 
    }]
},{
    timestamps: true,
    versionKey: false
})
export default model('livingroom', livingroomSchema);