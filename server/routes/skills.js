import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Add skill
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'No skill name provided' });

    const user = await User.findById(req.user._id);
    user.skills = user.skills || [];
    if (!user.skills.includes(name)) {
      user.skills.push(name);
    }
    await user.save();
    res.json({ skills: user.skills });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// Delete skill
router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'No skill name provided' });

    const user = await User.findById(req.user._id);
    user.skills = user.skills.filter(skill => skill !== name);
    await user.save();
    res.json({ skills: user.skills });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

export default router;