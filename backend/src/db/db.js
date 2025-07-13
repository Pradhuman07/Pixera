import mongoose from "mongoose";
import config from "../config/config.js";

function connectDB(){
    mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
    }

export default connectDB;