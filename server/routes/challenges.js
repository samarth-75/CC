import express from 'express';
import Challenge from '../models/Challenge.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all challenges (without questions for list view)
router.get('/', async (req, res) => {
  const challenges = await Challenge.find({}, '-questions');
  res.json(challenges);
});

// Get a single challenge by ID (with questions)
router.get('/:id', async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
  res.json(challenge);
});

router.post('/:id/complete', authMiddleware, async (req, res) => {
  const { xpEarned } = req.body;
  const user = req.user;
  const challengeId = req.params.id;

  try {
    user.xp = (user.xp || 0) + xpEarned;
    user.level = Math.floor(user.xp / 100);
    user.completedChallenges = user.completedChallenges || [];
    if (!user.completedChallenges.includes(challengeId)) {
      user.completedChallenges.push(challengeId);
    }
    await user.save();
    res.json({ xp: user.xp, completedChallenges: user.completedChallenges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update XP' });
  }
});

export default router;