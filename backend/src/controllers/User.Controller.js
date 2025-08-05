import User  from "../models/User.model.js"; // Ensure file name & export are correct
import jwt from "jsonwebtoken";

// === Register User ===
const registerUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    if (
      [name, email, password, bio].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = await User.create({ name, email, password, bio });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        message: "Something went wrong while registering the user",
      });
    }

    return res
      .status(201)
      .json({ message: "User created successfully", user: createdUser });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// === Login User ===
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
      process.env.JWT_SECRET_KEY || "your_fallback_secret",
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
