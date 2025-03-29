import express from 'express'
const router = express.Router();
import  User  from '../models/User.js'; // Correct import
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
//Register Route
router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      // Check if username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ msg: "Username already in use" });
      }
  
      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ msg: "Email already in use" });
      }
  
      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
  });
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from MongoDB
      console.log(users)
      res.json(users);
    } catch (error) {1
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
// Login Route
router.post('/login', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username && !email) {
        return res.status(400).json({ msg: 'Username or email is required' });
      }
  
      // Find user by email or username
      const user = await User.findOne({
        $or: [{ email }, { username }]
      });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
  });
  router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User removed successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
export default router;