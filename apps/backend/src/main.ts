import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';
// const accountRouter = require('./routes/account.ts');
// const questionsRoutes = require('./routes/questions.ts');

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


const uri = "mongodb+srv://james:applepie@cis3500.yqpjrwc.mongodb.net/?retryWrites=true&w=majority&appName=CIS3500";

mongoose.connect(uri);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.post('/api/account', (_, res) => {
 
}); 

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
