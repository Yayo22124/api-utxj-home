import Mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config({path: "src/.env"})

const connectionUrl = process.env.CONNECTION_DB || "mongodb://localhost:27017"; 

try {
    Mongoose.connect(connectionUrl)
    db => console.log(`
    ############################## /n
        Mongo Database Succesfully Connected
    /n##############################
    `)

} catch (err) {
    console.log(err)
} 

export default Mongoose;