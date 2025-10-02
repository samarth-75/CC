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

// Create a new blog
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, author, image, content } = req.body;

    const newBlog = new Blog({
      title,
      excerpt,
      author,
      image,
      content
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;