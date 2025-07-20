import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";
import multer from "multer";

// const storage = multer.memoryStorage();  // Store file in memory
// const upload = multer({ storage: storage });  // Configure multer to use memory storage

const upload = multer({ storage: multer.memoryStorage() });  // Jb tk file imagekit pe upload nhi hoti, tab tk server's memory (RAM) me store hoga [temporarily, deleted automatically after upload]

const router = express.Router();

router.post("/posts", authMiddleware, upload.single("image"), createPost);      // stack of middlewares: authMiddleware -> multer middleware -> createPost controller

export default router;


// Explain about upload.single("image"):-
    // upload.single("image") is a multer middleware that processes a single file upload with the field name "image" from the request form-data/frontend.
    // It handles the file upload process, storing the file in memory (RAM) temporarily.