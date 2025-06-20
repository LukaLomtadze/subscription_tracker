import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js'

if(!DB_URI){
    throw new Error("Please define the MONGODB_URI enviremonet variable inside .env.<development/production>.local");
}

//connecting

const connectToDatabase = async() => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connect to database in ${NODE_ENV} mode`)
    }
    catch(err){
        console.error("Error while connecting to database: ", err);
        process.exit(1)
    }
}

export default connectToDatabase;