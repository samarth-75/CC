import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import challengeRoutes from './routes/challenges.js';
import blogRoutes from './routes/blogs.js';
import leaderboardRoutes from './routes/leaderboard.js';
// If you have battle/socket handlers, import here:
// import { battleSocketHandler } from './socket/battleHandler.js';
import { battleSocketHandler } from './socket/battleHandler.js';
import profileRoutes from './routes/profile.js';
import skillsRoutes from './routes/skills.js';


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5175'],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json({ limit: '5mb' })); // or higher, e.g. '10mb'
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrafters')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api', protectedRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'CodeCrafters API is running!' });
});

// Socket.io Battle Arena (if implemented)
// io.on('connection', (socket) => {
//   battleSocketHandler(io, socket);
// });
io.on('connection', (socket) => {
  battleSocketHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});