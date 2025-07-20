// Note :- Posts:- { image , caption , mentions , createdAt , userId}
// "image" from imageKit, "caption" from AI, "mentions" from user input, "createdAt" from model/schema timestamp, "userId" from tokenization i.e from authmiddleware

import { uploadFile } from "../services/storage.service.js";        // Image aagyi
import { generateCaption } from "../services/ai.service.js";        // Caption aagya

import { v4 as uuid } from "uuid";  // For generating unique IDs

// Now just need mentions and generate the post

export async function createPost(req, res) {
    const { mentions } = req.body;                  // Mentions from user input

    // const file = await uploadFile(req.file, uuid())     // 3s
    // const caption = await generateCaption(req.file);    // 3s // Total time:3s + 3s = ~6s
    
    // Instead of waiting for each operation sequentially, we can run them in parallel  
    const [file, caption] = await Promise.all([     // Run both operations in parallel to save time
        uploadFile(req.file, uuid()),    // 3s
        generateCaption(req.file)        // 3s
    ]);
    // Total time: ~3s instead of ~6s

    console.log(req.user);   // is naam ki property h nhi pr hmne bnai 
    
}