import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsByUser,
} from "../controllers/Post.controller.js";

const router = express.Router();

router.post("/create", createPost); // Create a new post
router.get("/", getAllPosts); // Get all posts
router.get("/user/:userId", getPostsByUser); // Get posts by a specific user

export default router;
