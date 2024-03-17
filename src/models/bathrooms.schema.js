import { Schema, model } from "mongoose";

const bathroomSchema = new Schema({
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
        value: Number,
        measurementUnit: String
    }]
},{
    versionKey: false
});

export default model('bathroom', bathroomSchema);
