import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';
import { getDB } from './database.js';

var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  true }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))



// mongoose.connect(uri)
//   .then(() => {
//     console.log('Successfully connected to MongoDB.');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });

// define root route
app.get('/', async (_, res) => {
  const db = await getDB();
  //play with database
  const users = await db.collection('users');
  //work with the users


  res.json({ message: 'hi, frontend!' });
});

app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.use('/api/account', accountRouter);

app.use('/api/questions', questionsRouter);

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

