import { Schema, model } from "mongoose";

<<<<<<<< HEAD:src/models/garage.schema.js
const garageSchema = new Schema({
========
const bathroomSchema = new Schema({
>>>>>>>> eb1fd773c943107a078100c4bdbb87fb2eced35b:src/models/bathrooms.schema.js
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
<<<<<<<< HEAD:src/models/garage.schema.js
export default model('garage', garageSchema);
========
export default model('bathroom', bathroomSchema);
>>>>>>>> eb1fd773c943107a078100c4bdbb87fb2eced35b:src/models/bathrooms.schema.js
