/* Note: Post Contains -> { image , caption , mentions , createdAt , userId}
        - "image" from imageKit,
        - "caption" from AI, 
        - "mentions" from user input (req.body), 
        - "createdAt" automatically by mongoose schema timestamps, 
        - "userId" from authmiddleware
*/


import { uploadFileOnImageKit } from "../services/storage.service.js";        // Image upload ke liye
import { generateCaption } from "../services/ai.service.js";        // Caption generate karne ke liye
import { v4 as uuid } from "uuid";                                  // For generating file name using unique IDs

import { createPost, getPosts } from "../dao/post.dao.js";
import { createComment } from "../dao/comment.dao.js";

export async function createPostController(req, res) {

    const { mentions } = req.body;                  // Mentions from user input

    // const file = await uploadFileOnImageKit(req.file, uuid())     // 3s
    // const caption = await generateCaption(req.file);    // 3s // Total time:3s + 3s = ~6s

    // Instead of waiting for each operation sequentially, we can run them in parallel
    // Run both operations through Promise.all in parallel to save time
    // Total time: ~3s instead of ~6s

    const [file, caption] = await Promise.all([      // file and caption from req.file through Imagekit and AI service
        uploadFileOnImageKit(req.file, uuid()),    // 3s
        generateCaption(req.file)        // 3s
    ]);

    // console.log(req.user);                           // is naam ki property thi nhi hmne bnai h, auth middleware me, whi se aai h 

    const post = await createPost({
        image: file.url,                           // Image URL from uploadFileOnImageKit
        caption: caption,                          // Caption from AI service
        mentions: mentions,                        // Mentions from user input
        user: req.user._id,                        // User ID from auth middleware
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    });

}

export async function getPostController(req, res) {

    const posts = await getPosts(req.query.skip, Math.min(req.query.limit, 20))

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

export async function createCommentController(req, res) {
    const { post, text } = req.body     // Post ID and comment text from user input
    const user = req.user               // User details from auth middleware

    const comment = await createComment({
        user: user._id,
        post,
        text
    })

    return res.status(201).json({
        message: "Comment created successfully",
        comment
    })
}