import { Schema, model } from "mongoose";

const bedroomSchema = new Schema({
    type: String,
    name: String,
    brand: String,
    model: String,
    specifications: [{
        name: String,
        maxValue: Number,
        minValue: Number,
        measurementUnit: String,
        accuracy: String
    }],
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
        value: Number,
        measurementUnit: String
    }]
},{
    versionKey: false
});

export default model('bedroom', bedroomSchema);
