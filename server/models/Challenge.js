import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number, // index of correct option
});

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  xpReward: Number,
  questions: [questionSchema],
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;