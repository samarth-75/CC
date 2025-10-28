import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const users = [
  {
    username: 'gamma',
    email: 'gamma@gmail.com',
    password: 'password123',
    xp: 215,
    profilePicture: '',
    skills: ['React', 'Node.js'],
    badges: ['First Steps'],
    completedChallenges: [],
  },
  {
    username: 'alpha',
    email: 'alpha@gmail.com',
    password: 'password123',
    xp: 350,
    profilePicture: '',
    skills: ['Python', 'Django'],
    badges: ['Speed Demon'],
    completedChallenges: [],
  },
  {
    username: 'delta',
    email: 'delta@gmail.com',
    password: 'password123',
    xp: 120,
    profilePicture: '',
    skills: ['JavaScript', 'CSS'],
    badges: [],
    completedChallenges: [],
  },
  {
    username: 'sigma',
    email: 'sigma@gmail.com',
    password: 'password123',
    xp: 480,
    profilePicture: '',
    skills: ['TypeScript', 'MongoDB'],
    badges: ['Battle Winner'],
    completedChallenges: [],
  },
  {
    username: 'omega',
    email: 'omega@gmail.com',
    password: 'password123',
    xp: 50,
    profilePicture: '',
    skills: ['HTML', 'Express'],
    badges: [],
    completedChallenges: [],
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrafters');
  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Users seeded!');
  process.exit();
}

seed();