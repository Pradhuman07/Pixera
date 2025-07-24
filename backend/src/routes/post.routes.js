import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createPostController } from "../controllers/post.controller.js";
import multer from "multer";     
// About multer:
// Multer is a middleware which is primarily used for uploading files. 
// It is (not a package or tool, but rather) a Node.js middleware that simplifies file uploads in Express applications.
// File ko upload na hi frontend kr paata h aur na hi backend, isliye multer package ka use krna pdta h    

// const storage = multer.memoryStorage();  // Store file in memory
// const upload = multer({ storage: storage });  // Configure multer to use memory storage

const upload = multer({ storage: multer.memoryStorage() });  // Jb tk file imagekit pe upload nhi hoti, tab tk server's memory (RAM) me store hoga [temporarily, deleted automatically after upload]

const router = express.Router();

router.post("/upload",           // route name
    authMiddleware,              // First middleware to authenticate user, and getting user details in req.user
    upload.single("image"),      // multer middleware to handle single file upload with field name "image"
    createPostController         // Controller to handle post creation logic
);      

// stack of middlewares: authMiddleware -> multer middleware -> createPost controller

export default router;

// About upload.single("image"):-
// upload.single("image") is a multer middleware that processes a single file upload with the field name "image" from the request form-data/frontend.
// It handles the file upload process, storing the file in memory (RAM) temporarily.