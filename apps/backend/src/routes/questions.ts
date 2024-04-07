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
    res.status(500).json({ message: "Questions Cannot Load" });
  }
});

// Add a question
router.post('/add', requireAuth, async (req, res) => {
  const { questionText } = req.body;
  const author = req.session?.user?.username; // Added safe chaining for user

  if (!questionText) {
    return res.status(400).json({ message: "Cannot use empty question text" });
  }

  if (!author) {
    return res.status(403).json({ message: "No author found in session" });
  }

  try {
    const addedQuestion = new Question({ questionText, author });
    await addedQuestion.save();
    res.status(200).json(addedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error handling adding question" });
  }
});

// Answer a question
router.post('/:questionId/answer', requireAuth, async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ message: "Answer text must be provided" });
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.answer = answer;
    await question.save();
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error updating the answer" });
  }
});

router.get('/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question" });
  }
});


export default router;
