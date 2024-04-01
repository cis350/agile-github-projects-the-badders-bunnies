import express from 'express';
import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

// Fetch all questions
router.get('/', async (req, res) => {
  try {
    const allQuestions = await Question.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Questions Cannot Load" });
  }
});

// Add a question
router.post('/add', requireAuth, async (req, res) => {
  console.log(req.session);
  const { questionText } = req.body;
  const author = req.session?.user.userId;
  if (!questionText) {
    return res.status(400).json({ message: "Cannot use empty question text" });
  }
  try {
    const addedQuestion = new Question({ questionText, author });
    await addedQuestion.save();
    res.status(200).json(addedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error handling adding question" });
  }
});

// Answer a question
router.post('/answer', requireAuth, async (req, res) => {
  const { _id, answer } = req.body;
  if (!_id || !answer) {
    return res.status(400).json({ message: "No question ID or answer" });
  }

  try {
    const singleQuestion = await Question.findById(_id);
    if (!singleQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    singleQuestion.answer = answer;
    await singleQuestion.save();
    res.status(200).json(singleQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error handling adding answer" });
  }
});

export default router;
