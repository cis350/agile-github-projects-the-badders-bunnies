// src/models/Question.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IQuestion extends Document {
  questionText: string;
  answer: string;
  author: string;
}

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: false },
  author: { type: String, required: true },
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
