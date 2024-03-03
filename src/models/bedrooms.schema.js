import { Schema, model } from "mongoose";

const bedroomSchema = new Schema({
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
})
export default model('bedroom', bedroomSchema);