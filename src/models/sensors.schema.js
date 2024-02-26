import { Schema, model } from "mongoose";

const sensorSchema = new Schema({
    "type": String,
    "name": String,
    "brand": String,
    "model": String,
    "specifications": [
        {
            "range": Number,
            "units": String
        }
    ],
    "location": String,
    "status": Boolean,
    "initialDate": Date,
    "owner": String,
    "startsAt": Date,
    "endsAt": Date,
    "readings": [{
        "name": String,
        "value": Number,
        "measuramentUnit": String
    }],
},{
    versionKey: false,
    timestamps: true
})

export default model('sensor', sensorSchema);