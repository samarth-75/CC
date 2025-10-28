import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Upload profile picture
router.post('/upload-picture', authMiddleware, async (req, res) => {
  try {
    const { profilePicture } = req.body;
    if (!profilePicture) return res.status(400).json({ error: 'No image provided' });

    const user = await User.findById(req.user._id);
    user.profilePicture = profilePicture;
    await user.save();
    res.json({ profilePicture: user.profilePicture });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
});

router.post('/add-project', authMiddleware, async (req, res) => {
  try {
    const { name, github, description } = req.body;
    if (!name || !github || !description) return res.status(400).json({ error: 'Missing fields' });
    const user = await User.findById(req.user._id);
    user.projects = user.projects || [];
    user.projects.push({ name, github, description });
    await user.save();
    res.json({ projects: user.projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Delete project
router.delete('/delete-project', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user._id);
    user.projects = user.projects.filter(p => p.name !== name);
    await user.save();
    res.json({ projects: user.projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;