import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    answer: { type: String, required: true },
    author : { type: String, required: true },
  });
  
  const Question = mongoose.model('User', questionSchema);
  export default Question;