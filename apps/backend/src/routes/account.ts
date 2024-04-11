import express from 'express';
import User from '../models/user';

const router = express.Router();

/**
 * @api {post} /signup User Signup
 * @apiName Signup
 * @apiGroup User
 *
 * @apiParam {String} username User's unique username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Signup successful message.
 *
 * @apiError (400 Bad Request) {String} message Error message for missing username or password.
 * @apiError (400 Bad Request) {String} message Error message for username already in use.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Signup successful."
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Cannot post empty password or username"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Username is already in use."
 *     }
 */

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Cannot post empty password or username' });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username is already in use.' });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  // Set user info in session
  if (req.session) {
    req.session.user = { username: newUser.username };
  }

  return res.status(200).json({ message: 'Signup successful.' });
});

/**
 * @api {post} /login User Login
 * @apiGroup User
 * @apiDescription Logs in a user with a username and password.
 *
 * @apiParam {String} username User's unique username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Login successful message.
 *
 * @apiError (401 Unauthorized) {String} message Error message for invalid password.
 * @apiError (404 Not Found) {String} message Error message for user not found.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login Successful"
 *     }
 *
 * @apiErrorExample {json} Error-Response (Invalid Password):
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid password."
 *     }
 *
 * @apiErrorExample {json} Error-Response (User Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found."
 *     }
 */

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: 'Invalid password.' });
  }
  if (req.session) {
    req.session.user = { username: user.username };
  }

  return res.status(200).json({ message: 'Login Successful' });
});

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Account
 *
 * @apiParam (Request body) {String} username The username of the user trying to log in.
 * @apiParam (Request body) {String} password The password of the user trying to log in.
 *
 * @apiSuccess (200) {String} message Confirmation message indicating successful login.
 *
 * @apiError (401) {String} message Error message indicating that the password is incorrect.
 * @apiError (404) {String} message Error message indicating that the user was not found.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "johndoe",
 *       "password": "password123"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login Successful"
 *     }
 *
 * @apiErrorExample {json} Error-Response (Invalid Password):
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid password."
 *     }
 *
 * @apiErrorExample {json} Error-Response (User Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found."
 *     }
 */

router.get('/current-user', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ username: req.session.user.username });
  }
  return res.status(404).json({ message: 'No user logged in' });
});

/**
 * @api {post} /login User Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Account
 *
 * @apiParam {String} username User's unique username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} message Success message indicating the user has logged in.
 *
 * @apiError UserNotFound The username of the User was not found.
 * @apiError IncorrectPassword The password provided is incorrect.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "user123",
 *       "password": "password"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Login Successful"
 *     }
 *
 * @apiErrorExample {json} Error-Response (User Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found."
 *     }
 *
 * @apiErrorExample {json} Error-Response (Incorrect Password):
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid password."
 *     }
 */

router.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ message: 'logout successful.' });
});

export default router;
