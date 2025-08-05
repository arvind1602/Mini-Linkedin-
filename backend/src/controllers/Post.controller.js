import Post from "../models/Post.model.js";
import User from "../models/User.model.js";

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content?.trim()) {
      return res
        .status(400)
        .json({ error: "User ID and content are required." });
    }

    if (content.length > 1000) {
      return res
        .status(400)
        .json({ error: "Post content cannot exceed 1000 characters." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const newPost = new Post({
      author: userId,
      content: content.trim(),
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all posts with author name & timestamp
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .lean();

    return res.status(200).json(posts); // ✅ Send response and exit
  } catch (error) {
    console.error("Get All Posts Error:", error);
    return res.status(500).json({ error: "Internal server error" }); // ✅ Only send if try block fails
  }
};

/**
 * Get posts by a specific user
 */
export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .lean();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Get User Posts Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
