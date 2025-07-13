import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    avatar: {
        type: String,
        default: "https://img.favpng.com/21/13/5/user-profile-default-computer-icons-network-video-recorder-png-favpng-7dPZA8WRdY80Uw3bdMWkEN4fR.jpg",  
        trim: true,   
    },

    bio: {
        type: String,
        default: "Hello! I'm using Pixera.",
        trim: true,
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;