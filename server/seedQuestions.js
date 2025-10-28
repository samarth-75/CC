// Example seed script for questions
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './Question.js';

dotenv.config();

const questions = [
  {
    title: 'Sum Two Numbers',
    description: 'Write a function that returns the sum of two numbers.',
    difficulty: 'Easy',
    testCases: [
      { input: '1,2', output: '3' },
      { input: '5,7', output: '12' }
    ]
  },
  {
    title: 'Reverse String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Easy',
    testCases: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"world"', output: '"dlrow"' }
    ]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrafters');
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log('Questions seeded!');
  process.exit();
}

seed();