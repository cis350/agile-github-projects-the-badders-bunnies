import express from 'express';
import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();


// Fetch all questions
router.get('/', async (req, res) => {
  res.send('hi! \n');
});

// Add a question
router.post('/add', requireAuth, async (req, res) => {
  const { questionText } = req.body;
  // Implement logic to add a new question
});

// Answer a question
router.post('/answer', requireAuth, async (req, res) => {
  const { _id, answer } = req.body;
  // Implement logic to answer or update an answer to a question
});

export default router;
