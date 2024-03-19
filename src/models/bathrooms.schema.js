import { Schema, model } from "mongoose";

const bathroomSchema = new Schema({
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
    }],
    actions: [{
    }]
},{
    versionKey: false
});

export default model('bathroom', bathroomSchema);
