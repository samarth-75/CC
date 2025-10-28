import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  testCases: [{ input: String, output: String }]
});

export default mongoose.model('Question', questionSchema);