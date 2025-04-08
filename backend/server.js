import { configDotenv } from "dotenv";
import express from "express"
import mongoose from "mongoose";

configDotenv()

const port = process.env.PORT || 3001
const app = express();


const startServer = async() =>{
    try {
        //Connect to the database
        await mongoose.connect(process.env.dbURI);
        console.log("Connected to the database succesfully.");

        //Starting the server
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}.`)
        })
    } catch (error) {
        console.log("Error connecting to the database: ", error)
    }
}


startServer()