import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import multer from 'multer';
import User from '../models/User.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // or configure for cloud storage


// Protected routes - require authentication
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard!',
    user: req.user
  });
});

router.get('/arena', authMiddleware, (req, res) => {
  res.json({
    message: 'Arena data',
    battles: []
  });
});

// router.get('/challenges', authMiddleware, (req, res) => {
//   res.json({
//     message: 'Available challenges',
//     challenges: []
//   });
// });

router.get('/leaderboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Leaderboard data',
    rankings: []
  });
});

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user
  });
});






export default router;