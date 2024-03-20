import Mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config({path: "src/.env"})

const connectionUrl = process.env.CONNECTION_DB || process.env.CONNECTION_DB_LOCAL; 

try {
    Mongoose.connect(connectionUrl)
    console.log(`
    #############################################

        Mongo Database Succesfully Connected
        
    #############################################
    `)

} catch (err) {
    console.log(err)
} 