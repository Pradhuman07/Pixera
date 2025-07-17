import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,   // user ki id store karenge
        ref:'users'                          // users collection ke andr jaake user ki details ko refer kro to retrieve the user id
    },
    mentions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})

const postModel = mongoose.model('posts',postSchema)


export default postModel;