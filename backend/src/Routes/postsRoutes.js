import express from "express";
import { getAllPosts, getPostById, getCategoryPosts, createPost, updatePost, deletePost } from "../controllers/postControllers.js";
import { login } from "../controllers/authController.js"; 
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/category/:category", getCategoryPosts);
router.post("/login", login);

// Protected
router.post("/", verifyToken, createPost); 

router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;