import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get trending blogs (limit 6)
router.get('/trending', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6);
  res.json(blogs);
});

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Get a single blog by ID
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
});

export default router;