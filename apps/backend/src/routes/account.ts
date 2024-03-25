import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken'

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Implement logic to create a new user
  // Be sure to handle errors and validate input

    const newUser = new User({
        username: username,
        password: password,
    });

    newUser.save();
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    if (password !== user.password) {
        return res.status(401).json({ message: "Invalid password." });
    }
    const token = jwt.sign({ userId: user._id }, 'applepie', { expiresIn: '24h' });

    res.status(200).json({ token });
});

// Logout
router.post('/logout', (req, res) => {
  // Implement logout logic
});

export default router;
