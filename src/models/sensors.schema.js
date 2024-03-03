import { Schema, model } from "mongoose";

const sensorSchema = new Schema({
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
        value: Float,
        measuramentUnit: String 
    }]
})
export default model('sensor', sensorSchema);