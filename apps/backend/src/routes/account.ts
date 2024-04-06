import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({ message: "Hello account API!" });
});

// Signup
router.post('/signup', async (req, res) => {
  console.log("tried to signup");

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Cannot post empty password or username"})
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username is already in use." });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  // Set user info in session
  if (req.session) {
    req.session.user = { userId: newUser._id };
  }

  return res.status(200).json({ message: "Signup successful." });

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
  const token = jwt.sign({ userId: user._id }, 'fortnitebattleroyale', { expiresIn: '24h' });

  res.status(200).json({ token });

});

// Logout
router.post('/logout', (req, res) => {

  req.session = null;
  res.status(200).json({ message: "logout successful." });

});

export default router;
