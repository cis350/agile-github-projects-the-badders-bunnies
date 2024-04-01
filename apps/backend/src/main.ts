import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['k1', 'k2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://james:applepie@cis3500.yqpjrwc.mongodb.net/'
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connection success.');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// define root route
app.get('/', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// account routes
app.use('/api/account', accountRouter);

// question routes
app.use('/api/questions', questionsRouter);

// listen
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
