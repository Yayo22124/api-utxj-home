import { Schema, model } from "mongoose";
const actuatorSchema = new Schema({
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
    actions: [{
        name: String,
        value: Float,
        duration: Float,
        measuramentUnit: String 
    }]
})
export default model('actuator', actuatorSchema);